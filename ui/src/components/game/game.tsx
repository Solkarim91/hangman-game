"use client";

import { FC } from "react";
import { Keyboard } from "./keyboard/keyboard";
import Loading from "@/components/ui/loading/loading";
import { useRouter } from "next/navigation";
import { LivesIndicator } from "./lives-indicator/lives-indicator";
import { GAME_OUTCOME_MESSAGES, GAME_STATUS } from "./constants";
import { useGameLogic } from "@/hooks/use-game-logic";
import { LetterTiles } from "./letter-tiles/letter-tiles";
import { GameOutcome } from "./game-outcome/game-outcome";
import { UserFeedback } from "./user-feedback/user-feedback";
import { GameIcon } from "./game-icon/game-icon";

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
  const handleNewCategoryButtonClick = () => router.back();

  return (
    <>
      <div className="p-10 w-[100%] h-[70vh] flex flex-col justify-between sm:mt-0 relative">
        <GameIcon gameStatus={gameStatus} />

        {gameStatus === GAME_STATUS.won && (
          <GameOutcome
            outcomeMessage={GAME_OUTCOME_MESSAGES.won}
            resetGame={resetGame}
            handleNewCategoryButtonClick={handleNewCategoryButtonClick}
          />
        )}

        {gameStatus === GAME_STATUS.lost && (
          <GameOutcome
            outcomeMessage={GAME_OUTCOME_MESSAGES.lost}
            resetGame={resetGame}
            handleNewCategoryButtonClick={handleNewCategoryButtonClick}
          />
        )}

        {gameWords ? (
          <>
            {gameStatus === GAME_STATUS.playing && (
              <LivesIndicator
                maxLives={maxLives}
                numOfIncorrectGuesses={numOfIncorrectGuesses}
                gameStatus={gameStatus}
              />
            )}

            <div
              className={`text-center flex flex-col h-full ${gameStatus === GAME_STATUS.playing ? "mt-10" : ""} ${isGameStarted ? "" : "justify-between"}`}
            >
              <LetterTiles
                gameWords={gameWords}
                gameStatus={gameStatus}
                usedLetters={usedLetters}
              />

              {gameStatus === GAME_STATUS.playing && (
                <UserFeedback
                  isGameStarted={isGameStarted}
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
        {gameStatus === GAME_STATUS.playing && (
          <Keyboard onKeyClick={handleKeyClick} usedLetters={usedLetters} />
        )}
      </div>
    </>
  );
};
