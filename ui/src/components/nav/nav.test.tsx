import { fireEvent, render, screen } from "@testing-library/react";
import { NavBar } from "./nav";
import { BackButton } from "./back-button";
import Home from "@/app/page";
import { navBar } from "./selectors";

const mockBack = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    back: mockBack,
    pathname: "/",
  }),
}));

jest.mock("embla-carousel-react", () => ({
  __esModule: true,
  default: () => [jest.fn(), null],
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

describe("BackButton", () => {
  it("calls router.back() when clicked", () => {
    render(<BackButton />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(mockBack).toHaveBeenCalled();
  });
});
