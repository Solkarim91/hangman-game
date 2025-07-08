export const checkUserWon = (gameWords: string[], usedLetters: Record<string, "correct" | "incorrect" | "default">) => {
    const uniqueChars = new Set(
      gameWords
        .join("")
        .split("")
        .filter((char) => char !== " ")
    );

    const guessedCorrect = Object.entries(usedLetters)
      .filter(([_, state]) => state === "correct")
      .map(([char]) => char);

    const hasWon = [...uniqueChars].every((char) =>
      guessedCorrect.includes(char)
    );

    return hasWon;
};
