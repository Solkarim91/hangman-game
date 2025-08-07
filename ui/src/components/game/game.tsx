"use client";

import { FC } from "react";
import { Keyboard } from "./keyboard/keyboard";
import { Loading } from "@/components/ui/loading";
import { useRouter } from "next/navigation";
import { LivesIndicator } from "./lives-indicator/lives-indicator";
import { GAME_OUTCOME_MESSAGES, GAME_STATUS } from "./constants";
import { useGameLogic } from "@/hooks/use-game-logic";
import { LetterTiles } from "./letter-tiles/letter-tiles";
import { GameOutcome } from "./game-outcome/game-outcome";
import { UserFeedback } from "./user-feedback/user-feedback";
import { GameIcon } from "./game-icon/game-icon";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

type GameProps = {
  categoryName: string;
};

export const Game: FC<GameProps> = ({ categoryName }) => {
  const {
    gameWords,
    gameStatus,
    usedLetters,
    numOfIncorrectGuesses,
    userSelectionFeedback,
    maxLives,
    isGameStarted,
    handleKeyClick,
    resetGame,
  } = useGameLogic({ categoryName }); //TODO: include 'difficulty' (probably passed down as a prop in future)
  const router = useRouter();
  const handleNewCategory = () => router.back();
  const isLoading = Boolean(!gameWords);
  const isMobile = useIsMobile();

  return (
    <>
      <div className={cn("p-10 w-[100%] h-[70vh] flex flex-col justify-between sm:mt-0 relative", {
        "p-6": isMobile
      })}>
        <GameIcon gameStatus={gameStatus} />

        {gameStatus === GAME_STATUS.won && (
          <GameOutcome
            outcomeMessage={GAME_OUTCOME_MESSAGES.won}
            resetGame={resetGame}
            handleNewCategory={handleNewCategory}
            isMobile={isMobile}
          />
        )}

        {gameStatus === GAME_STATUS.lost && (
          <GameOutcome
            outcomeMessage={GAME_OUTCOME_MESSAGES.lost}
            resetGame={resetGame}
            handleNewCategory={handleNewCategory}
            isMobile={isMobile}
          />
        )}

        {gameWords ? (
          <>
            {gameStatus === GAME_STATUS.playing && (
              <LivesIndicator
                maxLives={maxLives}
                numOfIncorrectGuesses={numOfIncorrectGuesses}
                gameStatus={gameStatus}
                isMobile={isMobile}
              />
            )}

            <div
              className={`text-center flex flex-col h-full max-w-[900px] self-center ${isGameStarted ? "" : "justify-between"}`}
            >
              <LetterTiles
                gameWords={gameWords}
                gameStatus={gameStatus}
                usedLetters={usedLetters}
                isMobile={isMobile}
              />

              {gameStatus === GAME_STATUS.playing && (
                <UserFeedback
                  userSelectionFeedback={userSelectionFeedback}
                />
              )}
            </div>
          </>
        ) : (
          <Loading />
        )}
      </div>
      <div>
        {!isLoading && gameStatus === GAME_STATUS.playing && (
          <Keyboard onKeyClick={handleKeyClick} usedLetters={usedLetters} isGameStarted={isGameStarted} isMobile={isMobile} />
        )}
      </div>
    </>
  );
};
