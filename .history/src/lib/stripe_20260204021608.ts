import Stripe from 'stripe'

const stripeSecretKey = process.env.STRIPE_

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!,{
    apiVersion: "2026-01-28.clover",
    typescript: true,
})