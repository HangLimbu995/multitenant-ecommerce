import React from 'react'

interface Props {
    params: Promise<{
        category: string
    }>
}

const Page = async({params}:Props) => {
    const {category } = await params;

const products = await caller.products
    
  return (
    <div>Category: {category}</div>
  )
}

export default Page