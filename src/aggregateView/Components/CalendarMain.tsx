import "./CalendarMain.scss";
import { addDays } from "date-fns/fp";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from '@fullcalendar/list';
import { Component, h, ComponentClass, createRef } from "preact";
import { CalendarViewSelector } from "./CalendarViewSelector";
import { EventAvailability, fetchProductsWithAvailability } from "../../Utils/api";

interface ICalendarContainer {
  aggregateViewBaseUrl: string;
  aggregateViewShop: string
  aggregateViewShopUrl: string;
  baseUrl: string;
  languageCode: string;
  shopUrl: string;
  storefrontAccessToken?: string;
}

interface ICalendarContainerState {
  view: string;
  events: EventAvailability[];
}

export class CalendarContainer extends Component<ICalendarContainer> {
  calendarRef = createRef();
  state: ICalendarContainerState = {
    view: 'dayGridMonth',
    events: []
  };

  selectView = (view: string) => {
    const calendarApi = this.calendarRef.current.getApi();
    calendarApi.changeView(view);
    this.setState({ view });
  };

  async componentDidMount() {
    const { baseUrl, shopUrl } = this.props;
    const events = await fetchProductsWithAvailability(baseUrl, shopUrl, new Date(), addDays(30)(new Date()));
    this.setState({ events });
    console.log('events are ', events);
  }

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