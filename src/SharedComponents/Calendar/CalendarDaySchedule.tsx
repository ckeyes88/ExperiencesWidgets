import { Component, createRef, h } from "preact";
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
  dialogRef = createRef();
  handleClose = () => this.props.handleClose();
  handleClickOutside = (event: Event) => {
    if (this.dialogRef && this.dialogRef.current && !this.dialogRef.current.contains(event.target)) {
      this.handleClose();
    }
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  render() {
    const { title, open, events } = this.props;

    if (!open) { return null; }

    return (
      <dialog ref={this.dialogRef} open={open} className="calendar-day-schedule">
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
            <a key={e.id} href={e.url}>
              <div className="calendar-day-event">
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
            </a>
          ))}
        </div>
      </dialog>
    );
  }
}