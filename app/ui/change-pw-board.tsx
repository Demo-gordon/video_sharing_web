'use client'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { changePassword, createVideo, getAllVideo } from "../lib/action"
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
import { changePwformSchema } from "../lib/schema"

export default function ChangePwBoard(){

    const form = useForm<z.infer<typeof changePwformSchema>>({
        resolver: zodResolver(changePwformSchema)
      })
      
      // submit form
      async function onSubmit(values: z.infer<typeof changePwformSchema>) {
          const result = await changePassword(values)
          if (result.success) {
            form.reset()
            return alert('Password change')
          }
          else {
            alert(result.message)
          }
        
      }

    return (
        <div className='border p-5 rounded-lg w-full shadow'>

        <div className='text-2xl font-bold pb-5'>Change Password</div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

          <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Old Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="" {...form.register('oldPassword')} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
          <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="" {...form.register('newPassword')} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="" {...form.register('confirmPassword')} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
  
            <Button className="w-full" type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    )
}