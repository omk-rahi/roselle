import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { Heart, Minus, Plus, Share2, Star } from "lucide-react";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Loader } from "@/components/shared/loader";
import { setCart } from "@/features/cart/cartSlice";
import { useAddToCartMutation } from "@/features/cart/mutations";
import { useProduct } from "@/features/shop/query";
import { type AppDispatch } from "@/store";
import { ProductReviewCard } from "./product-review";

export default function ProductDetailPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { id = "" } = useParams();
  const { data: product, isLoading, isError } = useProduct(id);
  const addToCartMutation = useAddToCartMutation();

  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const images = useMemo(() => product?.images ?? [], [product?.images]);
  const pageTitle =
    !isLoading && !isError && product
      ? `${product.title} | Roselle`
      : "Product | Roselle";

  if (isLoading) {
    return (
      <>
        <Helmet key={id}>
          <title>{pageTitle}</title>
        </Helmet>
        <Loader />
      </>
    );
  }

  if (isError || !product) {
    return (
      <>
        <Helmet key={id}>
          <title>{pageTitle}</title>
        </Helmet>
        <div className="p-4">Failed to load product details.</div>
      </>
    );
  }

  const hasImages = images.length > 0;
  const selectedImage = hasImages ? images[activeImage] : product.thumbnail;
  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);

  async function handleAddToCart() {
    if (!product) return;
    try {
      const response = await addToCartMutation.mutateAsync({
        productId: product.id,
        title: product.title,
        image: product.thumbnail,
        variant: product.category,
        price: discountedPrice,
        quantity,
        maxQuantity: Math.max(1, product.stock),
      });

      dispatch(setCart(response.items));
      toast.success("Added to cart");
    } catch {
      toast.error("Failed to add item to cart");
    }
  }

  return (
    <div className="space-y-10">
      <Helmet key={id}>
        <title>{pageTitle}</title>
      </Helmet>
      <section className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-start">
        <div className="grid grid-cols-[64px_1fr] gap-4 self-start sm:grid-cols-[78px_1fr]">
          <div className="space-y-3">
            {images.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setActiveImage(index)}
                className={`overflow-hidden rounded-md border bg-white dark:bg-card ${
                  activeImage === index
                    ? "border-foreground/40"
                    : "border-border"
                }`}
              >
                <img
                  src={image}
                  alt={`${product.title} preview ${index + 1}`}
                  className="h-15.5 w-15.5 object-cover sm:h-19 sm:w-19"
                />
              </button>
            ))}
          </div>

          <div className="relative h-105 overflow-hidden rounded-xl bg-white dark:bg-card sm:h-130 lg:h-145">
            <img
              src={selectedImage}
              alt={product.title}
              className="h-full w-full object-cover"
            />

            <div className="absolute top-4 right-4 flex items-center gap-2">
              <Button
                variant="secondary"
                size="icon-sm"
                className="rounded-full"
              >
                <Heart />
              </Button>
              <Button
                variant="secondary"
                size="icon-sm"
                className="rounded-full"
              >
                <Share2 />
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <div className="flex items-center gap-1 text-[#E58E1D]">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className={`h-4 w-4 ${
                    index < Math.round(product.rating)
                      ? "fill-current"
                      : "fill-transparent text-muted-foreground/40"
                  }`}
                />
              ))}
              <span className="ml-2 text-xs text-muted-foreground">
                ({product.reviews.length} Reviews)
              </span>
            </div>

            <h1 className="text-3xl leading-tight">{product.title}</h1>

            <div className="flex items-center gap-3">
              <span className="text-3xl font-semibold">
                Rs.{discountedPrice.toFixed(2)}
              </span>
              <span className="text-sm text-muted-foreground line-through">
                Rs.{product.price.toFixed(2)}
              </span>
              <Badge variant="success">
                {product.availabilityStatus.toUpperCase()}
              </Badge>
            </div>
          </div>

          <p className="text-sm leading-6 text-muted-foreground">
            {product.description}
          </p>

          <div className="flex gap-3 pt-2">
            <div className="flex items-center rounded-md border border-border bg-white dark:bg-card">
              <button
                type="button"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="px-4 py-2"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center text-sm">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((prev) => prev + 1)}
                className="px-4 py-2"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <Button
              className="flex-1 uppercase tracking-wide"
              onClick={handleAddToCart}
              disabled={addToCartMutation.isPending}
            >
              Add To Bag
            </Button>
          </div>

          <Accordion
            type="multiple"
            defaultValue={["description", "specifications"]}
            className="border-t border-border pt-2"
          >
            <AccordionItem value="description" className="border-border">
              <AccordionTrigger>Description</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {product.description}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="specifications" className="border-border">
              <AccordionTrigger>Specifications</AccordionTrigger>
              <AccordionContent className="space-y-1 text-muted-foreground">
                <p>Category: {product.category}</p>
                <p>SKU: {product.sku}</p>
                <p>Weight: {product.weight}g</p>
                <p>
                  Dimensions: {product.dimensions.width} x&nbsp;
                  {product.dimensions.height} x {product.dimensions.depth} mm
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="delivery" className="border-border">
              <AccordionTrigger>Free Delivery</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {product.shippingInformation}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="warranty" className="border-border">
              <AccordionTrigger>Warranty & Return</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {product.warrantyInformation}. {product.returnPolicy}
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="space-y-3">
            <h2 className="text-2xl">Customer Reviews</h2>
            {product.reviews.slice(0, 4).map((review) => (
              <ProductReviewCard key={review.reviewerEmail} review={review} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
