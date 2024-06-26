'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import React from 'react'

type Props = {
    SignUpTab: React.ReactNode,
    SignInTab: React.ReactNode,
}

const TabSwitcher = (props: Props) => {
    return (
        <Tabs className='max-w-[500px]' defaultValue='sign-in'>
            <TabsList>
                <TabsTrigger value='sign-in'>Sign In</TabsTrigger>
                <TabsTrigger value='sign-up'>Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value='sign-in'>{props.SignInTab}</TabsContent>
            <TabsContent value='sign-up'>{props.SignUpTab}</TabsContent>
        </Tabs>
    )
}

export default TabSwitcher