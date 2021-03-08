/** @jsx h */
import { h } from "preact";
import { fireEvent, render, screen } from "@testing-library/preact";
import { TextField } from "./TextField";

test("Sets value correctly", () => {
  render(<TextField name="test-field" label="Test Field" value="Test Value" />);

  const input = screen.getByRole("textbox");

  expect(input).toBeInTheDocument();
  expect((input as HTMLInputElement).value).toBe("Test Value");
});

test("Calls onChange callback", () => {
  const handleChange = jest.fn();

  render(
    <TextField name="test-field" label="Test Field" onChange={handleChange} />,
  );

  const input = screen.getByRole("textbox");

  fireEvent.change(input, { currentTarget: { value: "new value" } });

  expect(handleChange).toHaveBeenCalled();
});
