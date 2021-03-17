/** @jsx h */
import { h } from "preact";
import { render, screen, fireEvent } from "@testing-library/preact";
import { Button } from "./Button";

test("Displays text correctly", () => {
  render(<Button color="primary" text="Click Me" />);

  expect(screen.getByText(/click me/i)).toBeInTheDocument();
});

test("Calls onClick callback", () => {
  const handleClick = jest.fn();

  render(<Button color="primary" text="Click Me" onClick={handleClick} />);

  fireEvent.click(screen.getByText(/click me/i));

  expect(handleClick).toHaveBeenCalledTimes(1);
});

test("Does not call onClick callback when disabled", () => {
  const handleClick = jest.fn();

  render(
    <Button disabled color="primary" text="Click Me" onClick={handleClick} />,
  );

  fireEvent.click(screen.getByText(/click me/i));

  expect(handleClick).not.toHaveBeenCalled();
});
