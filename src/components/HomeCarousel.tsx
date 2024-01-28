"use client";
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import image1 from "@/assets/carousel/1.webp";
import image2 from "@/assets/carousel/2.webp";
import SearchBox from "./SearchBox";
import { Car, Leaf } from "lucide-react";

const carouselItems = [
  { id: 1, image: image1 },
  { id: 2, image: image2 },
];

export default function HomeCarousel() {
  return (
    <section className="overflow-hidden">
      <Carousel
        className="w-full relative"
        opts={{
          loop: true,
          align: "center",
        }}
        plugins={[Autoplay()]}
      >
        <div className="absolute top-0 left-0 right-0 bottom-0 z-10">
          <div className="container flex  flex-col justify-center w-full h-full">
            <div className="space-y-8 max-w-[450px] ">
              <h2 className="text-4xl md:text-5xl text-brandPrimary font-bold">
                All you need for perfect breakfast
              </h2>
              <SearchBox />

              <div className="flex gap-10">
                <div className="flex gap-2">
                  <Car size={20} className="text-brandSecondary" />
                  <span className="text-sm">Free delivery for all orders</span>
                </div>
                <div className="flex gap-2">
                  <Leaf size={20} className="text-brandSecondary" />
                  <span className="text-sm">Only fresh foods</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <CarouselContent>
          {carouselItems.map((item) => (
            <CarouselItem
              key={item.id}
              className="w-full min-h-[22rem] md:h-auto"
            >
              <Image
                src={item.image}
                alt="banner"
                className="w-full h-full bg-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
