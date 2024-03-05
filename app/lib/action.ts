'use server'
import { PrismaClient, Prisma } from '@prisma/client'
import { redirect } from 'next/navigation';
import { signUpformSchema, signInformSchema } from '../lib/schema'
import { z } from 'zod';
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
import { cookies } from 'next/headers'
import { v4 as uuidv4 } from 'uuid';
import { saveFile } from './utils';
import { jwtSecret } from './utils';
import { serverResponse } from './utils';

const prisma = new PrismaClient()
type signUpInputs = z.infer<typeof signUpformSchema>
type signInInputs = z.infer<typeof signInformSchema>

// sign up
export async function signUp(data: signUpInputs) {

    const validatedFields = signUpformSchema.safeParse(data)

    //  server validation
    if (!validatedFields.success) return serverResponse(false, validatedFields.error.message)

    let salt = await bcrypt.genSaltSync(10);
    // encrypt password
    let hashPassword = await bcrypt.hashSync(data.password, salt);

    // create user
    try {
        const user = await prisma.user.create({
            data: {
                username: data.username,
                password: hashPassword,
            },
        })
    }

    catch (e) {
        console.log(e)
        // check user exists
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2002') {
                return serverResponse(false, 'user already exists')
            }
        }
    }
    return serverResponse(true, 'Account created')

}


// login
export async function signIn(data: signInInputs) {
    // delete old cookies
    cookies().delete('session')

    const validatedFields = signInformSchema.safeParse(data)

    //  server validation
    if (!validatedFields.success) return serverResponse(false, validatedFields.error.message)

    
    let user = null
    // get user from database
    try {
        user = await prisma.user.findUnique({
            where: {
                username: data.username
            }
        })
    }
    catch (e) {
        console.log(e)
        return serverResponse(false, 'server error')
    }

    // user not exists
    if (!user) return serverResponse(false, 'incorrect username or password')

    // check password 
    if (!bcrypt.compareSync(data.password, user.password)) return serverResponse(false, 'incorrect username or password')

    // jwt
    let token = jwt.sign({ data: user.username }, jwtSecret, { expiresIn: '1h' });

    // set cookies with token
    cookies().set('session', token, { expires: Date.now() + 60 * 60 * 1000 })

    return serverResponse(true, 'ok')

}

// logout
export async function signOut() {
    cookies().delete('session')
    redirect('/login')
}

// get current login user video
export async function getUserUploadedVideo() {

    const user = await getAuthUser()

    const video = prisma.video.findMany({
        where: { authorId: user?.id },
        include: { author: true }
    })
    return video

}

export async function getAllVideo() {

    const video = prisma.video.findMany({
        include: { author: true }
    })
    return video
}

// get video with id
export async function getVideo(videoId: any) {

    const video = await prisma.video.findUnique({
        where: {
            id: Number(videoId)
        },
        include: {
            author: true
        }
    })
    return video
}

// search function
export async function searchVideo(searchParams: any) {

    const video = await prisma.video.findMany({
        where: {
            title: { contains: searchParams }
        },
        include: {
            author: true
        }
    })
    return video
}

// comment function
export async function createComment(data: any, videoId: string) {

    const user = await getAuthUser()

    const dateTime = new Date()

    // save comment to database
    try {
        const comment = await prisma.comment.create({
            data: {
                date: dateTime,
                content: data.comment,
                authorId: Number(user?.id),
                videoId: Number(videoId),
            }
        })
        return serverResponse(true, 'ok')
    }
    catch (e) {
        return serverResponse(false, 'server error')
    }
}

export async function getAllComment(videoId: any) {

    const comment = await prisma.comment.findMany({
        where: {
            videoId: Number(videoId)
        },
        include: {
            author: true
        }
    })
    return comment
}


export async function createVideo(data: any) {

    const user = await getAuthUser()

    const videoFile: File | null = data.get('videoFile') as unknown as File
    const coverImgFile: File | null = data.get('coverImgFile') as unknown as File

    // check file exist
    if (!videoFile || !coverImgFile) return serverResponse(false, 'no file')

    // check file type
    const videoFileExt = videoFile.name.split('.').pop()
    if (videoFileExt != 'mp4') return serverResponse(false, 'file type error')

    const coverImgExt = coverImgFile.name.split('.').pop()
    if (coverImgExt != 'jpg') return serverResponse(false, 'file type error')

    const videoName = `${uuidv4()}.mp4`
    const coverImgName = `${uuidv4()}.jpg`

    // save to folder
    await saveFile(videoFile, `./public/video/${videoName}`)
    await saveFile(coverImgFile, `./public/cover_img/${coverImgName}`)

    // save to database
    try {
        const video = await prisma.video.create({
            data: {
                title: data.get('title'),
                authorId: Number(user?.id),
                videoPath: `/video/${videoName}`,
                coverImgPath: `/cover_img/${coverImgName}`,
            }
        })
    }
    catch (e) {
        return serverResponse(false, 'server error')
    }

    return serverResponse(true, 'ok')

}

// get current login user detail
export async function getAuthUser() {

    const session = cookies().get('session')
    if (!session) return redirect('/login')

    let username = null

    try {
        // jwt decode and get data
        const decoded = jwt.verify(session.value, jwtSecret);
        username = decoded.data
    }
    catch (err) {
        console.log(err)
        return redirect('/login')

    }

    // get user detail from database
    try {
        let user = await prisma.user.findUnique({
            where: { username: username },
            include: {
                video: true,
                comment: true,
            }
        })
        return user
    }
    catch (e) {
        console.log(e)
    }
}

export async function deleteVideo(videoId: any) {

    const user = getAuthUser()

    const video = await prisma.video.delete({
        where: { id: Number(videoId) }
    }
    )
    return serverResponse(true, 'ok')

}

export async function changePassword(data: any) {

    const user = await getAuthUser()

    // check old password
    if (!bcrypt.compareSync(data.oldPassword, user?.password)) return serverResponse(false, 'incorrect password')

    // check passowrd and confirm password are same 
    if (data.confirmPassword != data.newPassword) return serverResponse(false, 'password not match')

    let salt = await bcrypt.genSaltSync(10);
    // encrypt new password
    let hashPassword = await bcrypt.hashSync(data.newPassword, salt);

    // update database record
    try {
        const updateUser = await prisma.user.update({
            where: {
                id: Number(user?.id),
            },
            data: {
                password: hashPassword
            }
        })
    }
    catch (e) {
        return serverResponse(false, 'server error')
    }

    return serverResponse(true, 'ok')
}

export async function deleteComment(commentId: string) {

    const user = await getAuthUser()
    let isCurrentUserComment = false
    // check the comment is current user
    user?.comment.forEach(element => { if (element.id === Number(commentId)) isCurrentUserComment = true })

    if (!isCurrentUserComment) return serverResponse(false, 'not current user commment')

    // delete
    try {
        const deleteComment = await prisma.comment.delete({
            where: {
                id: Number(commentId)
            }
        })
    }
    catch (e) {
        return serverResponse(false, 'server error')

    }

    return serverResponse(true, 'ok')
}


