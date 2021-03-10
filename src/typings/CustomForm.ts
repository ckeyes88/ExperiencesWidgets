export type FormField = {
  type: "Text" | "Select" | "Email" | "Phone";
  label: string;
  required: boolean;
  placeholder?: string;
  options?: string[];
  defaultValue?: string;
  value?: string;
};

export type FormFieldValue = {
  label: string;
  value: string;
};

export enum OrderDetailsFormType {
  None = "None",
  PerOrder = "PerOrder",
  PerAttendee = "PerAttendee",
}

export type CustomForm = {
  fields: FormField[];
  formDescription: string;
  formTitle: string;
  isPerAttendee: boolean;
  formType: OrderDetailsFormType;
};
