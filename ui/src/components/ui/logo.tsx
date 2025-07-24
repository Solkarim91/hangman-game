import Image from "next/image";
import { logo } from "./selectors";

export const Logo = () => (
  <div className="flex flex-col items-center">
    <Image
      src="/hangman-logo.png"
      alt="Hangman logo"
      width={200}
      height={43}
      priority
      data-testid={logo}
    />
    <h1 className="font-main text-3xl">HANGMAN</h1>
  </div>
);
