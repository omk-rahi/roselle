import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type CartSummaryProps = {
  subtotal: number;
  shipping: number;
  freeShipping?: boolean;
};

export default function CartSummary({
  subtotal,
  shipping,
  freeShipping = false,
}: CartSummaryProps) {
  const total = freeShipping ? subtotal : subtotal + shipping;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Cart Total</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="flex justify-between text-base">
          <span>Sub Total:</span>
          <span>Rs.{subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-base">Shipping:</span>

          {freeShipping ? (
            <div className="flex items-center gap-2">
              <span className="text-sm opacity-50 line-through">
                Rs.{shipping.toFixed(2)}
              </span>
              <span className="text-base font-bold">FREE</span>
            </div>
          ) : (
            <span>Rs.{shipping.toFixed(2)}</span>
          )}
        </div>

        <Separator />

        <div className="flex justify-between text-base">
          <span>Total</span>
          <span className="font-bold">Rs.{total.toFixed(2)}</span>
        </div>
      </CardContent>

      <CardFooter className="flex">
        <Button size="lg" className="w-full font-medium">
          GO TO CHECKOUT
        </Button>
      </CardFooter>
    </Card>
  );
}
