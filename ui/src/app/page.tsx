"use client";

import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { CategoryCarousel } from "@/components/category-carousel/category-carousel";
import { Category } from "@/components/category-carousel/types";
import { CATEGORY_WORDS } from "@/lib/category-words";
import { Loading } from "@/components/ui/loading";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >(undefined);
  const carouselItems = Object.keys(CATEGORY_WORDS);
  const isMobile = useIsMobile();
  const router = useRouter();

  const handlePlayClick = useCallback(() => {
    if (selectedCategory) {
      router.push(`/game/${selectedCategory.toLowerCase()}`);
    }
  }, [selectedCategory, router]);

  const isLoading = Boolean(!selectedCategory);

  return (
    <div className={cn(
      "flex flex-col items-center justify-between h-screen w-screen overflow-hidden",
      {
        "justify-start" : isMobile
      }
    )}>
      <div className="mt-12">
        <Logo isMobile={isMobile} />
      </div>

      {isLoading && <Loading />}

      <div
        className={cn(
          "flex flex-col items-center justify-around flex-1 px-4 text-center transition-opacity w-full",
          {
            "opacity-0": isLoading,
          }
        )}
      >
        <div className="flex flex-col items-center gap-y-25 xl:gap-y-10 w-full sm:w-[80%]">
          <p className="font-main text-3xl max-w-[100%]">
            {"To get started, pick a category below and then hit 'PLAY'!"}
          </p>

          <CategoryCarousel
            carouselItems={carouselItems}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            isMobile={isMobile}
          />
        </div>

        <Button
          className="font-main text-3xl p-6 cursor-pointer hover:scale-105"
          variant="outline"
          disabled={!selectedCategory}
          onClick={handlePlayClick}
        >
          {"PLAY"}
        </Button>
      </div>
    </div>
  );
}
