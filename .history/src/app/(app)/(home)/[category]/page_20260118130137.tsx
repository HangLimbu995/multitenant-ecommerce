import { getQueryClient, trpc } from '@/trpc/server';
import React from 'react'

interface Props {
  params: Promise<{
    category: string
  }>
}

const Page = async ({ params }: Props) => {
  const { category } = await params;

  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(trpc.products.getMany.queryOptions)

  return (
    <div>Category: {category} <br />
      Products: {JSON.stringify(products)}</div>
  )
}

export default Page