import { Availability } from "../typings/Availability";
import { FirstAvailability } from "../typings/FirstAvailability";

type Week = {
  [dayOfWeek: number]: Availability[];
};

type Month = {
  [weekOfMonth: number]: Week;
};

type Year = {
  [monthOfYear: number]: Month;
};

/** Join two arrays of objects into a list without duplicates */
export function unionDayAvailability(...lists: Availability[][]): Availability[] {
  // Create a lookup table to track unique occurrences of a timeslot
  let set: { [name: string]: Availability } = {};
  // Create a single flat array from all of the input arrays of availability
  let flatLists: Availability[] = Array.prototype.concat.apply([], lists);
  // loop through availabilities - check for startsAt and endsAt
  for (let item of flatLists) {
    if (item && item.startsAt && item.endsAt) {
      // Create a unique key for this timeslot
      const lkey = new Date(item.startsAt).getTime() + new Date(item.endsAt).getTime();
      // Add the timeslot to the set
      set[lkey] = {...item, formattedTimeslot: {...item.formattedTimeslot}};
    }
  }
  // Return an array of availabilities derived from the set object
  const output = Object.keys(set).map(k => set[k]);
  return output;
}

/** Join two week objects */
export function unionWeekAvailability(weekOne: Week, weekTwo: Week): Week {
  
  let week: Week = {};
  let keys = Object.keys(weekOne).concat(Object.keys(weekTwo));
  [...new Set(keys)].forEach(k => {
    const dayOfWeek = parseInt(k);
    let newDay = weekTwo[dayOfWeek];
    let oldDay = weekOne[dayOfWeek];
    
    if(!newDay) {
      newDay = [];
    }

    if(!oldDay) {
      oldDay = [];
    }

    let thisDay = unionDayAvailability(newDay, oldDay);
    week[dayOfWeek] = thisDay;
  });
  return week;

}

/** Join two month objects */
export function unionMonthAvailability(monthOne: Month, monthTwo: Month): Month {

  let month: Month = {};
  let keys = Object.keys(monthOne).concat(Object.keys(monthTwo));
  [...new Set(keys)].forEach(k => {
    const weekOfMonth = parseInt(k);
    let newWeek = monthTwo[weekOfMonth];
    let oldWeek = monthOne[weekOfMonth];

    if(!newWeek) {
      newWeek = {};
    }

    if(!oldWeek) {
      oldWeek = {};
    }

    let thisWeek = unionWeekAvailability(newWeek, oldWeek);
    month[weekOfMonth] = thisWeek;
  });
  return month;

}

/** Join two year objects */
export function unionYearAvailability(yearOne: Year, yearTwo: Year) {

  let year: Year = {};
  let keys = Object.keys(yearOne).concat(Object.keys(yearTwo));
  [...new Set(keys)].forEach(k => {
    const monthOfYear = parseInt(k);
    let newMonth = yearTwo[monthOfYear];
    let oldMonth = yearOne[monthOfYear];

    if(!newMonth) {
      newMonth = {};
    }

    if(!oldMonth) {
      oldMonth = {};
    }

    let thisMonth = unionMonthAvailability(newMonth, oldMonth);
    year[monthOfYear] = thisMonth;
  });
  return year;

}

/** Join two FirstAvailability objects */
export function unionAvailability(availabilityOne: FirstAvailability, availabilityTwo: FirstAvailability): FirstAvailability {

  let output: FirstAvailability = {};
  let keys = Object.keys(availabilityOne).concat(Object.keys(availabilityTwo));
  [...new Set(keys)].forEach(k => {
    let newYear = availabilityTwo[k];
    let oldYear = availabilityOne[k];
    
    if(!newYear) {
      newYear = {};
    }

    if(!oldYear) {
      oldYear = {};
    }
    
    let thisYear = unionYearAvailability(newYear, oldYear);
    output[k] = thisYear;
  });
  
  return output;

}