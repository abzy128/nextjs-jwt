"use client";
import Image from "next/image";
import CarouselItemModel from "@/models/carouselItemModel";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Intro } from "@/components/ui/intro";
import Autoplay from "embla-carousel-autoplay";
import News from "@/components/ui/news";
import CloudflareTrace from "@/components/ui/cloudflare-trace";

export default function Home() {
  const [carouselItems, setCarouselItems] = useState<CarouselItemModel[]>([]);

  useEffect(() => {
    fetch("/api/carousel")
      .then((res) => res.json())
      .then((data) => setCarouselItems(data));
  }, []);

  return (
    <main>
      <Intro />
      <Carousel plugins={[Autoplay({ delay: 5000 })]}>
        <CarouselContent>
          {carouselItems.map((item) => (
            <CarouselItem key={item._id}>
              <div className="items-center">
                <Image
                  src={`/images/${item.image}`}
                  alt={item.title}
                  width={1920}
                  height={1080}
                  className="object-cover w-full"
                />
                <h2>{item.title}</h2>
                <p>{item.description}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <h1 className="text-2xl font-bold">Get news about IT!</h1>
      <News />
      <h1 className="text-2xl font-bold">Trace your internet connection</h1>
      <CloudflareTrace />
    </main>
  );
}
