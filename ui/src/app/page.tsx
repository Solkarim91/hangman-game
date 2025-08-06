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

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >(undefined);
  const carouselItems = Object.keys(CATEGORY_WORDS);

  const router = useRouter();

  const handlePlayClick = useCallback(() => {
    if (selectedCategory) {
      router.push(`/game/${selectedCategory.toLowerCase()}`);
    }
  }, [selectedCategory, router]);

  const isLoading = Boolean(!selectedCategory);

  return (
    <div className="flex flex-col items-center gap-10 pt-8 h-[100vh]">
      <Logo />
      {isLoading && <Loading />}

      <div className={cn(
        "items-center flex flex-col gap-20",
        {
          "opacity-0": isLoading
        }
      )}>
        <p className="font-main max-w-[75%] text-center text-2xl">
          {"To get started, pick a category below and then hit 'PLAY'!"}
        </p>

        <CategoryCarousel
          carouselItems={carouselItems}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <Button
          className="font-main text-3xl p-6 cursor-pointer hover:scale-105"
          variant={"outline"}
          disabled={!selectedCategory}
          onClick={handlePlayClick}
        >
          {"PLAY"}
        </Button>
      </div>
    </div>
  );
}
