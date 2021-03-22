/** @jsx h */
import { h, FunctionComponent } from "preact";
import { FormFieldDBO } from "../../../../types";
import { CustomForm, CustomFormProps } from "./CustomForm";

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

const defaultArgs: CustomFormProps = {
  fields: defaultFields,
  handleChange: () => {},
  labels: {
    optionalFieldLabel: "Optional",
  },
};

const Template = (args: CustomFormProps) => <CustomForm {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  ...defaultArgs,
};
