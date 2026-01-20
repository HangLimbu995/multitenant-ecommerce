import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { getQueryClient, trpc } from '@/trpc/server';


import type { SearchParams } from 'nuqs/server';
import { loadProductFilters } from '@/modules/products/search-params';
import ProductListView from '@/modules/products/ui/views/product-list-view';
import { DEFAULT_LIMIT } from '@/constants';
import { Suspense } from 'react';
import { ProductListSkeleton } from '@/modules/products/ui/components/product-list';


interface Props {
  params: Promise<{
    category: string
  }>,
  searchParams: Promise<SearchParams>
}

const Page = async ({ params, searchParams }: Props) => {
  const { category } = await params;
  const filters = await loadProductFilters(searchParams)


  const queryClient = getQueryClient()
  void queryClient.prefetchInfiniteQuery(trpc.products.getMany.infiniteQueryOptions({
    ...filters,
    category,
    limit: DEFAULT_LIMIT,
  }))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<ProductListSkeleton />}>
      </Suspense>
      <ProductListView category={category} />
    </HydrationBoundary>
  )
}

export default Page