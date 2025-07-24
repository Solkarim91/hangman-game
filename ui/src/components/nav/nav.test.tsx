import { render, screen } from "@testing-library/react";
import { NavBar } from "./nav";
import Home from "@/app/page";
import { navBar } from "./selectors";

jest.mock("embla-carousel-react", () => ({
  __esModule: true,
  default: () => [jest.fn(), null],
}));

jest.mock("next/navigation", () => ({
  useRouter: () => {},
}));

describe("NavBar", () => {
  const categoryName = "Movies";
  it("should display the nav bar with the correct category name", () => {
    render(<NavBar categoryName={categoryName} />);
    expect(screen.queryByText(categoryName)).toBeVisible();
  });

  it("should not display the nav bar on the home page", () => {
    render(<Home />);
    expect(screen.queryByTestId(navBar)).not.toBeInTheDocument();
  });
});
