/** @jsx h */
import { h } from "preact";
import { Form, FormProps } from "./Form";
import { object } from "@storybook/addon-knobs";

export default {
  title: "Full Page Booking Form/Common/Form",
  component: Form,
};

const defaultArgs: FormProps = {
  title: "Customer Info",
  fields: object("List of input fields", [
    {
      label: "First",
      type: "Text",
      value: "",
      required: true,
    },
    {
      label: "Last",
      type: "Text",
      value: "",
    },
    {
      label: "Email",
      type: "Email",
      value: "",
    },
  ]),
  isSubmitDisabled: false,
  showSubmitButton: true,
  onSubmit: () => {},
};

const Template = (args: FormProps) => <Form {...args} />;

export const BasicForm = Template.bind({});
BasicForm.args = {
  ...defaultArgs,
};

export const BasicFormNoTitle = Template.bind({});
BasicFormNoTitle.args = {
  ...defaultArgs,
  title: undefined,
};

export const BasicCustomerInfo = Template.bind({});
BasicCustomerInfo.args = {
  ...defaultArgs,
};

export const DisabledForm = Template.bind({});
DisabledForm.args = {
  ...defaultArgs,
  disabled: true,
};
