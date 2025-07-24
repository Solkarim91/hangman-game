import { fireEvent, render, screen } from "@testing-library/react";
import { BackButton } from "./back-button";

const mockBack = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    back: mockBack,
    pathname: "/",
  }),
}));

describe("BackButton", () => {
  it("calls router.back() when clicked", () => {
    render(<BackButton />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(mockBack).toHaveBeenCalled();
  });
});
