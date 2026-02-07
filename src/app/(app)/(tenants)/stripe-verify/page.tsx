'use client'

import { useTRPC } from '@/trpc/client'
import { useMutation } from '@tanstack/react-query';
import { LoaderIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'

const Page = () => {
    const [redirectUrl, setRedirectUrl] = useState<string | null>()

    const trpc = useTRPC();
    const { mutate: verify } = useMutation(trpc.checkout.verify.mutationOptions({
        onSuccess: (data) => {
            console.log('data',data.url)
            setRedirectUrl(data.url)
        },
        onError: (error) => {
            console.log('error',error)
            setRedirectUrl('/')
        }
    }))

    useEffect(() => {
        if (redirectUrl) {

            window.location.href = redirectUrl
        }
    }, [redirectUrl])

    useEffect(() => {
        verify()
        // eslint-disable-next-line react-hooks/exhaustive-deps -- run once on mount
    }, [])

    return (
        <div className='flex min-h-screen items-center justify-center'>
            <LoaderIcon className='animate-spin text-muted-foreground' />
        </div>
    )
}

export default Page