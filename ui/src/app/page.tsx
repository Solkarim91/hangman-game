import { Card } from "@/components/ui/card";
import { Logo } from "@/components/ui/logo";
import { CATEGORY_TITLES } from "./constants";

export default function Home() {
  return (
    <div className="mt-20 flex flex-col items-center gap-8">
      <Logo />
      <Card>
        <p className="font-main">
          {"To get started, pick a category below and then hit 'PLAY'!"}
        </p>

        <ul className="carousel">
          {CATEGORY_TITLES.map((title) => (
            <li key={title}>{title}</li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
