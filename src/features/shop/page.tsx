import { Helmet } from "react-helmet-async";
import { Loader } from "@/components/shared/loader";
import ProductList from "./components/product-list";
import { useProducts } from "./query";
import { type ProductApiItem, type ProductCardItem } from "./types";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, FunnelIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router";

type SortOption =
  | "featured"
  | "price-low-to-high"
  | "price-high-to-low"
  | "rating-high-to-low"
  | "name-a-to-z";

function toProductCardItem(product: ProductApiItem): ProductCardItem {
  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);

  return {
    id: String(product.id),
    name: product.title,
    image: product.thumbnail,
    rating: product.rating,
    price: discountedPrice,
    originalPrice: product.price,
    inStock: product.stock > 0,
  };
}

export default function ShopPage() {
  const { data, isLoading, isError } = useProducts();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q")?.trim().toLowerCase() ?? "";
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [topRatedOnly, setTopRatedOnly] = useState(false);
  const [underThirtyOnly, setUnderThirtyOnly] = useState(false);
  const hasSearchQuery = searchQuery.length > 0;

  const products = useMemo(() => {
    const mappedProducts = (data?.products ?? []).map(toProductCardItem);

    const filteredProducts = mappedProducts.filter((product) => {
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery)) {
        return false;
      }
      if (inStockOnly && !product.inStock) return false;
      if (topRatedOnly && product.rating < 4) return false;
      if (underThirtyOnly && product.price >= 30) return false;
      return true;
    });

    const sortedProducts = [...filteredProducts];

    switch (sortBy) {
      case "price-low-to-high":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-high-to-low":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "rating-high-to-low":
        sortedProducts.sort((a, b) => b.rating - a.rating);
        break;
      case "name-a-to-z":
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return sortedProducts;
  }, [
    data?.products,
    inStockOnly,
    searchQuery,
    sortBy,
    topRatedOnly,
    underThirtyOnly,
  ]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !data) {
    return <div className="p-4">Failed to load products.</div>;
  }

  return (
    <div>
      <Helmet>
        <title>Shop | Roselle</title>
      </Helmet>

      <div className="mb-8 border-b border-foreground/10 pb-4 flex flex-col gap-y-4 md:flex-row justify-between">
        <h1 className="text-[#BF6070] font-medium">
          {hasSearchQuery
            ? `Search result for "${searchParams.get("q")?.trim() ?? ""}"`
            : "Shop All"}
        </h1>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                <FunnelIcon />
                <span>FILTER</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Filter Products</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={inStockOnly}
                onCheckedChange={(checked) => setInStockOnly(Boolean(checked))}
              >
                In stock only
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={topRatedOnly}
                onCheckedChange={(checked) => setTopRatedOnly(Boolean(checked))}
              >
                Rating 4.0+
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={underThirtyOnly}
                onCheckedChange={(checked) =>
                  setUnderThirtyOnly(Boolean(checked))
                }
              >
                Price under Rs.30
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                <ArrowUpDown />
                <span>SORT</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Sort By</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={sortBy}
                onValueChange={(value) => setSortBy(value as SortOption)}
              >
                <DropdownMenuRadioItem value="featured">
                  Featured
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="price-low-to-high">
                  Price: Low to High
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="price-high-to-low">
                  Price: High to Low
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="rating-high-to-low">
                  Rating: High to Low
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="name-a-to-z">
                  Name: A to Z
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {hasSearchQuery && products.length === 0 ? (
        <div className="rounded-xl bg-card px-5 py-8 text-sm text-muted-foreground">
          No result found for "{searchParams.get("q")?.trim() ?? ""}".
        </div>
      ) : (
        <ProductList products={products} />
      )}
    </div>
  );
}
