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
  handleChange: (fieldName, value) => {},
};

const Template = (args: CustomerInfoFormProps) => (
  <CustomerInfoForm {...args} />
);

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
