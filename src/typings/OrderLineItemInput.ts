import { FormFieldValueInput } from "./FormFieldValueInput";
import { AttendeeInputData } from "./AttendeeInput";

export type OrderLineItemInputData = {
  eventId?: string;
  eventVariantName: string;
  productId?: number;
  productVariantId?: number;
  timeslotId?: string;
  startsAt: Date;
  endsAt: Date;
  timezone: string;
  quantity: number;
  customOrderDetailsValues: FormFieldValueInput[];
  attendee?: AttendeeInputData;
};