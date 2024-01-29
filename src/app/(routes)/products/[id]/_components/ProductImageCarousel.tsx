"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { ProductType } from "@/lib/types/ProductType";
import Image from "next/image";

export default function ProductImageCarousel({
  product: { images, name },
}: {
  product: ProductType;
}) {
  return (
    <div className=" px-5">
      <Carousel
        opts={{
          loop: true,
          align: "center",
        }}
        plugins={[Autoplay()]}
        className="w-full"
      >
        <CarouselContent>
          {images?.map((image) => (
            <CarouselItem key={image?._id}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <Image
                      src={image.url}
                      alt={name}
                      width={500}
                      height={500}
                      className="w-full"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
