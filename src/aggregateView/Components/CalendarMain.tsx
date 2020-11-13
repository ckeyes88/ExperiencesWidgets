import "./CalendarMain.scss";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from '@fullcalendar/list';
import { Component, h, ComponentClass, createRef } from "preact";
import { CalendarViewSelector } from "./CalendarViewSelector";

export class CalendarContainer extends Component {
  calendarRef = createRef();
  state = {
    view: 'dayGridMonth'
  };

  selectView = (view: string) => {
    const calendarApi = this.calendarRef.current.getApi();
    calendarApi.changeView(view);
    this.setState({ view });
  };

  render() {
    const { view } = this.state;
    const FullCalendarCast = FullCalendar as unknown;
    const FullCalendarAsComponent = FullCalendarCast as ComponentClass<any>;

    return (
      <div className="aggregate-calendar-container">
        <div className="main-heading">Events Calendar</div>
        <div className="aggregate-calendar-main">
          <CalendarViewSelector view={view} selectView={this.selectView}/>
          <FullCalendarAsComponent
            ref={this.calendarRef}
            plugins={[dayGridPlugin, listPlugin]}
            initialView={view}
          />
        </div>
      </div>
    );
  }
}