import { CheckoutView } from '@/modules/checkout/ui/views/checkout-view';
import { params } from '@/modules/products/hooks/use-product-filters';
import React from 'react'

interface PageProps {
    params: Promise<{ slug: string }>
}

const Page = async ({ params }: PageProps) => {
    const { slug } = await params;
    return (
        <CheckoutView tenantSlug={slug} />)
}

export default Page