import { z } from 'zod';

export const signUpformSchema = z.object({
    file: z.any(),
    username: z.string().min(1, 'Require'),
    password: z.string().min(1, 'Require').min(6, '6 characters or more'),
    confirmPassword: z.string().min(1, 'Require'),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ['confirmPassword']
});

export const signInformSchema = z.object({
    username: z.string().min(1, 'Require'),
    password: z.string().min(1, 'Require'),
})

export const changePwformSchema = z.object({
    oldPassword: z.string().min(1, 'Required'),
    newPassword: z.string().min(1, 'Required'),
    confirmPassword: z.string().min(1, 'Require')
}).refine(data => data.confirmPassword === data.newPassword, {    
    message: "Password don't match",
    path: ['confirmPassword']
    
})

export const commentformSchema = z.object({
    comment: z.string().min(1, 'Required')
})

export const uploadVideoformSchema = z.object({
    coverImgFile: z.any()
    .refine((file) => file.length === 1, 'Required')
    .refine((file) => checkVideoType(file,'jpg'), 'JPG Required'),
    videoFile: z.any()
      .refine((file) => file.length === 1, 'Require')
      .refine((file) => checkVideoType(file,'mp4'), 'MP4 Required'),
    title: z.string().min(1, 'Required')
})

function checkVideoType(file: any, type: string) {
    let ext = ''
    if (file.length === 1) ext = file[0].name.split('.').pop()
    return ext === type ? true : false
  }