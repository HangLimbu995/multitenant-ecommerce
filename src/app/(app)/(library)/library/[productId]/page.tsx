import { ProductView, ProductViewSkeleton } from '@/modules/library/ui/views/product-view'
import { caller, getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

export const dynamic = 'force-dynamic'

interface Props {
    params: Promise<{ productId: string }>
}

const Page = async ({ params }: Props) => {
    const { productId } = await params
    const { user } = await caller.auth.session()


    if (!user) {
        redirect('/')
    }

    const queryClient = getQueryClient()
    await queryClient.prefetchQuery(trpc.library.getOne.queryOptions({
        productId,
    }))
    await queryClient.prefetchQuery(trpc.reviews.getOne.queryOptions({ productId }))
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<ProductViewSkeleton />} >
                <ProductView productId={productId} />
            </Suspense>
        </HydrationBoundary>
    )
}

export default Page