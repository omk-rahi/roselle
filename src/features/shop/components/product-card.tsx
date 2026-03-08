import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { Link } from "react-router";
import { type ProductCardItem } from "../types";

type ProductCardProps = {
  product: ProductCardItem;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="block rounded-xl bg-white dark:bg-card px-6 py-6 space-y-5 group"
    >
      <div className="overflow-hidden rounded-lg flex justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="rounded-lg transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      <div className="space-y-2.5">
        <div className="flex items-center gap-1">
          <Star className="h-5 w-5 fill-[#FF83AD] stroke-[#FF83AD]" />
          <span className="text-xs">{product.rating.toFixed(1)}</span>
        </div>

        <p className="text-base">{product.name}</p>

        <div className="flex items-center gap-2">
          <span className="text-base font-bold">
            Rs.{product.price.toFixed(2)}
          </span>

          <span className="text-sm opacity-50 line-through">
            Rs.{product.originalPrice.toFixed(2)}
          </span>

          <Badge variant={product.inStock ? "success" : "destructive"}>
            {product.inStock ? "IN STOCK" : "OUT OF STOCK"}
          </Badge>
        </div>
      </div>
    </Link>
  );
}
