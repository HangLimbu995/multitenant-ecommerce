import { useCartStore } from "../store/use-cart-store";

export const useCart = (tenantSlug: string) => {
const {
    getCartByTenant,
    addProduct,
    removeProduct,
    clearCart,
    clearAllCarts,
} = useCartStore()

const productIds = getCartByTenant(tenantSlug)

const toggleProduct = (productId: string) => {
    if(productIds.includes(productId)) {
        
    }
}
}