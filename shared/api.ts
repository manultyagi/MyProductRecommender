/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

export type Category = "electronics" | "fashion" | "home" | "beauty" | "sports";

export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: Category;
}

export interface Recommendation {
  product: Product;
  explanation: string;
}

export interface GetRecommendationsResponse {
  recommendations: Recommendation[];
}
