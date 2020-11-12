import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from '@fullcalendar/list';
import { Component, h, ComponentClass } from "preact";
import "./CalendarMain.scss";

export class CalendarContainer extends Component {
  render() {
    const FullCalendarCast = FullCalendar as unknown;
    const FullCalendarAsComponent = FullCalendarCast as ComponentClass<any>;

    return (
      <div className="aggregate-calendar-main">
        <FullCalendarAsComponent
          plugins={[ dayGridPlugin, listPlugin ]}
          initialView="dayGridMonth"
        />
      </div>
    );
  }
}