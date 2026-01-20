import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { getQueryClient, trpc } from '@/trpc/server';


import type { SearchParams } from 'nuqs/server';
import { loadProductFilters } from '@/modules/products/search-params';
import ProductListView from '@/modules/products/ui/views/product-list-view';
import { DEFAULT_LIMIT } from '@/constants';
import { Suspense } from 'react';


interface Props {
  searchParams: Promise<SearchParams>
}

const Page = async ({  searchParams }: Props) => {
  const filters = await loadProductFilters(searchParams)


  const queryClient = getQueryClient()
  void queryClient.prefetchInfiniteQuery(trpc.products.getMany.infiniteQueryOptions({
    ...filters,
    limit: DEFAULT_LIMIT,
  }))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<ProductListSkeleto />}>
      <ProductListView   />
      </Suspense>
    </HydrationBoundary>
  )
}

export default Page