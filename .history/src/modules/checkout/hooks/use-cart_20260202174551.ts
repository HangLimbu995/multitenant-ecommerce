import { useCartStore } from "../store/use-cart-store";

const EMPTY_ARRAY: string[] = []

export const useCart = (tenantSlug: string) => {
    const {
        productIds,
        addProduct,
        removeProduct,
        clearCart,
        clearAllCarts,
    } = useCartStore((state) => ({
        productIds: state.tenantCarts[tenantSlug]?.productIds ?? EMPTY_ARRAY,
        addProduct: state.addProduct,
        removeProduct: state.removeProduct,
        clearCart: state.clearCart,
        clearAllCarts: state.clearAllCarts
    }))




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