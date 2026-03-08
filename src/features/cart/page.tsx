import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { type RootState } from "@/store";
import CartList from "./components/cart-list";
import CartSummary from "./components/cart-summary";

export default function CartPage() {
  const { itemCount, subtotal } = useSelector((state: RootState) => state.cart);
  const shipping = 25;
  const freeShipping = subtotal >= 25;
  const hasItems = itemCount > 0;

  return (
    <div>
      <Helmet>
        <title>Cart | Roselle</title>
      </Helmet>

      <h1 className="mb-8 text-3xl font-semibold">Shopping Cart ({itemCount})</h1>

      <div
        className={`grid gap-8 items-start ${
          hasItems ? "lg:grid-cols-[1fr_360px]" : "lg:grid-cols-1"
        }`}
      >
        <CartList />

        {hasItems && (
          <div className="sticky top-24">
            <CartSummary
              subtotal={subtotal}
              shipping={shipping}
              freeShipping={freeShipping}
            />
          </div>
        )}
      </div>
    </div>
  );
}
