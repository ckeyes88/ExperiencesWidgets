import { Component, h } from "preact";
import { CalendarEvent } from "./CalendarWrapper";

interface ICalendarDayScheduleProps {
  open: boolean;
  title: string;
  events: CalendarEvent[];
}

export class CalendarDaySchedule extends Component<ICalendarDayScheduleProps, any> {
  render() {
    const { title, open, events } = this.props;

    if (!open) { return null; }

    return (
      <dialog open={open}>
        <div>{title}</div>
      </dialog>
    );
  }
}