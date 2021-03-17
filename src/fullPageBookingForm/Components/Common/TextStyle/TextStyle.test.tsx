/** @jsx h */
import { h } from "preact";
import { render, screen } from "@testing-library/preact";
import { TextStyle } from "./TextStyle";

test("Displays text correctly", () => {
  render(<TextStyle variant="display1" text="This is a text" />);

  expect(screen.getByText(/this is a text/i)).toBeInTheDocument();
});
