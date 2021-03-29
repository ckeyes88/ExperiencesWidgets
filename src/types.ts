export type FormFieldType = "Text" | "Select" | "Email" | "Phone";

export type FormFieldDBO = {
  type: FormFieldType;
  label: string;
  required: boolean;
  placeholder?: string;
  options?: string[];
  defaultValue?: string;
  value?: string;
};

export enum OrderDetailsFormType {
  None = "None",
  PerOrder = "PerOrder",
  PerAttendee = "PerAttendee",
}

// export type VariantDetail = {
//   id: number;
//   name: string;
//   title: string;
//   price: number;
// };
