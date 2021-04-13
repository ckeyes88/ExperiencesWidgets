/** @jsx h */
import { h } from "preact";
import { fireEvent, render, screen } from "@testing-library/preact";
import { BottomDrawer, BottomDrawerProps } from "./BottomDrawer";

const props: BottomDrawerProps = {
  open: true,
  onClose: jest.fn(),
};

test("Toggles correctly", () => {
  const { rerender } = render(<BottomDrawer {...props} open={false} />);

  expect(screen.getByRole("dialog")).not.toHaveClass("bottom-drawer--open");

  rerender(<BottomDrawer {...props} />);

  expect(screen.getByRole("dialog")).toHaveClass("bottom-drawer--open");
});

test("Displays content correctly", () => {
  render(
    <BottomDrawer {...props}>
      <p>Hey there</p>
    </BottomDrawer>,
  );

  expect(screen.getByText(/hey there/i)).toBeInTheDocument();
});

test("Calls onClose callback when close button is clicked", () => {
  const handleClose = jest.fn();

  render(<BottomDrawer {...props} onClose={handleClose} />);

  fireEvent.click(screen.getByTestId("bottom-drawer-close-button"));

  expect(handleClose).toHaveBeenCalled();
});
