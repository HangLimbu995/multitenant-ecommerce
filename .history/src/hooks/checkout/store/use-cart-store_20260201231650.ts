import {create} from 'zustand'
import {persist, createJSONStorage} from 'zustand/middleware'

interface TenantCart {
    productIds: string[]
}

interface CartState{
    tenant
}