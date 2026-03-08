import { type ProductApiItem, type ProductsApiResponse } from "./types";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export async function getProducts(): Promise<ProductsApiResponse> {
  const res = await fetch(`${BASE_URL}/products/category/womens-jewellery`);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();
  return data as ProductsApiResponse;
}

export async function getProductById(productId: string): Promise<ProductApiItem> {
  const res = await fetch(`${BASE_URL}/products/${productId}`);

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json() as Promise<ProductApiItem>;
}
