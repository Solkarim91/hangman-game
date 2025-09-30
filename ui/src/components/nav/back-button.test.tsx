import { fireEvent, render, screen } from "@testing-library/react";
import { BackButton } from "./back-button";

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    pathname: "/",
  }),
}));

describe("BackButton", () => {
  it("calls router.push() when clicked", () => {
    render(<BackButton />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(mockPush).toHaveBeenCalled();
  });
});
