import { h, JSX } from "preact";
import { CalendarEvent } from "./CalendarWrapper";
import { AssetDBO } from "@helpfulhuman/expapp-shared-libs";

interface ICalendarEventExtended {
  extendedProps: {
    imageUrl?: string | AssetDBO;
    paymentType?: string;
    price?: string;
  };
}

interface ICalendarEventContentProps {
  event: CalendarEvent & ICalendarEventExtended;
}

export const CalendarEventContent = ({ event }: ICalendarEventContentProps): JSX.Element => {
  return (
    <span>
      <span>{event.title}</span>
    </span>
  );
};