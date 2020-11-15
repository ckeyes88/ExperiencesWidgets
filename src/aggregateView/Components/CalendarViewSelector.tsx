import { CalendarMajor, ListMajor } from "@shopify/polaris-icons";
import { Component, h } from "preact";
import "./CalendarViewSelector.scss";

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
          className={`month-view ${view === "dayGridMonth" ? "selected" : ""}`}
          onClick={() => selectView("dayGridMonth")}
        >
          <div className="calendar-icon">
            <CalendarMajor />
          </div>
          <div>Month</div>
        </div>
        <div
          className={`list-view ${view === "listWeek" ? "selected" : ""}`}
          onClick={() => selectView("listWeek")}
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