/** @jsx h */
import { h } from "preact";
import { CustomerInfoForm, CustomerInfoFormProps } from "./CustomerInfoForm";
import { CustomerInputData } from "../../../../typings/CustomerInput";

export default {
  title: "Full Page Booking Form/Common/Customer Info Form",
  component: CustomerInfoForm,
};

const defaultCustomerData: CustomerInputData = {
  firstName: "Jacob",
  lastName: "Shannon",
  email: "jacob@test.com",
};
const defaultArgs: CustomerInfoFormProps = {
  labels: {
    firstNameLabel: "First",
    emailLabel: "Email",
    lastNameLabel: "Last",
    optionalFieldLabel: "Optional",
  },
  customerData: defaultCustomerData,

  handleChange: (fieldName, value) => {},
};

const Template = (args: CustomerInfoFormProps) => (
  <CustomerInfoForm {...args} />
);

export const BasicForm = Template.bind({});
BasicForm.args = {
  ...defaultArgs,
};

export const DisabledForm = Template.bind({});
DisabledForm.args = {
  ...defaultArgs,
  isCustomerInfoFormDisabled: true,
};
