import { getDaysInMonth } from "date-fns";

export type DayTemplate = {
  dayName: string;
  style: {
    msGridColumn: number;
    gridColumnStart: string;
  };
};

export type MonthTemplate = {
  date: Date;
  style: {
    msGridRow: number;
    msGridColumn: number;
    gridRowStart: number;
    gridColumnStart: string;
  };
};

let monthNameCache: { [locale: string]: string[] } = {};

let dayNameCache: { [locale: string]: DayTemplate[] } = {};

// Constructs a className from a set of prop keys.
export const getClassName = (props: { [key: string]: any }) => {
  return Object.keys(props).filter((key) => props[key]).join(" ");
};

// Uses native JS dates to get the names of months of the year in a given locale.
export const monthsOfYear = (locale: string = "en-US"): string[] => {
  // Cache result in window.months.
  if (!Array.isArray(monthNameCache[locale])) {
    monthNameCache[locale] = [...Array(12)].map((_, i) => {
      // Get a date object set to the i-th month.
      const baseDate = new Date(2017, i, 1);

      // Get full name of this month.
      return baseDate.toLocaleDateString(locale, { month: "long" });
    });
  }

  return monthNameCache[locale];
};

// Returns number of days in a given month.
export const daysInMonth = (month: number, year: number): number => {
  return getDaysInMonth(new Date(year, month - 1));
};

// Returns an array of days of the week for a header (and Grid styles for IE compat).
export const getMonthHeaderTemplate = (locale: string = "en-US"): DayTemplate[] => {
  // Cache result in window.days.
  if (!Array.isArray(dayNameCache[locale])) {
    dayNameCache[locale] = [...Array(7)].map((_, i) => {
      // Get a date object set to i+[random sunday offset]th day.
      const baseDate = new Date(Date.UTC(2017, 0, i + 2));

      // Get full name of this day.
      const dayName = baseDate.toLocaleDateString(locale, { weekday: "long" });

      return {
        dayName,
        style: {
          msGridColumn: i + 1,
          gridColumnStart: `${i + 1}`,
        },
      };
    });
  }
  return dayNameCache[locale];
};

// Returns an array of days of the month (and Grid styles for IE compat).
export const getMonthTemplate = (month: number, year: number): MonthTemplate[] => {
  // Number of days in month.
  const numDaysInMonth = daysInMonth(month, year);
  // Days between Sunday and start of month.
  const offset = (new Date(year, month - 1, 1)).getDay() + 1;
  // Fill in array with days of month.
  let monthTemplates: MonthTemplate[] = [];
  for (let i = 0; i < numDaysInMonth; i++) {
    monthTemplates.push({
      date: new Date(year, month - 1, i + 1),
      style: {
        msGridRow: Math.ceil((offset + i) / 7),
        msGridColumn: (((offset - 1) + i) % 7) + 1,
        gridRowStart: Math.ceil((offset + i) / 7),
        gridColumnStart: `${(((offset - 1) + i) % 7) + 1}`,
      },
    });
  }
  return monthTemplates;
};