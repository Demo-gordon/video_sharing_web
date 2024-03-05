'use client'
import { useForm, SubmitHandler } from "react-hook-form"
import { createComment, deleteComment } from "../lib/action"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import DeleteIcon from '@mui/icons-material/Delete';
import { commentformSchema } from "../lib/schema"

export default function CommentBoard({commentList, videoId, user}:any){
    
    const router = useRouter();
   
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<any>({ resolver: zodResolver(commentformSchema) })

      // submit form
    const onSubmit: SubmitHandler<any> = async (data) =>{
        createComment(data, videoId)
        router.refresh()
    }

   async function handleDelete(id: string){
      const result = await deleteComment(id)
      if (!result.success) return alert(result.message)
      router.refresh()
    }

    return (
        <div className='flex flex-col gap-3 w-full'>

        <form className={'flex flex-col gap-1'} onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-2 w-full">
            <Input className='h-7 w-full' placeholder='Comment' type="text" {...register('comment')}/>
            <Button type='submit' className='h-7'>Submit</Button>
            </div>
            <div className="text-sm px-2 text-red-600">{errors.comment?.message?.toString()}</div>
        </form>

        <div className='flex flex-col-reverse gap-2'>

        {commentList.length === 0 && <div className="w-full text-center">No Comment</div>}

        {
            commentList.map((element: any) => {
            
                const date = new Date(element.date)
                const dateString = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
                let deleteBtn = null
                user.comment.forEach((userComment: any) => element.id === userComment.id? deleteBtn = <Button onClick={e => handleDelete(element.id)} variant="secondary"><DeleteIcon/></Button>: null) 
                
                return (
                    <div className="flex justify-between border rounded-xl p-2 gap-2 items-center" key={element.id}>

    
                    <div className='flex flex-col' key={element.id}>

                        <div className="w-full">
                            <span className='text-sm font-bold'>
                            {element.author.username}
                            </span>
                            <span className='text-xs ml-3'>
                            {dateString}
                            </span>
                       
                        </div>
                        <div className="w-full text-base">
                            {element.content}
                        </div>
                    </div>
                        
                        {deleteBtn}
                
                    </div>
                )
            })
        }
        </div>
        </div>
    )
}

