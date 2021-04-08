/** @jsx h */
import { h } from "preact";
import { FormField, FormFieldProps } from "./FormField";

export default {
  title: "Full Page Booking Form/Common/Form Field",
  component: FormField,
};

const defaultArgs: FormFieldProps = {
  type: "Text",
  label: "First",
  value: "Test",
  onFieldChange: (fieldName, fieldValue) => {},
};

const Template = (args: FormFieldProps) => <FormField {...args} />;

export const BasicFormField = Template.bind({});
BasicFormField.args = {
  ...defaultArgs,
};

export const BasicSelectField = Template.bind({});
BasicSelectField.args = {
  ...defaultArgs,
  type: {
    options: ["This one A", "this one B"],
  },
};

export const OptionalFormField = Template.bind({});
OptionalFormField.args = {
  ...defaultArgs,
  optionalLabel: "Optional",
};

export const OptionalSelectField = Template.bind({});
OptionalSelectField.args = {
  ...defaultArgs,
  type: {
    options: ["This one A", "this one B"],
  },
  optionalLabel: "Optional",
};
