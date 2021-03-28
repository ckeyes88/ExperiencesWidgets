/** @jsx h */
import { h, FunctionComponent } from "preact";
import { useState, useMemo } from "preact/hooks";
import moment from "moment-timezone";
import { Button } from "../Button";
import { TextStyle } from "../TextStyle";
import { LeftIcon } from "./LeftIcon";
import { RightIcon } from "./RightIcon";
import { getCalendarMatrix } from "./getCalendarMatrix";
import "./Calendar.scss";

export type CalendarProps = {
  month?: number;
  year?: number;
  date: Date;
};

const today = new Date();

export const Calendar: FunctionComponent<CalendarProps> = ({
  month: initialMonth,
  year: initialYear,
  date: initialDate,
}) => {
  const [currentMonth, setCurrentMonth] = useState(
    initialMonth || moment(initialDate).month(),
  );
  const [currentYear, setCurrentYear] = useState(
    initialYear || moment(initialDate).year(),
  );
  const [currentDate, setCurrentDate] = useState(initialDate);

  const handlePreviousMonthClick = () => {
    setCurrentMonth((prev) => {
      if (prev === 0) {
        return 11;
      }

      return prev - 1;
    });

    if (currentMonth === 0) {
      setCurrentYear((prev) => prev - 1);
    }
  };

  const handleNextMonthClick = () => {
    setCurrentMonth((prev) => {
      if (prev === 11) {
        return 0;
      }

      return prev + 1;
    });

    if (currentMonth === 11) {
      setCurrentYear((prev) => prev + 1);
    }
  };

  const handleTodayClick = () => {
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
    setCurrentDate(today);
  };

  const renderWeekdays = () =>
    moment.weekdaysMin().map((weekday) => (
      <div
        key={weekday}
        className="calendar__matrix__day calendar__matrix__day--header"
      >
        <span>{weekday.charAt(0)}</span>
      </div>
    ));

  const calendarMatrix = useMemo(
    () => getCalendarMatrix({ month: currentMonth, year: currentYear }),
    [currentMonth, currentYear],
  );

  const renderDays = () =>
    useMemo(
      () =>
        calendarMatrix.map((weekdays) =>
          weekdays.map(({ day, date }) => {
            if (day === null) {
              return <div />;
            }

            const before = moment(date).isBefore(moment(), "day");

            const handleClick = () => {
              if (!before) {
                setCurrentDate(date);
              }
            };

            const classNames = ["calendar__matrix__day"];

            const today = moment().isSame(date, "day");
            const selected = moment(currentDate).isSame(date, "day");

            classNames.push(
              `calendar__matrix__day--${
                selected
                  ? "selected"
                  : before
                  ? "disabled"
                  : today
                  ? "current"
                  : "default"
              }`,
            );

            return (
              <div key={day} className={classNames.join(" ")}>
                <span onClick={handleClick}>{day}</span>
              </div>
            );
          }),
        ),
      [currentMonth, currentDate.getTime()],
    );

  const inMonthOfToday = moment(today).month() === currentMonth;

  return (
    <div className="calendar">
      <div className="calendar__header">
        <div className="calendar__header__month">
          <TextStyle
            variant="display2"
            text={`${moment.months()[currentMonth]} ${currentYear}`}
          />
        </div>
        <div className="calendar__header__today-btn">
          <Button
            variant="text"
            color="primary"
            text="Today"
            disabled={
              moment(today).isSame(currentDate, "date") && inMonthOfToday
            }
            onClick={handleTodayClick}
          />
        </div>
        <div className="calendar__header__month-navigator">
          <button disabled={inMonthOfToday} onClick={handlePreviousMonthClick}>
            <LeftIcon />
          </button>
          <button onClick={handleNextMonthClick}>
            <RightIcon />
          </button>
        </div>
      </div>
      <div className="calendar__matrix">
        {renderWeekdays()}
        {renderDays()}
      </div>
    </div>
  );
};
