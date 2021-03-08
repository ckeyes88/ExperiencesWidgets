/** @jsx h */
import { h } from "preact";
import { SelectField, SelectFieldProps } from "./SelectField";

export default {
  title: "Full Page Booking Form/Common/Inputs/Select Field",
  component: SelectField,
};

const Template = (args: SelectFieldProps) => <SelectField {...args} />;

const defaultArgs: SelectFieldProps = {
  name: "test-input",
  label: "Option",
  placeholder: "Select an option",
  required: true,
  disabled: false,
  fullWidth: false,
  value: "",
  options: [
    {
      value: "option_a",
      text: "Option A",
    },
    {
      value: "option_b",
      text: "Option B",
    },
  ],
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

export const Optional = Template.bind({});
Optional.args = {
  ...defaultArgs,
  required: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...defaultArgs,
  disabled: true,
};

export const FullWidth = Template.bind({});
FullWidth.storyName = "Full Width";
FullWidth.args = {
  ...defaultArgs,
  fullWidth: true,
};
