/** @jsx h */
import { h } from "preact";
import { fireEvent, render, screen } from "@testing-library/preact";
import { Dialog, DialogProps } from "./Dialog";

const props: DialogProps = {
  open: true,
  title: "Dialog Title",
  message: "This is the dialog message.",
  actions: [
    {
      color: "default",
      variant: "text",
      text: "Cancel",
      onClick: jest.fn(),
    },
    {
      color: "primary",
      variant: "contained",
      text: "Yes, proceed",
      onClick: jest.fn(),
    },
  ],
  onClose: jest.fn(),
};

test("Toggles correctly", () => {
  const { rerender } = render(<Dialog {...props} open={false} />);

  expect(screen.queryByText(/dialog title/i)).not.toBeInTheDocument();
  expect(
    screen.queryByText(/this is the dialog message/i),
  ).not.toBeInTheDocument();

  rerender(<Dialog {...props} />);

  expect(screen.getByText(/dialog title/i)).toBeInTheDocument();
  expect(screen.getByText(/this is the dialog message/i)).toBeInTheDocument();
});

test("Displays content correctly", () => {
  render(<Dialog {...props} />);

  expect(screen.getByText(/dialog title/i)).toBeInTheDocument();
  expect(screen.getByText(/this is the dialog message\./i)).toBeInTheDocument();
  expect(screen.getByText(/cancel/i)).toBeInTheDocument();
  expect(screen.getByText(/yes, proceed/i)).toBeInTheDocument();
});

test("Calls onClose callback when close button is clicked", () => {
  const handleClose = jest.fn();

  render(<Dialog {...props} onClose={handleClose} />);

  fireEvent.click(screen.getByTestId("dialog-close-button"));

  expect(handleClose).toHaveBeenCalled();
});
