/** @jsx h */
import { h } from "preact";
import { CustomerInfoForm, CustomerInfoFormProps } from "./CustomerInfoForm";
import { object } from "@storybook/addon-knobs";

export default {
  title: "Full Page Booking Form/Common/Customer Info Form",
  component: CustomerInfoForm,
};

const defaultArgs: CustomerInfoFormProps = {
  labels: {
    firstNameLabel: "First",
    emailLabel: "Email",
    lastNameLabel: "Last",
    optionalFieldLabel: "Optional",
  },
  firstNameValue: "Jacob",
  lastNameValue: "Shannon",
  emailValue: "jacob@test.com",
  handleChange: (fieldName, value) => {},
};

const Template = (args: CustomerInfoFormProps) => (
  <CustomerInfoForm {...args} />
);

export const BasicForm = Template.bind({});
BasicForm.args = {
  ...defaultArgs,
};
