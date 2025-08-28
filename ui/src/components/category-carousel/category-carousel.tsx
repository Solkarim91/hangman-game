import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel/carousel";
import { Dispatch, FC, SetStateAction, useEffect, useMemo, useState } from "react";
import { Category } from "./types";
import { cn } from "@/lib/utils";

type CategoryCarouselProps = {
  carouselItems: readonly Category[];
  selectedCategory: Category | undefined;
  setSelectedCategory: Dispatch<SetStateAction<Category | undefined>>;
  isMobile: boolean;
};

export const CategoryCarousel: FC<CategoryCarouselProps> = ({
  carouselItems,
  selectedCategory,
  setSelectedCategory,
  isMobile,
}) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const { axis, orientation }: { axis: "x" | "y", orientation: "vertical" | "horizontal" } = useMemo(() => {
    return {
      axis: isMobile ? "y" : "x",
      orientation: isMobile ? "vertical" : "horizontal",
    };
  }, [isMobile]);

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
        axis: axis,
      }}
      orientation={orientation}
      className={`${isMobile ? "w-[70%]" : "w-[90%]"}`}
      setApi={setCarouselApi}
    >
      <CarouselContent className={cn("-mt-1 font-main", {
        "h-[140px]": isMobile
      })}>
        {carouselItems.map((itemTitle, index) => (
          <CarouselItem
            key={index}
            className="pt-1 basis-1/2 cursor-pointer"
            onClick={() => handleItemClick(index)}
          >
            <div className="p-1">
              <Card
                className={
                  `${selectedCategory === itemTitle
                    ? "bg-[#007eb6] text-white"
                    : ""}
                    ${isMobile ? "py-3" : ""}`
                }
              >
                <CardContent className="flex items-center justify-center">
                  <span className="text-3xl font-semibold">
                    {itemTitle}
                  </span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className={cn(
          "cursor-pointer hover:scale-105", 
          {
            "-left-20": orientation === "horizontal",
            "-top-18": orientation === "vertical"
          }
        )}
      />
      <CarouselNext className={cn(
          "cursor-pointer hover:scale-105", 
          {
            "-right-20": orientation === "horizontal",
            "-bottom-18": orientation === "vertical"
          }
        )}
      />
    </Carousel>
  );
};
