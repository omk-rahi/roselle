export type CartItem = {
  id: string;
  productId: number;
  title: string;
  image: string;
  variant: string;
  price: number;
  quantity: number;
  maxQuantity: number;
};

export type AddToCartPayload = {
  productId: number;
  title: string;
  image: string;
  variant?: string;
  price: number;
  quantity: number;
  maxQuantity?: number;
};

export type UpdateCartQuantityPayload = {
  id: string;
  quantity: number;
};

export type CartResponse = {
  status: "success";
  message: string;
  items: CartItem[];
};
