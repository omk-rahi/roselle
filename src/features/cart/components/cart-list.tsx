import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { type AppDispatch, type RootState } from "@/store";
import { setCart } from "@/features/cart/cartSlice";
import {
  useRemoveFromCartMutation,
  useUpdateCartQuantityMutation,
} from "@/features/cart/mutations";
import CartItem from "./cart-item";

export default function CartList() {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.cart.items);

  const updateQuantityMutation = useUpdateCartQuantityMutation();
  const removeFromCartMutation = useRemoveFromCartMutation();

  async function handleIncrease(id: string, quantity: number) {
    try {
      const response = await updateQuantityMutation.mutateAsync({
        id,
        quantity: quantity + 1,
      });

      dispatch(setCart(response.items));
    } catch {
      toast.error("Failed to update quantity");
    }
  }

  async function handleDecrease(id: string, quantity: number) {
    try {
      const response = await updateQuantityMutation.mutateAsync({
        id,
        quantity: Math.max(1, quantity - 1),
      });

      dispatch(setCart(response.items));
    } catch {
      toast.error("Failed to update quantity");
    }
  }

  async function handleRemove(id: string) {
    try {
      const response = await removeFromCartMutation.mutateAsync(id);
      dispatch(setCart(response.items));
      toast.success("Item removed from cart");
    } catch {
      toast.error("Failed to remove item");
    }
  }

  function handleSave() {
    toast.info("Save for later is not implemented yet");
  }

  if (!items.length) {
    return (
      <Card>
        <CardContent className="py-10 text-center text-muted-foreground">
          Your cart is empty.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="hidden md:block">
        <div className="grid grid-cols-[3fr_1fr_1fr_1fr] text-sm font-medium text-muted-foreground">
          <div></div>
          <div>Price</div>
          <div className="text-center">Qty</div>
          <div className="text-right">Subtotal</div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="divide-y">
          {items.map((item) => {
            const isUpdating =
              updateQuantityMutation.isPending || removeFromCartMutation.isPending;

            return (
              <CartItem
                key={item.id}
                {...item}
                canIncrease={item.quantity < item.maxQuantity}
                canDecrease={item.quantity > 1}
                isUpdating={isUpdating}
                onIncrease={() => handleIncrease(item.id, item.quantity)}
                onDecrease={() => handleDecrease(item.id, item.quantity)}
                onRemove={() => handleRemove(item.id)}
                onSave={handleSave}
              />
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
