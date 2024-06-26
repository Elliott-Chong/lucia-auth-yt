'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { zodResolver } from "@hookform/resolvers/zod"
import React from 'react'
import { useForm } from 'react-hook-form'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { z } from "zod"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { signIn } from './auth.action'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})

const SignInForm = () => {
    const router = useRouter()
    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: '',
            password: ''
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof signInSchema>) {
        const res = await signIn(values)
        if (res.success) {
            toast.success('Login successful')
            router.push('/dashboard')
        } else {
            toast.error(res.error)
        }
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>Welcome back!</CardTitle>
                <CardDescription>
                    Sign in to your account to continue.
                </CardDescription>
            </CardHeader>
            <CardContent className='space-y-2'>
                <Form {...form}>
                    <form className='flex flex-col gap-2' onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type='email'
                                            placeholder='Enter your email...'
                                            {...field}
                                        />
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
                                        <Input
                                            type='password'
                                            placeholder="Enter your password..."
                                            {...field}
                                            onChange={(e) => {
                                                e.target.value = e.target.value.trim();
                                                field.onChange(e);
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type='submit' className='self-start'>
                            Login
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default SignInForm