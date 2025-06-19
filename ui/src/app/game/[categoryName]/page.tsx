import { Game } from "@/components/game/game";
import { NavBar } from "@/components/nav/nav";

export default async function GamePage({
  params,
}: {
  params: Promise<{ categoryName: string }>;
}) {
  const categoryName = (await params).categoryName;

  return (
    <div>
      <NavBar categoryName={categoryName} />
      <Game />
    </div>
  );
}
