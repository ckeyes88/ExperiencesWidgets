import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import { Component, ComponentClass, h, JSX } from "preact";
import { AssetDBO } from "@helpfulhuman/expapp-shared-libs";

export interface ICalendarProps {
  events: CalendarEvent[];
  view: string;
  eventContent(event: CalendarEvent): JSX.Element;
  forwardRef: any;
}

export type CalendarEvent = {
  id: string;
  start: Date;
  end?: Date; // currently not being used, but might be useful
  title: string;
  url: string;
  imageUrl?: string | AssetDBO;
  paymentType?: string;
  price?: number;
  editable: boolean;
  startEditable: boolean;
  durationEditable: boolean;
  resourceEditable: boolean;
};

export class Calendar extends Component<ICalendarProps, any> {
  render() {
    const {view, events, eventContent, forwardRef} = this.props;
    const FullCalendarCast = FullCalendar as unknown;
    const FullCalendarAsComponent = FullCalendarCast as ComponentClass<any>;

    return (
      <FullCalendarAsComponent
        plugins={[dayGridPlugin, listPlugin]}
        initialView={view}
        events={events}
        eventContent={eventContent}
        ref={forwardRef}
      />
    );
  }
}