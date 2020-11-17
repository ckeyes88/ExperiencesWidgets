import { CalendarMajor, ListMajor } from "@shopify/polaris-icons";
import { Component, h } from "preact";
import "./CalendarViewSelector.scss";
import { calendarViewType } from "./CalendarWrapper";

interface ICalendarViewSelectorProps {
  view: string;
  selectView(view: string): void;
}

export class CalendarViewSelector extends Component<ICalendarViewSelectorProps> {
  render() {
    const {selectView, view} = this.props;

    return (
      <div className="calendar-view-selector">
        <div
          className={`month-view ${view === calendarViewType.dayGrid ? "selected" : ""}`}
          onClick={() => selectView(calendarViewType.dayGrid)}
        >
          <div className="calendar-icon">
            <CalendarMajor />
          </div>
          <div>Month</div>
        </div>
        <div
          className={`list-view ${view === calendarViewType.list ? "selected" : ""}`}
          onClick={() => selectView(calendarViewType.list)}
        >
          <div className="list-icon">
            <ListMajor />
          </div>
          <div>List</div>
        </div>
      </div>
    );
  }
}