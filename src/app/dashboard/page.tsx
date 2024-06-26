import SignOutButton from '@/components/SignOutButton'
import { getUser } from '@/lib/lucia'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'

const DashboardPage = async () => {
    // protected!!!
    const user = await getUser()
    if (!user) {
        redirect('/authenticate')
    }
    return (
        <>
            <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
                <div className="flex items-center gap-2 border p-4 rounded-lg bg-gray-100 transition-all cursor-pointer hover:shadow-xl">
                    {user.picture && (
                        <Image src={user.picture} className='rounded-full size-16' height={40} width={40} />
                    )}
                    <div className="flex flex-col">
                        <span className='font-semibold text-xl'>{user.name}</span>
                        <span className='text-gray-500'>{user.email}</span>
                    </div>
                </div>
            </div>
            <div className="absolute right-4 top-4">
                <SignOutButton >Sign Out</SignOutButton>
            </div>
        </>
    )
}

export default DashboardPage