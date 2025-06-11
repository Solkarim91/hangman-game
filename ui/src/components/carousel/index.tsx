import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

export function verticalCarousel(carouselItems: string[]) {
  return (
    <Carousel
      opts={{
        align: "center",
        loop: true,
      }}
      orientation="vertical"
      className="w-[80%] max-w-xs"
    >
      <CarouselContent className="-mt-1 h-[150px] font-main">
        {carouselItems.map((itemTitle, index) => (
          <CarouselItem key={index} className="pt-1 basis-1/2">
            <div className="p-1">
              <Card>
                <CardContent className="flex items-center justify-center">
                  <span className="text-xl font-semibold">{itemTitle}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
