import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel/carousel";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
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
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);

  useEffect(() => {
    if (!carouselApi) return;

    const onSelect = (api: CarouselApi) => {
      if (api) {
        const index = api.selectedScrollSnap();
        setSelectedCategory(carouselItems[index]);
      };
    };
    
    onSelect(carouselApi);

    carouselApi.on("select", () => onSelect(carouselApi));
    return () => {
      carouselApi.off("select", () => onSelect(carouselApi));
    };
  }, [carouselApi, carouselItems, setSelectedCategory]);

  const handleItemClick = (index: number) => {
    if (!carouselApi) return;
    carouselApi.scrollTo(index);
  };

  return (
    <Carousel
      opts={{
        align: "center",
        loop: true,
        axis: "y",
      }}
      orientation="vertical"
      className="w-[80%] max-w-xs"
      setApi={setCarouselApi}
    >
      <CarouselContent className="-mt-1 h-[200px] font-main">
        {carouselItems.map((itemTitle, index) => (
          <CarouselItem
            key={index}
            className="pt-1 basis-1/2 cursor-pointer"
            onClick={() => handleItemClick(index)}
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
      <CarouselPrevious className="cursor-pointer hover:scale-105"/>
      <CarouselNext className="cursor-pointer hover:scale-105"/>
    </Carousel>
  );
};
