"use client"
import Image from "next/image";
import CarouselItemModel from "@/models/carouselItemModel";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { Intro } from "@/components/ui/intro";
import Autoplay from "embla-carousel-autoplay"

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
      <Carousel plugins={[
        Autoplay({ delay: 5000 })
      ]}>
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
    </main>
  );
}
