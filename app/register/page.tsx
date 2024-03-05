"use client"
import { clsx } from 'clsx';
import { useForm, SubmitHandler } from "react-hook-form"
import { signUp } from '../lib/action';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpformSchema } from '../lib/schema'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
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

export default function Page() {

    type Inputs = z.infer<typeof signUpformSchema>

    const form = useForm<Inputs>({resolver: zodResolver(signUpformSchema)})

    const onSubmit: SubmitHandler<Inputs> = async (data) =>{
      let result = await signUp(data)
      if (result.success){
        form.reset()
        alert(result.message)
      }
      else {
        alert(result.message)
      }
      
    }
 
    return (
        
        <div className='h-full items-center flex'>
        <div className='mx-auto my-auto max-w-96 w-full shadow-sm rounded-xl flex flex-col border p-5'>
            {/* sign up */}
            <div className='text-xl text-center p-2 font-bold'>Create Account</div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full gap-5">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="" type='password'{...field} />
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
                                    <Input placeholder="" type='password'{...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit">Create Account</Button>

                    <Link href={'/login'}><Button variant="secondary" className='w-full'>Sign In</Button></Link>
                </form>
            </Form>
                
        </div>
    </div>

        )

    }
