/** @jsx h */
import { h } from "preact";
import { fireEvent, render, screen } from "@testing-library/preact";
import { CustomForm, CustomFormProps } from "./CustomForm";
import {
  defaultPerAttendeeFormProps,
  defaultPerOrderFormProps,
} from "../../../__mocks__/CustomForm";

const defaultProps: CustomFormProps = {
  formType: defaultPerOrderFormProps,
  handleChange: jest.fn(),
  labels: {
    optionalFieldLabel: "Optional",
  },
  isDisabled: false,
};

const perAttendeeProps: CustomFormProps = {
  formType: defaultPerAttendeeFormProps,
  handleChange: jest.fn(),
  labels: {
    optionalFieldLabel: "Optional",
  },
  isDisabled: false,
};

test("Renders custom per order form correctly.", () => {
  render(<CustomForm {...defaultProps} />);

  expect(screen.getAllByText("*")).toHaveLength(3);
  expect(screen).toBeDefined();
});

test("Changes value in custom per order form correctly.", () => {
  const handleChange = jest.fn();
  render(<CustomForm {...defaultProps} handleChange={handleChange} />);

  const input = screen.getByTestId("First%%%0%%%0");

  fireEvent.change(input, { target: { value: "New value" } });

  expect(handleChange).toHaveBeenCalledTimes(1);
  expect(input).toHaveValue("New value");
});

test("Renders custom per attendee form correctly.", () => {
  render(<CustomForm {...defaultProps} />);

  expect(screen.getAllByText("*")).toHaveLength(3);
  expect(screen).toBeDefined();
});

test("Changes value in custom per attendee form correctly.", () => {
  const handleChange = jest.fn();
  render(<CustomForm {...perAttendeeProps} handleChange={handleChange} />);

  const input = screen.getByTestId("First%%%0%%%0");

  fireEvent.change(input, { target: { value: "New value" } });

  expect(handleChange).toHaveBeenCalledTimes(1);
  expect(input).toHaveValue("New value");
});
