import { useQuery } from "@tanstack/react-query";
import { getProductById, getProducts } from "./api";
import { type ProductApiItem, type ProductsApiResponse } from "./types";

export function useProducts() {
  return useQuery<ProductsApiResponse>({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 1000 * 10,
  });
}

export function useProduct(productId: string) {
  return useQuery<ProductApiItem>({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
    enabled: Boolean(productId),
    staleTime: 1000 * 10,
  });
}
