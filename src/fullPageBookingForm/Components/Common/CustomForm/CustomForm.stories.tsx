/** @jsx h */
import { h } from "preact";
import { FormFieldDBO } from "../../../../types";
import {
  CustomForm,
  CustomFormProps,
  PerAttendeeTypeProps,
  PerOrderTypeProps,
} from "./CustomForm";

export default {
  title: "Full Page Booking Form/Common/Custom Form",
  component: CustomForm,
  argTypes: {},
};

const defaultFields: FormFieldDBO[] = [
  {
    label: "First",
    required: true,
    type: "Text",
  },
  {
    label: "Last",
    required: true,
    type: "Text",
  },
  {
    label: "Snack Preference",
    required: false,
    type: "Text",
  },
  {
    label: "Shirt Size?",
    required: true,
    type: "Select",
    options: ["XS", "S"],
  },
];

const defaultPerOrderFormProps: PerOrderTypeProps = {
  fields: defaultFields,
};

const defaultPerAttendeeFormProps: PerAttendeeTypeProps = {
  fields: defaultFields,
  fieldsPerVariant: 2,
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
