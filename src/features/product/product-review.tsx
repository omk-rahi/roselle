import { Star } from "lucide-react";

import type { ProductReview } from "@/features/shop/types";

type ProductReviewCardProps = {
  review: ProductReview;
};

export function ProductReviewCard({ review }: ProductReviewCardProps) {
  const reviewDate = new Date(review.date).toLocaleDateString();

  return (
    <article className="rounded-lg bg-white dark:bg-card p-4">
      <div className="mb-2 flex items-center gap-1 text-[#E58E1D]">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className={`h-3.5 w-3.5 ${
              index < review.rating
                ? "fill-current"
                : "fill-transparent text-muted-foreground/40"
            }`}
          />
        ))}
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{review.comment}</p>
      <p className="mt-2 text-xs text-[#BF6070]">
        {review.reviewerName} • {reviewDate}
      </p>
    </article>
  );
}
