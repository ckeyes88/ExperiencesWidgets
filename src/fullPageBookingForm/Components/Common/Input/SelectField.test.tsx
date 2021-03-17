/** @jsx h */
import { h } from "preact";
import { fireEvent, render, screen } from "@testing-library/preact";
import { SelectField, SelectOption } from "./SelectField";

const options: SelectOption[] = [
  {
    value: "option1",
    text: "Option 1",
  },
  {
    value: "option2",
    text: "Option 2",
  },
];

test("Renders correctly with basic props", () => {
  render(
    <SelectField name="test-field" label="Test Field" placeholder="Select an option" options={options} />,
  );

  expect(screen.getByText(/test field/i)).toBeInTheDocument();
  expect(screen.getByText(/select an option/i)).toBeInTheDocument();
  expect(screen.getAllByRole("option").length).toBe(options.length + 1); // plus the placeholder
});

test("Displays fallback placeholder if no placeholder provided", () => {
  const { rerender } = render(
    <SelectField name="test-field" label="Test Field" options={options} />,
  );

  expect(screen.getByText(/make selection/i)).toBeInTheDocument();

  rerender(
    <SelectField
      name="test-field"
      label="Test Field"
      options={options}
      placeholder="Select an option"
    />,
  );
  expect(screen.queryByText(/make selection/i)).not.toBeInTheDocument();
  expect(screen.getByText(/select an option/i)).toBeInTheDocument();
});

test("Sets value correctly", () => {
  render(
    <SelectField
      name="test-field"
      label="Test Field"
      options={options}
      value={options[0].value}
    />,
  );

  const select = screen.getByRole("combobox");

  expect(select).toBeInTheDocument();
  expect((select as HTMLSelectElement).value).toBe(options[0].value);
});

test("Calls onChange callback", () => {
  const handleChange = jest.fn();

  render(
    <SelectField
      name="test-field"
      label="Test Field"
      options={options}
      onChange={handleChange}
    />,
  );

  const input = screen.getByRole("combobox");

  fireEvent.change(input, { currentTarget: { value: options[0].value } });

  expect(handleChange).toHaveBeenCalled();
});
