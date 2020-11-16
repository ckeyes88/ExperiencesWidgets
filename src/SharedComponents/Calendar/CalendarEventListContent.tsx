import { h, JSX } from "preact";
import { AssetDBO } from "@helpfulhuman/expapp-shared-libs";
import "./CalendarEventListContent.scss";

interface ICalendarEventContentProps {
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

export const CalendarEventListContent = ({ event: { _def } }: ICalendarEventContentProps): JSX.Element => {
  const { extendedProps: e } = _def;

  return (
    <div className="calendar-event-list-details">
      <div className="featured-image">
        <img src={e.imageUrl as string} alt="Event featured image" />
      </div>
      <div className="event-description">
        <div>{_def.title}</div>
        <div>
          <span>{e.paymentType}</span>
          <span>{" | "}</span>
          <span>{e.price}</span>
        </div>
      </div>
    </div>
  );
};