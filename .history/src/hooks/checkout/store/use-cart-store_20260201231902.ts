import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface TenantCart {
    productIds: string[]
}

interface CartState {
    tenantCarts: Record<string, TenantCart>;
    addProduct: (tenantSlug: string, productId: string) => void;
    removeProduct: (tenantSlug: string, productId: string) => void;
    clearCart: (tenantSlug: string) => void;
    clearAllCarts: () => void;
    getCartByTenant: (tenantSlug: string) => string[]
}

export const useCartStore = create<CartState>()()