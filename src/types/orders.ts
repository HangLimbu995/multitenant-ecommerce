/**
 * Order-related types kept here so they survive `payload generate:types`.
 * Re-exported from payload-types for convenience.
 */

export type OrderStatus =
  | "pending"
  | "paid"
  | "fulfilled"
  | "cancelled";

export type PaymentMethod = "stripe" | "card";

export type OrderWithStatus<T extends Record<string, unknown> = Record<string, unknown>> =
  T & { status: OrderStatus; paymentMethod?: PaymentMethod };
