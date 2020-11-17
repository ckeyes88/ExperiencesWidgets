import { Component, h } from "preact";
import { CalendarEvent } from "./CalendarWrapper";
import "./CalendarDaySchedule.scss";
import CloseIcon from "../Icons/CloseIcon";
import { format } from "date-fns";

interface ICalendarDayScheduleProps {
  open: boolean;
  handleClose(): void;
  title: string;
  events: CalendarEvent[];
}

export class CalendarDaySchedule extends Component<ICalendarDayScheduleProps, any> {
  handleClose = () => this.props.handleClose();

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
            <div key={e.id} className="calendar-day-event">
              <div className="event-time">{format(e.start, "h:mmaaaaa")}</div>
              <div className="featured-image">
                <img src={e.imageUrl as string} alt="Event featured image" />
              </div>
              <div className="event-description">
                <div>{e.title}</div>
                <div>
                  <span>{e.paymentType}</span>
                  {e.price[1] > 0 && <span>{" | "}</span>}
                  {e.price[1] > 0 && <span>{e.price[0]}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </dialog>
    );
  }
}