import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import { Heart, MinusIcon, PlusIcon, Trash2 } from "lucide-react";

type CartItemProps = {
  image: string;
  title: string;
  variant: string;
  price: number;
  quantity: number;
  canIncrease?: boolean;
  canDecrease?: boolean;
  isUpdating?: boolean;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
  onSave: () => void;
};

export default function CartItem({
  image,
  title,
  variant,
  price,
  quantity,
  canIncrease = true,
  canDecrease = true,
  isUpdating = false,
  onIncrease,
  onDecrease,
  onRemove,
  onSave,
}: CartItemProps) {
  const total = price * quantity;

  return (
    <div className="py-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[3fr_1fr_1fr_1fr] md:items-center">
        <div className="flex items-center gap-4">
          <img
            src={image}
            alt={title}
            className="h-20 w-20 rounded-md border object-contain"
          />

          <div className="flex-1">
            <p className="text-base font-medium">{title}</p>
            <p className="opacity-50">{variant}</p>
          </div>
        </div>

        <div className="flex items-center justify-between md:block">
          <p className="text-sm text-muted-foreground md:hidden">Price</p>
          <p className="text-base font-medium">Rs.{price.toFixed(2)}</p>
        </div>

        <div className="flex items-center justify-between md:justify-center">
          <p className="text-sm text-muted-foreground md:hidden">Qty</p>
          <ButtonGroup
            aria-label="Quantity controls"
            className="h-fit overflow-hidden rounded-lg border border-foreground/20"
          >
            <Button
              type="button"
              variant="secondary"
              size="icon"
              onClick={onDecrease}
              disabled={!canDecrease || isUpdating}
              className="border-0 border-r border-foreground/20"
            >
              <MinusIcon />
            </Button>

            <Button
              type="button"
              variant="secondary"
              size="icon"
              disabled
              className="cursor-default select-none border-0 border-r border-foreground/20 bg-white hover:bg-white dark:bg-secondary dark:hover:bg-secondary disabled:opacity-100"
            >
              {quantity}
            </Button>

            <Button
              type="button"
              variant="secondary"
              size="icon"
              onClick={onIncrease}
              disabled={!canIncrease || isUpdating}
              className="border-0"
            >
              <PlusIcon />
            </Button>
          </ButtonGroup>
        </div>

        <div className="flex items-center justify-between md:block md:text-right">
          <p className="text-sm text-muted-foreground md:hidden">Subtotal</p>
          <p className="text-lg font-semibold">Rs.{total.toFixed(2)}</p>
        </div>
      </div>

      <div className="mt-2 flex flex-wrap justify-end gap-2">
        <Button type="button" variant="ghost" size="sm" onClick={onSave}>
          <Heart />
          <span>Save for later</span>
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onRemove}
          disabled={isUpdating}
        >
          <Trash2 />
          <span>Remove</span>
        </Button>
      </div>
    </div>
  );
}
