import "./CalendarNoEventsMessage.scss";
import { h, Component } from "preact";

interface ICalendarNoEventsMessageProps {
  message?: string;
  nextAvailableLabel?: string;
  onNextAvailableClick(): void;
}

export class CalendarNoEventsMessage extends Component<ICalendarNoEventsMessageProps> {
  render() {
    const { message, nextAvailableLabel, onNextAvailableClick } = this.props;

    return (
      <div className="Calendar-NoEvents">
        <div>{message || "No events to display"}</div>
        <div>
          <button className="CalendarAggregateView-GoToNextAvailableBtn" onClick={onNextAvailableClick}>
            {nextAvailableLabel || "Go to next available"}
          </button>
        </div>
      </div>
    );
  }
}