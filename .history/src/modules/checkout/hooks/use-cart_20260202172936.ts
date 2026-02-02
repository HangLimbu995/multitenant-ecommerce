import { useCartStore } from "../store/use-cart-store";

export const useCart = (tenantSlug: string) => {
    const {
        getCartByTenant,
        addProduct,
        removeProduct,
        clearCart,
        clearAllCarts,
    } = useCartStore()

    const EMPTY_ARRAY: string[] = []

    const productIds = useCartStore(state => state.tenantCarts[tenantSlug]?.productIds ?? EMPTY_ARRAY)

    const toggleProduct = (productId: string) => {
        if (productIds.includes(productId)) {
            removeProduct(tenantSlug, productId)
        } else {
            addProduct(tenantSlug, productId)
        }
    }

    const isProductInCart = (productId: string) => {
        return productIds.includes(productId)
    }

    const clearTenantCart = () => {
        clearCart(tenantSlug)
    }

    return {
        productIds,
        addProduct: (productId: string) => addProduct(tenantSlug, productId),
        removeProduct: (productId: string) => removeProduct(tenantSlug, productId),
        clearCart: clearTenantCart,
        clearAllCarts,
        toggleProduct,
        isProductInCart,
        totalItems: productIds.length,
    }
}