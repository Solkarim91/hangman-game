import { Card } from "@/components/ui/card";
import { Logo } from "@/components/ui/logo";
import { CATEGORY_TITLES } from "./constants";
import { verticalCarousel } from "@/components/carousel";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="mt-20 flex flex-col items-center gap-8">
      <Logo />
      <Card className="items-center h-[50vh] w-[80vw]">
        <div className="items-center flex flex-col gap-20">
          <p className="font-main max-w-[75%] text-center text-xl">
            {"To get started, pick a category below and then hit 'PLAY'!"}
          </p>

          {verticalCarousel(CATEGORY_TITLES)}

          <Button className="font-main text-xl" variant={"outline"}>
            {"PLAY"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
