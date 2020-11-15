import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import { Component, ComponentClass, h } from "preact";

export interface ICalendarProps {
  events: CalendarEvent[];
  view: string;
  forwardRef: any;
}

export type CalendarEvent = {
  id: string;
  start: Date;
  end: Date;
  title: string;
  url: string;
};

export class Calendar extends Component<ICalendarProps, any>{
  render() {
    const { view, events, forwardRef } = this.props;
    const FullCalendarCast = FullCalendar as unknown;
    const FullCalendarAsComponent = FullCalendarCast as ComponentClass<any>;

    return (
      <FullCalendarAsComponent plugins={[dayGridPlugin, listPlugin]} initialView={view} events={events} ref={forwardRef} />
    );
  }
}