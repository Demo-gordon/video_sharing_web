'use client'
import { clsx } from 'clsx';
import { useForm, SubmitHandler } from "react-hook-form"
import { signUp } from '../lib/action';
import Link from 'next/link'
import { z } from 'zod';
import { signInformSchema } from '../lib/schema';
import { signIn } from '../lib/action';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { useRouter } from 'next/navigation';

export default function Page() {

    type Inputs = z.infer<typeof signInformSchema>

    const router = useRouter()

    const form = useForm<Inputs>({ resolver: zodResolver(signInformSchema) })

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        let result = await signIn(data)
        if (result.success){
            router.push('/')
        }
        else {
            alert (result.message)
        }
    }

    return (
        <div className='h-full items-center flex'>
            <div className='mx-auto my-auto max-w-96 w-full shadow-sm rounded-xl flex flex-col border p-5'>
                {/* sign in */}
                <div className='text-xl text-center p-2 font-bold'>Sign In</div>
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

                        <Button type="submit">Sign In</Button>

                        <Link href={'/register'}><Button variant="secondary" className='w-full'>Create Account</Button></Link>
                    </form>
                </Form>
            </div>
        </div>


    )

}
