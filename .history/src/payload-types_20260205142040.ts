/**
 * Types for @Reviews.ts (lines 1-38)
 */

/**
 * Review status types
 */
export type ReviewStatus = 'pending' | 'approved' | 'rejected';

/**
 * Review interface representing a product or tenant review left by a user.
 */
export interface Review {
  id: string;
  // The user who created the review
  user: string | User;
  // The product being reviewed (optional if reviewing a tenant)
  product?: string | Product | null;
  // The tenant/store being reviewed (optional if reviewing a product directly)
  tenant?: string | Tenant | null;
  // Rating, e.g. 1 to 5 stars
  rating: number;
  // Textual review by the user
  comment?: string | null;
  // Moderation status
  status: ReviewStatus;
  // Date/time updated
  updatedAt: string;
  // Date/time created
  createdAt: string;
}

/**
 * Shape of review selection fields for querying lists in Payload
 */
export interface ReviewsSelect<T extends boolean = true> {
  user?: T;
  product?: T;
  tenant?: T;
  rating?: T;
  comment?: T;
  status?: T;
  updatedAt?: T;
  createdAt?: T;
}