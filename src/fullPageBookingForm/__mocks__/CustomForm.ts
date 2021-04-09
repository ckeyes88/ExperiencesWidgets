import { FormFieldType } from "../../typings/Event";
import {
  PerOrderTypeProps,
  PerAttendeeTypeProps,
} from "../Components/Common/CustomForm";
import { CustomFieldType } from "../Typings/CustomForm";

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
    variantToRemove: "",
    isOpen: false,
    removeVariant: () => {},
    setIsRemoveVariantModalOpen: () => {},
  },
};
