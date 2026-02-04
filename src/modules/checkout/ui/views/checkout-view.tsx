'use client'

import { useTRPC } from "@/trpc/client";
import { useCart } from "../../hooks/use-cart";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { generateTenantURL } from "@/lib/utils";
import { CheckoutItem } from "../components/checkout-item";
import { CheckoutSidebar } from "../components/checkout-sidebar";
import { useCheckoutStates } from "../../hooks/use-checkout-states";
import { useRouter } from "next/navigation";

interface CheckoutViewProps {
    tenantSlug: string;
}

export const CheckoutView = ({ tenantSlug }: CheckoutViewProps) => {
    const router = useRouter()
    const [redirectUrl, setRedirectUrl] = useState<string | null>(null)

    const [states, setStates] = useCheckoutStates()

    const { productIds, clearCart, removeProduct } = useCart(tenantSlug)

    const trpc = useTRPC()
    const { data, error, isLoading } = useQuery(trpc.checkout.getProducts.queryOptions({
        ids: productIds
    }, {
        enabled: productIds.length > 0,
    }))

    const purchase = useMutation(trpc.checkout.purchase.mutationOptions({
        onMutate: () => {
            setStates({ success: false, cancel: false })
        },
        onSuccess: (data) => {
            setRedirectUrl(data.url);
        },
        onError: (error) => {
            if (error.data?.code === 'UNAUTHORIZED') {
                // TODO: Modify when subdomains enabled
                router.push('/sign-in')
            }
            toast.error(error.message)
        }
    }))

    useEffect(() => {
        if (redirectUrl) {
            window.location.href = redirectUrl;
        }
    }, [redirectUrl])

    useEffect(() => {
        // localhost:3000/tenants/admin/checkout?success=true
        if (states.success) {
            setStates({ success: false, cancel: false })
            clearCart();
            // TODO: Invalidate library
            router.push('/products')
        }
    }, [states.success, clearCart, router, setStates])

    useEffect(() => {
        if (!error) return;

        if (error?.data?.code === 'NOT_FOUND') {
            clearCart();
            toast.info("Invalid products found, cart cleared")
        }
    }, [error, clearCart])

    if (isLoading) {
        return <CheckoutViewSkeleton />
    }

    if (!data || data.docs.length === 0) {
        return (
            <div className="text-center col-span-full py-10 text-gray-500">
                No products found.
            </div>
        )
    }

    return (
        <div className="lg:pt-16 pt-4 px-4 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 lg:gap-16">
                <div className="lg:col-span-4">
                    <div className="border rounded-md overflow-hidden bg-white">
                        {data?.docs.map((product, index) => (
                            <CheckoutItem
                                key={product.id}
                                isLast={index === data.docs.length - 1}
                                imageUrl={product.image?.url}
                                name={product.name}
                                productUrl={`${generateTenantURL(product?.tenant?.slug ?? '')}/products/${product.id}`}
                                tenantUrl={generateTenantURL(product?.tenant?.slug ?? '')}
                                tenantName={product?.tenant?.name ?? ''}
                                price={product.price}
                                onRemove={() => removeProduct(product.id)}
                            />
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-3">
                    <CheckoutSidebar
                        total={data?.totalPrice}
                        onPurchase={() => purchase.mutate({ tenantSlug, productIds })}
                        isCanceled={states.cancel}
                        disabled={purchase.isPending}
                    />
                </div>
            </div>
        </div>
    )
}

const CheckoutViewSkeleton = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 lg:gap-16 w-full">
            <div className="lg:col-span-4">
                <div className="border rounded-md overflow-hidden bg-white">
                    {Array.from({ length: 3 }).map((_, idx) => (
                        <div
                            key={idx}
                            className="grid grid-cols-[8.5rem_1fr_auto] gap-4 border-b animate-pulse"
                        >
                            {/* Image skeleton */}
                            <div className="overflow-hidden border-r">
                                <div className="relative aspect-square h-full w-[8.5rem] flex items-center justify-center bg-gray-100">
                                    <div className="h-24 w-24 bg-gray-200 rounded" />
                                </div>
                            </div>
                            {/* Details skeleton */}
                            <div className="py-4 flex flex-col justify-between">
                                <div>
                                    <div className="h-5 w-3/4 bg-gray-200 rounded mb-2" />
                                    <div className="h-4 w-1/2 bg-gray-200 rounded" />
                                </div>
                            </div>
                            {/* Price and button skeleton */}
                            <div className="py-4 flex flex-col justify-between items-end">
                                <div className="h-5 w-12 bg-gray-200 rounded mb-2" />
                                <div className="h-4 w-14 bg-gray-200 rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="lg:col-span-3">
                <div className="border rounded-md overflow-hidden bg-white flex flex-col">
                    <div className="flex items-center justify-between p-4 border-b-4">
                        <div className="h-6 w-24 bg-gray-200 rounded" />
                        <div className="h-6 w-16 bg-gray-200 rounded" />
                    </div>
                    <div className="p-4">
                        <div className="h-12 w-full bg-gray-200 rounded" />
                    </div>
                </div>
            </div>
        </div>
    )
}