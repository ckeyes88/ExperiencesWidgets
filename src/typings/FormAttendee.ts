import { FormFieldValue } from "./CustomForm";

export enum PaymentType {
  Free = "free",
  Reservation = "reservation",
  Prepay = "prepay",
}

export type FormAttendee = {
  fields: FormFieldValue[];
  variantId: number;
  email: string;
  firstName: string;
  lastName: string;
};