import { delay } from "@/lib/utils";
import {
  type AddToCartPayload,
  type CartItem,
  type CartResponse,
  type UpdateCartQuantityPayload,
} from "./types";

const CART_STORAGE_KEY = "roselle-cart";

function normalizeQuantity(quantity: number) {
  if (!Number.isFinite(quantity)) return 1;
  return Math.max(1, Math.floor(quantity));
}

export function readCartFromStorage(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = localStorage.getItem(CART_STORAGE_KEY);

  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeCartToStorage(items: CartItem[]) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

export async function getCart(): Promise<CartItem[]> {
  await delay(250);
  return readCartFromStorage();
}

export async function addToCart(payload: AddToCartPayload): Promise<CartResponse> {
  await delay(250);

  const items = readCartFromStorage();
  const id = String(payload.productId);
  const maxQuantity = Math.max(1, payload.maxQuantity ?? payload.quantity ?? 1);
  const requestedQuantity = normalizeQuantity(payload.quantity);

  const existingIndex = items.findIndex((item) => item.id === id);

  if (existingIndex >= 0) {
    const existing = items[existingIndex];
    const nextQuantity = Math.min(
      existing.maxQuantity,
      existing.quantity + requestedQuantity,
    );

    items[existingIndex] = {
      ...existing,
      quantity: nextQuantity,
    };
  } else {
    items.push({
      id,
      productId: payload.productId,
      title: payload.title,
      image: payload.image,
      variant: payload.variant ?? "Default",
      price: payload.price,
      quantity: Math.min(maxQuantity, requestedQuantity),
      maxQuantity,
    });
  }

  writeCartToStorage(items);

  return {
    status: "success",
    message: "Item added to cart",
    items,
  };
}

export async function updateCartQuantity(
  payload: UpdateCartQuantityPayload,
): Promise<CartResponse> {
  await delay(250);

  const items = readCartFromStorage();
  const itemIndex = items.findIndex((item) => item.id === payload.id);

  if (itemIndex < 0) {
    return {
      status: "success",
      message: "Cart unchanged",
      items,
    };
  }

  const item = items[itemIndex];
  const nextQuantity = Math.max(
    1,
    Math.min(item.maxQuantity, normalizeQuantity(payload.quantity)),
  );

  items[itemIndex] = {
    ...item,
    quantity: nextQuantity,
  };

  writeCartToStorage(items);

  return {
    status: "success",
    message: "Cart updated",
    items,
  };
}

export async function removeFromCart(itemId: string): Promise<CartResponse> {
  await delay(250);

  const items = readCartFromStorage().filter((item) => item.id !== itemId);
  writeCartToStorage(items);

  return {
    status: "success",
    message: "Item removed from cart",
    items,
  };
}

export async function clearCart(): Promise<CartResponse> {
  await delay(200);
  writeCartToStorage([]);

  return {
    status: "success",
    message: "Cart cleared",
    items: [],
  };
}
