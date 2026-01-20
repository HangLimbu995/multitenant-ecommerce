import React, { Suspense } from "react";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { SearchParams } from "nuqs/server";

import { getQueryClient, trpc } from "@/trpc/server";

import { loadProductFilters } from "@/modules/products/search-params";
import { ProductList, ProductListSkeleton } from "@/modules/products/ui/components/product-list";

import { DEFAULT_LIMIT } from "@/constants";
import ProductListView from "@/modules/products/ui/views/product-list-view";

interface Props {
  params: Promise<{
    subcategory: string;
  }>;
  searchParams: Promise<SearchParams>
}

const Page = async ({ params, searchParams }: Props) => {
  const { subcategory } = await params;
  const filters = await loadProductFilters(searchParams)

  const queryClient = getQueryClient()
  void queryClient.prefetchInfiniteQuery(trpc.products.getMany.infiniteQueryOptions({
    ...filters,
    category: subcategory,
    limit: DEFAULT_LIMIT,
  }))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<ProductListSkeleton />}>
        <ProductListView category={subcategory} />
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;
