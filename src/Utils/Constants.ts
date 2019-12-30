/**
 * The days of the week.
 */
export enum Weekdays {
    Sunday,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
}

/**
 * The months names
 */
export enum Months {
    January,
    February,
    March,
    April,
    May,
    June,
    July,
    August,
    September,
    October,
    November,
    December,
}


/**
 * The number of minutes in a day.
 */
export const MINUTES_IN_DAY = (24 * 60 * 60 * 1000);

/**
 * Finds # of days difference between two provided times.
 * 
 * @param start Start date object
 * @param end End date object
 * @returns Number of days difference between time A & B
 */
export function diffDays(start: Date, end: Date): number {
    const startZero: Date = new Date(start);
    const endZero: Date = new Date(end);
    startZero.setHours(0,0,0,0);
    endZero.setHours(0,0,0,0);
    return (endZero.getTime() - startZero.getTime()) / MINUTES_IN_DAY;
}
