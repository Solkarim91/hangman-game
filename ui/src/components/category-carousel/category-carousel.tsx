import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel/carousel";
import { Dispatch, FC, SetStateAction } from "react";
import { Category } from "./types";

type CategoryCarouselProps = {
  carouselItems: readonly Category[];
  selectedCategory: Category | undefined;
  setSelectedCategory: Dispatch<SetStateAction<Category | undefined>>;
};

export const CategoryCarousel: FC<CategoryCarouselProps> = ({
  carouselItems,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <Carousel
      opts={{
        align: "center",
        loop: true,
      }}
      orientation="vertical"
      className="w-[80%] max-w-xs"
    >
      <CarouselContent className="-mt-1 h-[200px] font-main">
        {carouselItems.map((itemTitle, index) => (
          <CarouselItem
            key={index}
            className="pt-1 basis-1/2"
            onClick={() => setSelectedCategory(itemTitle)}
          >
            <div className="p-1">
              <Card
                className={
                  selectedCategory === itemTitle
                    ? "bg-[#007eb6] text-white"
                    : ""
                }
              >
                <CardContent className="flex items-center justify-center">
                  <span className="text-2xl font-semibold">{itemTitle}</span>
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
};
