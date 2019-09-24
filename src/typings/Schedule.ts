export type Schedule = {
  startsAt: Date;
  timezone: string;
  endsAt?: Date;
  monthsOfYear?: number[];
  weeksOfMonth?: number[];
  daysOfWeek?: number[];
  startTimes: number[];
  duration: number;
  units: number;
};