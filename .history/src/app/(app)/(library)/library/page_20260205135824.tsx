import { DEFAULT_LIMIT } from '@/constants'
import { LibraryView } from '@/modules/library/ui/views/library-view'
import { caller, getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import React from 'react'

const Page = async () => {  
    const {user} = await caller.auth.session()
      
    const queryClient = getQueryClient()
    await queryClient.prefetchInfiniteQuery(trpc.library.getMany.infiniteQueryOptions({
        limit: DEFAULT_LIMIT
    }))
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <LibraryView />
        </HydrationBoundary>
    )
}

export default Page