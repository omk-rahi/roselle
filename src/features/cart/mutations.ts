import { useMutation } from "@tanstack/react-query";
import { addToCart, clearCart, removeFromCart, updateCartQuantity } from "./api";
import { type AddToCartPayload, type UpdateCartQuantityPayload } from "./types";

export function useAddToCartMutation() {
  return useMutation({
    mutationFn: (payload: AddToCartPayload) => addToCart(payload),
  });
}

export function useUpdateCartQuantityMutation() {
  return useMutation({
    mutationFn: (payload: UpdateCartQuantityPayload) => updateCartQuantity(payload),
  });
}

export function useRemoveFromCartMutation() {
  return useMutation({
    mutationFn: (itemId: string) => removeFromCart(itemId),
  });
}

export function useClearCartMutation() {
  return useMutation({
    mutationFn: clearCart,
  });
}
