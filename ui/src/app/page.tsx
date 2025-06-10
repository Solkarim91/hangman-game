import { Logo } from "../components/logo";

export default function Home() {
  return (
    <div className="mt-20 flex flex-col items-center gap-8">
      <Logo />
      {/* TODO: replace below div with custom Card component */}
      <div>
        <p className="font-main">
          {"To get started, pick a category below and then hit 'PLAY'!"}
        </p>
      </div>
    </div>
  );
}
