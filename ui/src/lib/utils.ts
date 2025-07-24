import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
};

export function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
};

export function formatGamePhrase(phrase: string) {
  return phrase.toUpperCase().replace("-", " ").split(" ");
};

export function capitalizeCategoryFirstLetter(category: string) {
  return category.charAt(0).toUpperCase() + category.slice(1);
}
