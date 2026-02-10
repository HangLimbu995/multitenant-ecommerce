'use client'

import { TriangleAlertIcon } from 'lucide-react'
import React from 'react'

const ErrorPage = ({ reset }: { error: Error & { digest?: string }; reset: () => void }) => {
    return (
        <div className='px-4 lg:px-12 py-10'>
            <div className='border border-black border-dashed flex items-center justify-center p-8 flex-col gap-y-4 bg-white w-full rounded-lg'>
                <TriangleAlertIcon />
                <p className='text-base font-medium'>Something went wrong</p>
                <button onClick={reset}
                className='px-4 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800'>
                    Try again
                </button>
            </div>
        </div>
    )
}

export default ErrorPage