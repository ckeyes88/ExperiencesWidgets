/** @jsx h */
import { h } from "preact";
import { render, screen } from "@testing-library/preact";
import { InputLabel } from "./InputLabel";

test("Displays optional marker to label if not required", () => {
  const { rerender } = render(
    <InputLabel name="test-field" label="Test Field" />,
  );

  expect(screen.getByText(/test field/i)).toBeInTheDocument();
  expect(screen.getByText(/opt/i)).toBeInTheDocument();

  rerender(<InputLabel name="test-field" label="Test Field" required={true} />);
  expect(screen.queryByText(/opt/i)).not.toBeInTheDocument();
});
