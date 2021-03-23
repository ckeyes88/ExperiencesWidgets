import moment from "moment-timezone";

type CalendarMatrixItem = { day: number | null; date: Date | null };

export const getCalendarMatrix = ({
  month,
  year,
}: {
  month: number;
  year: number;
}) => {
  const date = moment().set("month", month).set("year", year).toDate();
  const dayAndWeekdayMapping = getDayAndWeekdayMapping(date);
  const weekdayOfTheStartOfMonth = moment(date).startOf("month").day();

  let currentWeek = 0;

  const matrix: CalendarMatrixItem[][] = [];

  dayAndWeekdayMapping.forEach((mapping) => {
    const { day, weekday } = mapping;

    if (day === 1) {
      matrix[currentWeek] = Array.from<CalendarMatrixItem>({
        length: weekdayOfTheStartOfMonth,
      }).fill({ day: null, date: null });
    }

    matrix[currentWeek].push({
      day,
      date: moment(date).set("date", day).toDate(),
    });

    if (weekday !== 6) {
      return matrix;
    }

    currentWeek += 1;

    matrix.push([]);

    return matrix;
  });

  return matrix;
};

const getDayAndWeekdayMapping = (date: Date) =>
  Array.from({
    length: moment(date).daysInMonth(),
  }).map((_, i) => {
    const startOfMonth = moment(date).startOf("month");
    const currentDate = startOfMonth.clone().add(i, "day");

    return {
      day: Number(currentDate.format("D")),
      weekday: currentDate.weekday(),
    };
  });
