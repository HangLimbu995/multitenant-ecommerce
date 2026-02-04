
'use client'

import { useCallback } from "react";
import { useCartStore } from "../store/use-cart-store";
import { useShallow } from 'zustand/react/shallow'

const EMPTY_ARRAY: string[] = []

export const useCart = (tenantSlug: string) => {
    const {
        productIds,
        addProduct,
        removeProduct,
        clearCart,
        clearAllCarts,
    } = useCartStore(useShallow((state) => ({
        productIds: state.tenantCarts[tenantSlug]?.productIds ?? EMPTY_ARRAY,
        addProduct: state.addProduct,
        removeProduct: state.removeProduct,
        clearCart: state.clearCart,
        clearAllCarts: state.clearAllCarts
    }))
    )
    const toggleProduct = useCallback((productId: string) => {
        if (productIds.includes(productId)) {
            removeProduct(tenantSlug, productId)
        } else {
            addProduct(tenantSlug, productId)
        }
    }, [addProduct, removeProduct, productIds, tenantSlug])

    const isProductInCart = (productId: string) => {
        return productIds.includes(productId)
    }

    const clearTenantCart = useCallback(() => {
        clearCart(tenantSlug)
    }, [tenantSlug, clearCart])

    const handleAddProduct = useCallback((productId: string) => {
        addProduct(tenantSlug, productId)
    }, [addProduct, tenantSlug])

    const handleRemoveProduct = useCallback((productId: string) => {
        removeProduct(tenantSlug, productId)
    }, [removeProduct, tenantSlug])

    return {
        productIds,
        addProduct: handleAddProduct,
        removeProduct: handleRemoveProduct,
        clearCart: clearTenantCart,
        clearAllCarts,
        toggleProduct,
        isProductInCart,
        totalItems: productIds.length,
    }
}