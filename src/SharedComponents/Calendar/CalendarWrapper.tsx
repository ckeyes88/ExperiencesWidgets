import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { Component, ComponentClass, h, JSX } from "preact";
import { AssetDBO } from "@helpfulhuman/expapp-shared-libs";
import { DateClickEvent } from "../../typings/Calendar";

export const calendarViewType = {
  dayGrid: "dayGridMonth",
  list: "listWeek",
};

export interface ICalendarProps {
  events: FullCalendarEvent[];
  view: string;
  eventContent(event: CalendarEvent): JSX.Element;
  forwardRef: any;
  dateClick?(e: DateClickEvent): void;
  titleFormat?: {
    month?: string; // "long" | "short"
    year?: string; // "numeric"
    day?: string; // "numeric"
    weekday?: string; // "long" | "short"
  };
  noEventsContent: JSX.Element;
}

export type CalendarEvent = {
  event: any; // needed for CalendarEventContent compatibility
  id: string;
  start: Date;
  end: Date;
  title: string;
  url: string;
  imageUrl?: string | AssetDBO;
  paymentType?: string;
  price: [string, number];
  editable: boolean;
  startEditable: boolean;
  durationEditable: boolean;
  resourceEditable: boolean;
};

export type FullCalendarEvent = Partial<CalendarEvent>;

// Can be reused by any component
export class Calendar extends Component<ICalendarProps, any> {
  render() {
    const {view, events, eventContent, forwardRef, dateClick, titleFormat, noEventsContent} = this.props;
    const FullCalendarCast = FullCalendar as unknown;
    const FullCalendarAsComponent = FullCalendarCast as ComponentClass<any>;

    return (
      <FullCalendarAsComponent
        plugins={[dayGridPlugin, listPlugin, interactionPlugin]}
        initialView={view}
        events={events}
        eventContent={eventContent}
        dateClick={dateClick}
        titleFormat={titleFormat}
        ref={forwardRef}
        noEventsContent={noEventsContent}
      />
    );
  }
}