import { h, JSX } from "preact";
import { format } from "date-fns";
import { AssetDBO } from "@helpfulhuman/expapp-shared-libs";
import "./CalendarEventGridContent.scss";

interface ICalendarEventGridContent {
  event: {
    start: Date;
    _def: {
      extendedProps: {
        imageUrl?: string | AssetDBO;
        paymentType?: string;
        price?: string;
      };
      title: string;
    };
  };
}

export const CalendarEventGridContent = ({ event: { _def, start } }: ICalendarEventGridContent): JSX.Element => {
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