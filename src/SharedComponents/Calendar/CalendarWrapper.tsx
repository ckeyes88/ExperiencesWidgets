import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import listPlugin from "@fullcalendar/list";
import { AssetDBO } from "@helpfulhuman/expapp-shared-libs";
import { Component, ComponentClass, h, JSX } from "preact";
import { CalendarEventClick, DateClickEvent } from "../../typings/Calendar";

type CalendarViewType = {
  [key: string]: string;
}

export const calendarViewType: CalendarViewType = {
  dayGrid: "dayGridMonth",
  list: "listWeek",
};

export interface ICalendarProps {
  events: FullCalendarEvent[];
  view: string;
  eventContent(event: CalendarEvent): JSX.Element;
  forwardRef: any;
  dayMaxEventRows?: number;
  eventClick(e: CalendarEventClick): void;
  dateClick?(e: DateClickEvent): void;
  moreLinkClick?(e: any): void;
  titleFormat?: {
    month?: string; // "long" | "short"
    year?: string; // "numeric"
    day?: string; // "numeric"
    weekday?: string; // "long" | "short"
  };
  noEventsContent: JSX.Element;
  customButtons?: any;
  headerToolbar?: any;
};

export type CalendarEvent = {
  event: any; // needed for CalendarEventContent compatibility
  id: string;
  start: Date;
  end: Date;
  title: string;
  url?: string;
  customUrl?: string;
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
    const {
      view, 
      events, 
      eventContent, 
      forwardRef, 
      dateClick, 
      titleFormat, 
      noEventsContent, 
      dayMaxEventRows, 
      eventClick,
      moreLinkClick,
      customButtons,
      headerToolbar
    } = this.props;

    const FullCalendarCast = FullCalendar as unknown;
    const FullCalendarAsComponent = FullCalendarCast as ComponentClass<any>;

    return (
      <FullCalendarAsComponent
        plugins={[dayGridPlugin, listPlugin, interactionPlugin]}
        initialView={view}
        events={events}
        customButtons={customButtons}
        headerToolbar={headerToolbar}
        eventContent={eventContent}
        dateClick={dateClick}
        eventClick={eventClick}
        titleFormat={titleFormat}
        dayMaxEventRows={dayMaxEventRows}
        ref={forwardRef}
        noEventsContent={noEventsContent}
        moreLinkClick={moreLinkClick}
      />
    );
  }
};