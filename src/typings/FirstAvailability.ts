import { Availability } from "./Availability";

export type FirstAvailability = {
  [year: string]: {
    [monthsOfYear: string]: {
      [weekOfMonth: string]: {
        [dayOfWeek: string]: Availability[];
      };
    };
  };
};