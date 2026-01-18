import React from 'react'

interface Props {
    params: Promise<{
        category: string
    }>
}

const Page = async({params}:Props) => {
    const {category } = await params;

const produ
    
  return (
    <div>Category: {category}</div>
  )
}

export default Page