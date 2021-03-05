/** @jsx h */
import { h } from "preact";
import { TextField, TextFieldProps } from "./TextField";

export default {
  title: "Full Page Booking Form/Common/Inputs/Text Field",
  component: TextField,
};

const Template = (args: TextFieldProps) => <TextField {...args} />;

const defaultArgs: TextFieldProps = {
  name: "test-input",
  label: "First Name",
  placeholder: "Enter your first name",
  required: true,
  textCentered: false,
  disabled: false,
  value: "",
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
