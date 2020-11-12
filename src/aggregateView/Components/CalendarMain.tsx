import "./CalendarMain.scss";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from '@fullcalendar/list';
import { Component, h, ComponentClass } from "preact";
import { CalendarViewSelector } from "./CalendarViewSelector";

export class CalendarContainer extends Component {
  render() {
    const FullCalendarCast = FullCalendar as unknown;
    const FullCalendarAsComponent = FullCalendarCast as ComponentClass<any>;

    return (
      <div className="aggregate-calendar-main">
        <CalendarViewSelector/>
        <FullCalendarAsComponent
          plugins={[ dayGridPlugin, listPlugin ]}
          initialView="dayGridMonth"
        />
      </div>
    );
  }
}