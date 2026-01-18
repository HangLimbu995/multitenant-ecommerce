import { getQueryClient } from '@/trpc/server';
import React from 'react'

interface Props {
  params: Promise<{
    category: string
  }>
}

const Page = async ({ params }: Props) => {
  const { category } = await params;

  const queryClient = getQueryClient()
  void queryClient

  return (
    <div>Category: {category} <br />
      Products: {JSON.stringify(products)}</div>
  )
}

export default Page