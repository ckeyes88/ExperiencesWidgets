import { Component, createRef, h } from "preact";
import { CalendarEvent } from "./CalendarWrapper";
import "./CalendarDaySchedule.scss";
import { CloseIcon } from "../Icons/CloseIcon";
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

    // making sure popup is always roughly in the center of the calendar vew
    const hostEl = document.getElementById("AggregateCalendar-Main");
    const baseOffset = hostEl ? hostEl.offsetTop + (hostEl.clientHeight / 2) : 0;
    let listLengthCompensation = 0;
    if (events.length > 1 && events.length < 6) {
      listLengthCompensation = events.length * 35;
    } else if (events.length > 1) {
      listLengthCompensation = 200;
    }

    const style = { 
      top: `${baseOffset - listLengthCompensation}px`,
    };

    if (!open) { return null; }

    return (
      <dialog ref={this.dialogRef} open={open} className="Calendar-DaySchedule" style={style}>
        <div className="Calendar-DaySchedule-Header">
          <div>{title}</div>
          <div>
            <button onClick={this.handleClose}>
              <CloseIcon />
            </button>
          </div>
        </div>
        <div className={`Calendar-DaySchedule-Body ${events && events.length > 4 ? "FadeBottom" : ""}`}>
          {events
            .sort((a, b) => a.start.getTime() - b.start.getTime())
            .map(e => (
            <a key={e.id} href={e.customUrl} className={`${e.pastEvent ? "PastEvent" : ""}`}>
              <div className="Calendar-Day-Event">
                <div className="EventTime">{format(e.start, "h:mmaaaaa")}</div>
                <div className="FeaturedImage">
                  <img src={e.imageUrl as string} alt="Event featured image" />
                </div>
                <div className={`EventDescription ${e.title.length > 50 ? "SmallerFont" : ""}`}>
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