import { Button } from "@/components/ui/button";

import { useCart } from "@/modules/hooks/checkout/hooks/use-cart";

interface Props {
    tenantSlug: string;
}

export const CartButton = ({ tenantSlug }: Props) => {
    const cart = useCart(tenantSlug)

    return (
        <Button variant={'elevated'}
            className="flex-1 bg-pink-400">
            Add to cart
        </Button>
    )
}