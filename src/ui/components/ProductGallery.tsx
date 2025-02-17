"use client";

import useEmblaCarousel from 'embla-carousel-react';
import { ProductImageWrapper } from "@/ui/atoms/ProductImageWrapper";

interface ProductGalleryProps {
  images: Array<{
    url: string;
    alt?: string | null;
    __typename?: string;
  }>;
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel();

  if (!images.length) return null;

  return (
    <div className="w-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {images.map((image, index) => (
            <div key={image.url} className="flex-[0_0_100%] min-w-0">
              <ProductImageWrapper
                priority={index === 0}
                alt={image.alt ?? ""}
                width={1024}
                height={1024}
                src={image.url}
              />
            </div>
          ))}
        </div>
      </div>
      {images.length > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {images.map((image, index) => (
            <button
              key={`thumb-${image.url}`}
              className="h-16 w-16 overflow-hidden rounded border-2 border-transparent transition-all hover:border-neutral-900"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                emblaApi?.scrollTo(index);
              }}
            >
              <ProductImageWrapper
                alt={image.alt ?? ""}
                width={64}
                height={64}
                src={image.url}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}