/** @jsx h */
import { h } from "preact";
import { fireEvent, render, screen } from "@testing-library/preact";
import { FormField, FormFieldProps } from "./FormField";

const defaultInputProps: FormFieldProps = {
  label: "Label Text",
  onFieldChange: jest.fn(),
  type: "Text",
  value: "",
};

const defaultSelectProps: FormFieldProps = {
  label: "Select Text",
  onFieldChange: jest.fn(),
  type: {
    options: ["Option A", "Option B"],
  },
  value: "",
};

test("Renders input form field correctly.", () => {
  render(<FormField {...defaultInputProps} id="TestID" />);

  const input = screen.getByTestId("TestID");

  expect(screen.getByText("Label Text")).toBeInTheDocument();
  expect(screen.getByText("*")).toBeInTheDocument();
  expect(input).not.toHaveAttribute("disabled", "");
});

test("Renders select form field correctly.", () => {
  render(<FormField {...defaultSelectProps} id="TestID" />);

  const select = screen.getByTestId("TestID");

  expect(screen.getByText("Select Text")).toBeInTheDocument();
  expect(screen.getByText("*")).toBeInTheDocument();
  expect(select).not.toHaveAttribute("disabled", "");
});

test("Calls on change in input field correctly.", () => {
  const handleChange = jest.fn();
  render(
    <FormField
      {...defaultInputProps}
      id="TestID"
      onFieldChange={handleChange}
    />,
  );

  const input = screen.getByTestId("TestID");

  fireEvent.change(input, { target: { value: "a" } });

  expect(handleChange).toHaveBeenCalledTimes(1);
  expect(input).toHaveValue("a");
});

test("Calls on change in select field correctly.", () => {
  const handleChange = jest.fn();
  render(
    <FormField
      {...defaultSelectProps}
      id="TestID"
      onFieldChange={handleChange}
    />,
  );

  const select = screen.getByTestId("TestID");

  fireEvent.change(select, { target: { value: "Option B" } });

  expect(handleChange).toHaveBeenCalledTimes(1);
  expect(select).toHaveValue("Option B");
});

test("Disables select field correctly.", () => {
  render(<FormField {...defaultSelectProps} id="TestID" disabled />);

  const select = screen.getByTestId("TestID");

  expect(select).toHaveAttribute("disabled", "");
});

test("Disables input field correctly.", () => {
  render(<FormField {...defaultInputProps} id="TestID" disabled />);

  const select = screen.getByTestId("TestID");

  expect(select).toHaveAttribute("disabled", "");
});

test("Renders optional label correctly in input field", () => {
  render(<FormField {...defaultInputProps} optionalLabel="Optional" />);

  expect(screen.getByText("Optional")).toBeInTheDocument();
});

test("Renders optional label correctly in select field", () => {
  render(<FormField {...defaultSelectProps} optionalLabel="Optional" />);

  expect(screen.getByText("Optional")).toBeInTheDocument();
});
