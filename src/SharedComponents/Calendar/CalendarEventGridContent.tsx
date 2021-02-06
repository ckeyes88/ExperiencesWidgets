import { h, JSX } from "preact";
import { format } from "date-fns";
import "./CalendarEventGridContent.scss";
import { ICalendarEventContent } from "../../typings/Calendar";

export const CalendarEventGridContent = ({ event: { _def, start } }: ICalendarEventContent): JSX.Element => {
  return (
    <div className="Calendar-EventGrid-Details">
      <div className="EventDescription">
        <span>{format(start, "h:mmaaaaa")}</span>
        <span className={`${_def.extendedProps.pastEvent ? "PastEvent" : ""}`}>
          <strong>
            {_def.title}
          </strong>
        </span>
      </div>
    </div>
  );
};