/** @jsx h */
import { h } from "preact";
import { fireEvent, render, screen } from "@testing-library/preact";

import { ConfirmationProps, Confirmation } from "./Confirmation";

const defaultProps: ConfirmationProps = {
  email: "test@test.com",
  onClose: jest.fn(),
};

test("Renders confirmation view correctly.", () => {
  render(<Confirmation {...defaultProps} />);

  expect(screen.getByText("test@test.com")).toBeDefined();
  expect(screen).toBeDefined();
});

test("Calls onClose correctly.", () => {
  const onClose = jest.fn();
  render(<Confirmation {...defaultProps} onClose={onClose} />);
  const close = screen.getByText("close");

  fireEvent.click(close);

  expect(onClose).toBeCalledTimes(1);
});
