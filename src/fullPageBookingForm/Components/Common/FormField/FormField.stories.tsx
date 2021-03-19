/** @jsx h */
import { h } from "preact";
import { FormField, FormFieldProps } from "./FormField";
import { object } from "@storybook/addon-knobs";

export default {
  title: "Full Page Booking Form/Common/Form Field",
  component: FormField,
};

const defaultArgs: FormFieldProps = {};

const Template = (args: FormFieldProps) => <FormField {...args} />;

export const BasicFormField = Template.bind({});
BasicFormField.args = {
  ...defaultArgs,
};
