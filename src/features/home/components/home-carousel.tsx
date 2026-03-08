import { useEffect, useState } from "react";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ShoppingBagIcon } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { Link } from "react-router";

const slides = [
  {
    image: "/hero-01.png",
    alt: "Close-up portrait with gold floral earring",
    title: "Timeless Elegance,\nHandcrafted For You",
    description:
      "Discover jewelry that speaks your story - designed with care, crafted with precision, and made to shine in every moment.",
  },
  {
    image: "./hero-02.jpg",
    alt: "Woman wearing earrings in soft daylight",
    title: "Everyday Luxury,\nMade Personal",
    description:
      "From subtle sparkle to statement pieces, find handcrafted designs created to reflect your individual style.",
  },
  {
    image: "./hero-03.jpg",
    alt: "Minimal jewelry close-up shot",
    title: "Soft Light,\nFine Detail",
    description:
      "Thoughtfully finished pieces that balance modern simplicity with timeless craftsmanship.",
  },
];

export function HomeCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    const updateCurrent = () => setCurrent(api.selectedScrollSnap());
    updateCurrent();

    api.on("select", updateCurrent);

    return () => {
      api.off("select", updateCurrent);
    };
  }, [api]);

  return (
    <section className="w-full">
      <div className="mx-auto w-full max-w-7xl">
        <Carousel
          setApi={setApi}
          opts={{ align: "start", loop: true }}
          className="w-full"
          plugins={[
            Autoplay({
              delay: 4000,
            }),
          ]}
        >
          <CarouselContent className="ml-0">
            {slides.map((slide) => (
              <CarouselItem key={slide.image} className="pl-0">
                <div className="relative h-70 w-full overflow-hidden rounded-[10px] sm:h-90 lg:h-140">
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    className="h-full w-full object-cover object-center"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-r from-black/45 via-black/12 to-transparent" />

                  <div className="absolute inset-y-0 left-0 flex max-w-160 items-center px-6 sm:px-10">
                    <div className="text-white">
                      <h2 className="whitespace-pre-line text-3xl leading-[1.1] font-normal tracking-tight sm:text-4xl lg:text-[56px]">
                        {slide.title}
                      </h2>
                      <p className="mt-4 w-[92%] text-sm leading-relaxed text-white/78 sm:text-base">
                        {slide.description}
                      </p>
                      <Link to="/shop">
                        <button
                          type="button"
                          className="mt-6 inline-flex items-center gap-2 rounded-md bg-white dark:bg-secondary dark:text-white px-5 py-3 text-sm font-semibold tracking-wide text-neutral-900 uppercase transition-colors hover:bg-white/90"
                        >
                          Shop The Collection
                          <ShoppingBagIcon className="h-4 w-4" />
                        </button>
                      </Link>
                    </div>
                  </div>

                  <div className="absolute right-8 bottom-8 flex items-center gap-2">
                    {slides.map((dot, dotIndex) => (
                      <button
                        key={dot.image}
                        type="button"
                        aria-label={`Go to slide ${dotIndex + 1}`}
                        onClick={() => api?.scrollTo(dotIndex)}
                        className={`h-1 rounded-full transition-all ${
                          current === dotIndex
                            ? "w-4 bg-white"
                            : "w-3 bg-black/35"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
