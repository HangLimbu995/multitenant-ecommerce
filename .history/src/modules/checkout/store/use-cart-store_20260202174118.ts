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
}

export const useCartStore = create<CartState>()(
    persist((set, get) => ({
        tenantCarts: {},
        addProduct: (tenantSlug, productId) =>
            set((state) => {
                const cart = state.tenantCarts[tenantSlug] ?? { productIds: [] }

                if (cart.productIds.includes(productId)) return state

                return {
                    tenantCarts: {
                        ...state.tenantCarts,
                        [tenantSlug]: {
                            productIds: [
                                ...cart.productIds,
                                productId
                            ]
                        }
                    }
                }

            }),
        removeProduct: (tenantSlug, productId) =>
            set((state) => ({
                const cart = state.tenantCarts[tean]
                
                tenantCarts: {
                    ...state.tenantCarts,
                    [tenantSlug]: {
                        productIds: state.tenantCarts[tenantSlug]?.productIds.filter(id => id !== productId) || []
                    }
                }
            })),
        clearCart: (tenantSlug) =>
            set((state) => ({
                tenantCarts: {
                    ...state.tenantCarts,
                    [tenantSlug]: {
                        productIds: []
                    }
                }
            })),
        clearAllCarts: () =>
            set({
                tenantCarts: {}
            }),
        getCartByTenant: (tenantSlug) =>
            get().tenantCarts[tenantSlug]?.productIds || [],

    })
        , {
            name: 'funroad-cart',
            storage: createJSONStorage(() => localStorage)
        }
    )
)