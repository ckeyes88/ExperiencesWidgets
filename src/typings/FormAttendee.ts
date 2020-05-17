import { FormField } from "./CustomForm";

export enum PaymentType {
  Free = "free",
  Reservation = "reservation",
  Prepay = "prepay",
}

export type FormAttendee = {
  fields: FormField[];
  variantId: number;
  email: string;
  firstName: string;
  lastName: string;
};