import { h, JSX } from "preact";
import { format } from "date-fns";
import "./CalendarEventGridContent.scss";
import { ICalendarEventContent } from "../../typings/Calendar";

export const CalendarEventGridContent = ({ event: { _def, start } }: ICalendarEventContent): JSX.Element => {
  return (
    <div className="calendar-event-grid-details">
      <div className="event-description">
        <span>{format(start, "Kaaaaa")}</span>
        <span>
          <strong>
            {_def.title}
          </strong>
        </span>
      </div>
    </div>
  );
};