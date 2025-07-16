export const CATEGORY_TITLES = ["Countries", "Phrases", "Movies"] as const;
export type Category = typeof CATEGORY_TITLES[number];
