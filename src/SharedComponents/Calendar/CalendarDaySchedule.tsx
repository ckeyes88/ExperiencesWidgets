import { Component, h } from "preact";
import { CalendarEvent } from "./CalendarWrapper";
import "./CalendarDaySchedule.scss";
import CloseIcon from "../Icons/CloseIcon";

interface ICalendarDayScheduleProps {
  open: boolean;
  handleClose(isOpen: boolean): void;
  title: string;
  events: CalendarEvent[];
}

export class CalendarDaySchedule extends Component<ICalendarDayScheduleProps, any> {
  handleClose = () => this.props.handleClose(false);

  render() {
    const { title, open, events } = this.props;

    if (!open) { return null; }

    return (
      <dialog open={open} className="calendar-day-schedule">
        <div className="calendar-day-schedule-header">
          <div>{title}</div>
          <div>
            <button onClick={this.handleClose}>
              <CloseIcon />
            </button>
          </div>
        </div>
        <div className="calendar-day-schedule-body">
          {events.map(e => (
            <div key={e.id}>{e.price}</div>
          ))}
        </div>
      </dialog>
    );
  }
}