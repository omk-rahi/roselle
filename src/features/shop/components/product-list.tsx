import { type ProductCardItem } from "../types";
import ProductCard from "./product-card";

type ProductListProps = {
  products: ProductCardItem[];
};

export default function ProductList({ products }: ProductListProps) {
  return (
    <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
}
