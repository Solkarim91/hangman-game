import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FC } from "react";
import { newCategoryButton, playAgainButton } from "./selectors";

type GameButtonsProps = {
  resetGame: () => void;
  handleNewCategory: () => void;
};

export const GameButtons: FC<GameButtonsProps> = ({
  resetGame,
  handleNewCategory,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.5, ease: "easeOut" }}
      className="text-4xl font-bold font-main justify-items-center"
    >
      <div className="flex flex-col items-center gap-3 *:text-2xl *:px-20 *:w-[30%]">
        <Button
          variant={"outline"}
          onClick={resetGame}
          data-testid={playAgainButton}
        >
          {"PLAY AGAIN"}
        </Button>
        <Button
          variant={"outline"}
          onClick={handleNewCategory}
          data-testid={newCategoryButton}
        >
          {"NEW CATEGORY"}
        </Button>
      </div>
    </motion.div>
  );
};
