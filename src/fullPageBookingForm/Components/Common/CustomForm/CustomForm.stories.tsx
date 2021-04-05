/** @jsx h */
import { h } from "preact";
import { FormFieldType } from "../../../../typings/Event";
import { CustomFieldType } from "../../../Typings/CustomForm";
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

export const defaultFields: CustomFieldType[] = [
  {
    label: "First",
    isRequired: true,
    type: FormFieldType.Text,
  },
  {
    label: "Last",
    isRequired: true,
    type: FormFieldType.Text,
  },
  {
    label: "Snack Preference",
    isRequired: false,
    type: FormFieldType.Text,
  },
  {
    label: "Shirt Size?",
    isRequired: true,
    type: FormFieldType.Select,
    options: ["XS", "S"],
  },
];

export const defaultPerOrderFormProps: PerOrderTypeProps = {
  formValues: [
    {
      fields: defaultFields,
      name: "Default Form",
    },
  ],
  formTitle: "Title of Form",
  formDescription: "Description of form",
};

export const defaultPerAttendeeFormProps: PerAttendeeTypeProps = {
  formValues: [
    {
      fields: defaultFields,
      name: "Per Attendee Form",
    },
  ],
  removeVariantModal: {
    isOpen: false,
    removeVariant: () => {},
    setIsRemoveVariantModalOpen: () => {},
  },
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
