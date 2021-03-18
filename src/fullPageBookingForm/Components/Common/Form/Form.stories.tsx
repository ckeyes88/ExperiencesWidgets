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
      name: "First",
      type: "text",
      value: "",
      onChange: () => {},
    },
    {
      name: "Last",
      type: "text",
      value: "",
      onChange: () => {},
    },
    {
      name: "Email",
      type: "email",
      value: "",
      onChange: () => {},
    },
  ]),
  onSubmit: () => {},
};

const Template = (args: FormProps) => <Form {...args} />;

export const BasicCustomerInfo = Template.bind({});
BasicCustomerInfo.args = {
  ...defaultArgs,
};
