'use client'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { createVideo, getAllVideo } from "../lib/action"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation';
import  LoadingDialog  from "./loading-dialog"
import { useImmer } from "use-immer"
import { uploadVideoformSchema } from "../lib/schema"

export default function UploadBoard(){

  const [loading, setLoading] = useImmer(false)

  const router = useRouter();

    const form = useForm<z.infer<typeof uploadVideoformSchema>>({
      resolver: zodResolver(uploadVideoformSchema)
    })
    
    async function onSubmit(values: z.infer<typeof uploadVideoformSchema>) {
      const formData = new FormData();
      formData.append("videoFile", values.videoFile[0]);
      formData.append("coverImgFile", values.coverImgFile[0]);
      formData.append("title", values.title);
      setLoading(true)
      let result = await createVideo(formData)
      setLoading(false)
      if (!result.success) return(result.message)
      form.reset()
      router.refresh()
    }

    return (
        <div className='border p-5 rounded-lg w-full shadow'>
        <div className='text-2xl font-bold pb-5'>Video Upload</div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            
          <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="" {...form.register('title')} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="videoFile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>File</FormLabel>
                  <FormControl>
                    <Input type="file" placeholder="" {...form.register('videoFile')} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
  
            <FormField
              control={form.control}
              name="coverImgFile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover Image</FormLabel>
                  <FormControl>
                    <Input type="file" placeholder="" {...form.register('coverImgFile')} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          
      
            <Button className="w-full" type="submit">Submit</Button>
          </form>
        </Form>
        <LoadingDialog open={loading}/>
      </div>
    )
}

