export type FormFieldDBO = {
  type: "Text" | "Select" | "Email" | "Phone";
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

export interface EventHandler extends Event {
  target: EventTarget & {
    value: any;
    id: any;
  };
}