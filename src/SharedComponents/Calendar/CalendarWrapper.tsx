import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import { Component, ComponentClass, h } from "preact";

export interface ICalendarProps {
  view: string;
  forwardRef: any;
}

export class Calendar extends Component<ICalendarProps, any>{
  render() {
    const { view, forwardRef } = this.props;
    const FullCalendarCast = FullCalendar as unknown;
    const FullCalendarAsComponent = FullCalendarCast as ComponentClass<any>;

    return (
      <FullCalendarAsComponent plugins={[dayGridPlugin, listPlugin]} initialView={view} {...this.props} ref={forwardRef} />
    );
  }
}