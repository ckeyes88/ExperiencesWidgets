import "./CalendarMain.scss";
import { addDays } from "date-fns/fp";
import { format } from "date-fns";
import { Component, createRef, h } from "preact";
import { CalendarViewSelector } from "../../SharedComponents/Calendar/CalendarViewSelector";
import { fetchProductsWithAvailability } from "../../Utils/api";
import { Calendar, CalendarEvent, calendarViewType } from "../../SharedComponents/Calendar/CalendarWrapper";
import { extractAndParseEvents } from "../../Utils/helpers";
import { CalendarEventListContent } from "../../SharedComponents/Calendar/CalendarEventListContent";
import { CalendarEventGridContent } from "../../SharedComponents/Calendar/CalendarEventGridContent";
import { CalendarDaySchedule } from "../../SharedComponents/Calendar/CalendarDaySchedule";
import { DateClickEvent } from "../../typings/Calendar";

interface ICalendarContainerProps {
  aggregateViewBaseUrl?: string;
  aggregateViewShop?: string;
  aggregateViewShopUrl?: string;
  baseUrl?: string;
  languageCode?: string;
  shopUrl?: string;
  storefrontAccessToken?: string;
}

interface ICalendarContainerState {
  view: string;
  daySelected?: Date;
  events: CalendarEvent[];
  daySelectedEvents: CalendarEvent[];
}

const eventRendererViewMap = {
  [calendarViewType.dayGrid]: CalendarEventGridContent,
  [calendarViewType.list]: CalendarEventListContent,
};

export class CalendarContainer extends Component<ICalendarContainerProps, ICalendarContainerState> {
  calendarRef = createRef();
  state: ICalendarContainerState = {
    view: calendarViewType.dayGrid,
    events: [],
    daySelected: null,
    daySelectedEvents: [],
  };

  selectView = (view: string) => {
    const calendarApi = this.calendarRef.current.getApi();
    calendarApi.changeView(view);
    this.setState({ view });
  }

  handleSelectDay = ({ date }: DateClickEvent) => {
    const earliest = new Date(date).getTime();
    const latest = new Date(date).setHours(23, 59, 59);
    const daySelectedEvents = this.state.events.filter(e => e.start.getTime() >= earliest && e.end.getTime() < latest);
    this.setState({ daySelected: date, daySelectedEvents });
  }

  handleClose = () => this.setState({ daySelected: null });

  async componentDidMount() {
    const { baseUrl, shopUrl } = this.props;
    const eventsResponse = await fetchProductsWithAvailability(baseUrl, shopUrl, new Date(), addDays(30)(new Date()));
    const events = extractAndParseEvents(eventsResponse, shopUrl);
    this.setState({ events });

    // only show list view on smaller screens
    if (window && window.innerWidth < 768) {
      this.selectView(calendarViewType.list);
    }
  }

  render() {
    const { events, view, daySelected, daySelectedEvents } = this.state;
    const titleFormat = window && window.innerWidth >= 1024 ? null : { month: "short", year: "numeric" };

    return (
      <div className="aggregate-calendar-container">
        <div className="main-heading">Events Calendar</div>
        <div className="aggregate-calendar-main">
          <CalendarViewSelector view={view} selectView={this.selectView} />
          <CalendarDaySchedule
            open={!!daySelected && !!daySelectedEvents.length}
            handleClose={this.handleClose}
            title={daySelected ? format(daySelected, "MMMM d, y") : ""}
            events={daySelectedEvents}
          />
          <Calendar
            forwardRef={this.calendarRef}
            view={view}
            events={events}
            dateClick={this.handleSelectDay}
            eventContent={eventRendererViewMap[view]}
            titleFormat={titleFormat}
          />
        </div>
      </div>
    );
  }
}