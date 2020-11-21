import { h, JSX } from "preact";
import "./CalendarEventListContent.scss";
import { ICalendarEventContent } from "../../typings/Calendar";

export const CalendarEventListContent = ({ event: { _def, url } }: ICalendarEventContent): JSX.Element => {
  const { extendedProps: e } = _def;

  return (
    <a href={url} className="Calendar-Event-Link">
      <div className="Calendar-EventList-Details">
        <div className="FeaturedImage">
          <img src={e.imageUrl as string} alt="Event featured image" />
        </div>
        <div className="EventDescription">
          <div>{_def.title}</div>
          <div>
            <span>{e.paymentType}</span>
            {e.price[1] > 0 && <span>{" | "}</span>}
            {e.price[1] > 0 && <span>{e.price[0]}</span>}
          </div>
        </div>
      </div>
    </a>
  );
};