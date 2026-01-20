'use client'

import { useSuspenseInfiniteQuery } from '@tanstack/react-query'

import { useTRPC } from '@/trpc/client'
import { useProductFilters } from '../../hooks/use-product-filters'
import { ProductCard, ProductCardSkeleton } from './product-card'
import { DEFAULT_LIMIT } from '@/constants'
import { Button } from '@/components/ui/button'

interface Props {
    category?: string
}

export const ProductList = ({ category }: Props) => {
    const [filters] = useProductFilters()

    const trpc = useTRPC()
    const {
        data,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage
    } = useSuspenseInfiniteQuery(trpc.products.getMany.infiniteQueryOptions({
        ...filters,
        category,
        limit: DEFAULT_LIMIT,
    },
        {
            getNextPageParam: (lastPage) => {
                return lastPage.docs.length > 0 ? lastPage.nextPage : undefined
            }
        }
    ))

    return (
        <div>
            {
                (!data?.pages || data.pages.flatMap(page => page.docs).length === 0) ? (
                    <div className="text-center col-span-full py-10 text-gray-500">
                        Didn&apos;t find any products with your filter.
                    </div>
                ) : (
                    <>
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4'>
                            {data?.pages.flatMap((page) => page.docs).map((product) => (
                                <ProductCard
                                    key={product.id}
                                    id={product.id}
                                    name={product.name}
                                    imageUrl={product.image?.url}
                                    authorUsername='Hang'
                                    authorImageUrl={undefined}
                                    reviewRating={3}
                                    reviewCount={5}
                                    price={product.price}
                                />
                            ))}
                        </div>
                        <div className='flex justify-center pt-8'>
                            {hasNextPage && (
                                <Button disabled={isFetchingNextPage}
                                    onClick={() => fetchNextPage()}
                                    className='font-medium disabled:opacity-50 text-base bg-white'
                                    variant='elevated'
                                >Load more</Button>
                            )}
                        </div>
                    </>

                )
            }
        </div>
    )
}

export const ProductListSkeleton = () => {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4'>
            {Array.from({ length: DEFAULT_LIMIT }).map((_, index) => (
                <ProductCardSkeleton key={index} />
            ))}
        </div>
    )
}