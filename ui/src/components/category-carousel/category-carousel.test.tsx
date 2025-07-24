import { render, screen, fireEvent } from "@testing-library/react";
import { CategoryCarousel } from "./category-carousel";
import { Category } from "@/components/category-carousel/types";

describe("CategoryCarousel", () => {
  const categories: Category[] = ["Movies", "Phrases", "Countries"];
  const setSelectedCategory = jest.fn();

  it("renders all category items", () => {
    render(
      <CategoryCarousel
        carouselItems={categories}
        selectedCategory={undefined}
        setSelectedCategory={setSelectedCategory}
      />
    );

    categories.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it("highlights selected category", () => {
    render(
      <CategoryCarousel
        carouselItems={categories}
        selectedCategory={categories[0]}
        setSelectedCategory={setSelectedCategory}
      />
    );

    const selectedCategory = screen.getByText(categories[0]);
    expect(selectedCategory.parentElement?.parentElement).toHaveClass(
      "bg-[#007eb6]"
    );
  });

  it("calls setSelectedCategory when item clicked", () => {
    render(
      <CategoryCarousel
        carouselItems={categories}
        selectedCategory={undefined}
        setSelectedCategory={setSelectedCategory}
      />
    );

    fireEvent.click(screen.getByText(categories[1]));
    expect(setSelectedCategory).toHaveBeenCalledWith(categories[1]);
  });
});
