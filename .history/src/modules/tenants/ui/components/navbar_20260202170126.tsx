'use client'

import { Button } from "@/components/ui/button";
import { generateTenantURL } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

// import { CheckoutButton } from "@/modules/hooks/checkout/ui/components/checkout-button";

const CheckoutButton = dynamic(
    () => import("@/modules/checkout/ui/components/checkout-button")
    .then((mod)=> mod.CheckoutButton),{
        ssr: false,
        loading: () => (
            <Button
                variant="elevated"
                disabled
                className="bg-white flex items-center gap-2 animate-pulse"
            >
                <span className="w-4 h-4 rounded-full bg-gray-200 mr-2 inline-block" />
                <span className="h-4 w-8 bg-gray-200 rounded" />
            </Button>
        )
    }
)

interface Props {
    slug: string;
}

export const Navbar = ({ slug }: Props) => {
    const trpc = useTRPC()
    const { data } = useSuspenseQuery(trpc.tenants.getOne.queryOptions({ slug }))
    return (
        <nav className="h-20 border-b font-medium bg-white">
            <div className="max-w-(--breakpoint-xl) mx-auto flex justify-between items-center h-full px-4 lg:px-12">
                <Link href={generateTenantURL(slug)} className="flex items-center gap-2">
                    {data && data.image?.url && (
                        <Image
                            src={data.image.url}
                            width={32}
                            height={32}
                            className="rounded-full border shrink-0 size-[32px]"
                            alt={slug}
                        />
                    )}
                    <p className="text-xl">{data?.name}</p>
                </Link>
                <CheckoutButton hideIfEmpty tenantSlug={slug} />
            </div>
        </nav>
    )
}

export const NavbarSkeleton = () => {
    return (
        <nav className="h-20 border-b font-medium bg-white">
            <div className="max-w-(--breakpoint-xl) mx-auto flex justify-between items-center h-full px-4 lg:px-12">
                <div />
                {/* TODO: Skeleton for checkout button */}
            </div>
        </nav>
    )
}