/** @jsx h */
import { h } from "preact";
import { render, screen } from "@testing-library/preact";
import { TestButton } from "./TestButton";

test("Renders correctly", () => {
  render(<TestButton text="Click Me" />);

  expect(screen.getByText(/click me/i)).toBeInTheDocument();
});
