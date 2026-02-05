'use client'

import { useTRPC } from "@/trpc/client";

interface Props {
    productId: string;
}

export const ReviewSidebar = ({ productId }: Props) => {
    const trpc = useTRPC()
    const {data} = useSus
    
    return (
        <div >
            Review Sidebar
        </div>
    )
}