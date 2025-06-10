import Image from "next/image";

export const Logo = () => (
  <div className="flex flex-col items-center">
    <Image
      src="/hangman-logo.png"
      alt="Hangman logo"
      width={150}
      height={32}
      priority
    />
    <h1 className="font-main text-3xl">HANGMAN</h1>
  </div>
);
