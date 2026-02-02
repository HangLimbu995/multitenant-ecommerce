  
  import { Button } from "@/components/ui/button";
import { useCart } from "../../hooks/use-cart";
  
  interface CheckoutButtonProps {
    className?: string;
    hideIfEmpty?: boolean;
    tenantSlug: string;
  }

  export const CheckoutButton = ({
    className, hideIfEmpty, tenantSlug,
  }: CheckoutButton) => {
const {totalItems} = useCart(tenantSlug)

if(hideIfEmpty && totalItems === 0) return null;

return (
    <Button variant={}
)
  }