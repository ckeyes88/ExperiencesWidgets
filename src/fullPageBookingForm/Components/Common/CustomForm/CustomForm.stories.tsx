/** @jsx h */
import { h } from "preact";
import {
  defaultPerOrderFormProps,
  defaultPerAttendeeFormProps,
} from "../../../__mocks__/CustomForm";
import { CustomForm, CustomFormProps } from "./CustomForm";

export default {
  title: "Full Page Booking Form/Common/Custom Form",
  component: CustomForm,
  argTypes: {},
};

const defaultArgs: CustomFormProps = {
  formType: defaultPerOrderFormProps,
  handleChange: () => {},
  labels: {
    optionalFieldLabel: "Optional",
  },
};

const Template = (args: CustomFormProps) => <CustomForm {...args} />;

export const PerOrderForm = Template.bind({});
PerOrderForm.args = {
  ...defaultArgs,
};

export const PerAttendeeForm = Template.bind({});
PerAttendeeForm.args = {
  ...defaultArgs,
  formType: defaultPerAttendeeFormProps,
};
