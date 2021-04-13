import { FormFieldType } from "../../typings/Event";
import { FormFieldValueInput } from "../../typings/FormFieldValueInput";

export type CustomFieldType = FormFieldValueInput & {
  isRequired: boolean;
  type: FormFieldType;
  placeholder?: string;
  defaultValue?: string;
  options?: string[];
};

export type CustomFormValue = {
  name: string;
  fields: CustomFieldType[];
};
