"use client"
import React, { useEffect } from 'react'
import Dashboard from '@/components/Dashboard'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
const Page = () => {
    const {data:session} = useSession();
    const router = useRouter();
    useEffect(() => {
        document.title = "Dashboard - Buy Me a Coffee"
        if(!session){
            router.push('/login');
        }
    }, [session,router])
    
    return (
        <>
            <Dashboard/>
        </>
    )
}

export default Page
