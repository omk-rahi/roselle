import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { readCartFromStorage } from "./api";
import { type CartItem } from "./types";

type CartState = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
};

function calculateItemCount(items: CartItem[]) {
  return items.reduce((count, item) => count + item.quantity, 0);
}

function calculateSubtotal(items: CartItem[]) {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

function buildState(items: CartItem[]): CartState {
  return {
    items,
    itemCount: calculateItemCount(items),
    subtotal: calculateSubtotal(items),
  };
}

const initialState: CartState = buildState(readCartFromStorage());

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (_, action: PayloadAction<CartItem[]>) => {
      return buildState(action.payload);
    },
    clearCartState: () => buildState([]),
  },
});

export const { setCart, clearCartState } = cartSlice.actions;

export default cartSlice.reducer;
