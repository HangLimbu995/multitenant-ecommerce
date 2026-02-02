import { ClientTranslationKeys } from './../../../../node_modules/@payloadcms/plugin-cloud-storage/node_modules/@payloadcms/ui/node_modules/@payloadcms/translations/dist/types.d';
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
        addProduct: (productId: string) => addProduct()
    }
}