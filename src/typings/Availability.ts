import { FormattedTimeslot } from "./FormattedTimeslot";

export type Availability = {
  productId: string;
  timeslotId?: string;
  startsAt: Date;
  endsAt: Date;
  timezone: string;
  formattedTimeslot: FormattedTimeslot;
  totalUnits: number;
  unitsLeft: number;
};