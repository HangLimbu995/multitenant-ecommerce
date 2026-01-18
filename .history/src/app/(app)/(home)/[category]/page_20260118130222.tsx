import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import React from 'react'

interface Props {
  params: Promise<{
    category: string
  }>
}

const Page = async ({ params }: Props) => {
  const { category } = await params;

  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(trpc.products.getMany.queryOptions())

  return (
    <HydrationBoundary state={dehydrate(queryClient)}
  )
}

export default Page