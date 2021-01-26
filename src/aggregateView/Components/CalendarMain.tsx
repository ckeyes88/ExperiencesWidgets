import "./CalendarMain.scss";
import { addDays, subDays, isAfter } from "date-fns/fp";
import { format } from "date-fns";
import { Component, createRef, h } from "preact";
import { CalendarViewSelector } from "../../SharedComponents/Calendar/CalendarViewSelector";
import { fetchProductsWithAvailability } from "../../Utils/api";
import {
  Calendar,
  CalendarEvent,
  calendarViewType,
  FullCalendarEvent,
} from "../../SharedComponents/Calendar/CalendarWrapper";
import { extractAndParseEvents } from "../../Utils/helpers";
import { CalendarEventListContent } from "../../SharedComponents/Calendar/CalendarEventListContent";
import { CalendarEventGridContent } from "../../SharedComponents/Calendar/CalendarEventGridContent";
import { CalendarDaySchedule } from "../../SharedComponents/Calendar/CalendarDaySchedule";
import { CalendarEventClick, DateClickEvent } from "../../typings/Calendar";
import { CalendarNoEventsMessage } from "../../SharedComponents/Calendar/CalendarNoEventsMessage";

interface ICalendarContainerProps {
  aggregateViewBaseUrl?: string;
  aggregateViewShop?: string;
  aggregateViewShopUrl?: string;
  defaultVew?: string;
  baseUrl?: string;
  languageCode?: string;
  shopUrl?: string;
  storefrontAccessToken?: string;
}

interface ICalendarContainerState {
  view: string;
  daySelected?: Date;
  dialogPosition: {
    pageX: number;
    pageY: number;
  };
  events: CalendarEvent[];
  fullCalendarEvents: FullCalendarEvent[];
  daySelectedEvents: CalendarEvent[];
  end: Date; // tracks current date of next and prev updates
  eventsFetchedUntil: Date; // tracks current end date of events fetched
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
    dialogPosition: {
      pageX: 0,
      pageY: 0,
    },
    fullCalendarEvents: [],
    daySelected: null,
    daySelectedEvents: [],
    end: addDays(30)(new Date()),
    eventsFetchedUntil: addDays(30)(new Date()),
  };

  async componentDidMount() {
    const { defaultVew } = this.props;
    this.fetchEvents();

    // only show list view on smaller screens
    if (window && window.innerWidth < 768) {
      this.selectView(calendarViewType.list);
    }

    if (defaultVew && calendarViewType[defaultVew]) {
      this.selectView(calendarViewType[defaultVew]);
    }

    document && document.getElementsByClassName("fc-prev-button")[0].addEventListener("click", this.handlePrevClick);
    document && document.getElementsByClassName("fc-next-button")[0].addEventListener("click", this.handleNextClick);
  }

  componentWillUnmount() {
    document && document.getElementsByClassName("fc-prev-button")[0].removeEventListener("click", this.handlePrevClick);
    document && document.getElementsByClassName("fc-next-button")[0].removeEventListener("click", this.handleNextClick);
  }

  handlePrevClick = async () => {
    const { view, end } = this.state;
    const decrement = view === calendarViewType.dayGrid ? 30 : 7;
    const newEnd = subDays(decrement)(end);
    if (isAfter(newEnd, end)) {
      this.setState({ end: newEnd });
    }
  }

  handleNextClick = async () => {
    const { view, end, eventsFetchedUntil } = this.state;
    const increment = view === calendarViewType.dayGrid ? 30 : 7;
    const newEnd = addDays(increment)(end);
    if (newEnd > eventsFetchedUntil) { // only fetch new events if new date is not covered by events lust
      this.fetchEvents(undefined, newEnd);
      this.setState({ end: newEnd, eventsFetchedUntil: newEnd });
    } else {
      this.setState({ end: newEnd });
    }
  }

  fetchEvents = async (start = new Date(), end = this.state.end) => {
    const { baseUrl, shopUrl } = this.props;
    const eventsResponse = await fetchProductsWithAvailability(baseUrl, shopUrl, start, end);
    const { calendarEvents: events, fullCalendarEvents } = extractAndParseEvents(eventsResponse, shopUrl, baseUrl);
    this.setState({ events, fullCalendarEvents });
  }

  navigateToNextAvailableTS = () => {
    const earliestAvailableEventDate = Math.min(...this.state.events.map(e => e.start.getTime()));
    const calendarApi = this.calendarRef.current.getApi();
    calendarApi.gotoDate(new Date(earliestAvailableEventDate));
  }

  renderCalendarNoEventsMessage = () => {
    return <CalendarNoEventsMessage  onNextAvailableClick={this.navigateToNextAvailableTS} />;
  }

  handleEventClick = ({ event: { _def, _instance }, jsEvent: { pageX, pageY }}: CalendarEventClick) => {
    const dialogPosition = { pageX, pageY };
    const eventSelected = this.state.events.find(e => _def.extendedProps.uuid === e.uuid);
    this.setState({ daySelected: _instance.range.start, daySelectedEvents: [eventSelected], dialogPosition });
  }

  selectView = (view: string) => {
    const calendarApi = this.calendarRef.current.getApi();
    calendarApi.changeView(view);
    this.setState({ view });
  }

  handleMoreClick = ({ date, jsEvent: { pageX, pageY } }: DateClickEvent) => {
    const dialogPosition = { pageX, pageY };
    const earliest = new Date(date).getTime();
    const latest = new Date(date).setHours(23, 59, 59);
    const daySelectedEvents = this.state.events.filter(e => e.start.getTime() >= earliest && e.start.getTime() < latest);
    this.setState({ daySelected: date, daySelectedEvents, dialogPosition });
  }

  handleClose = () => this.setState({ daySelected: null });

  render() {
    const { fullCalendarEvents, view, daySelected, daySelectedEvents, dialogPosition } = this.state;
    const titleFormat = window && window.innerWidth >= 1024 ? null : { month: "short", year: "numeric" };

    return (
      <div className="CalendarAggregate-Container">
        <div className="main-heading">Events Calendar</div>
        <div className="AggregateCalendar-Main">
          <CalendarViewSelector view={view} selectView={this.selectView} />
          <CalendarDaySchedule
            dialogPosition={dialogPosition}
            open={!!daySelected && !!daySelectedEvents.length}
            handleClose={this.handleClose}
            title={daySelected ? format(daySelected, "MMMM d, y") : ""}
            events={daySelectedEvents}
          />
          <Calendar
            dayMaxEventRows={4}
            eventClick={this.handleEventClick}
            forwardRef={this.calendarRef}
            view={view}
            events={fullCalendarEvents}
            eventContent={eventRendererViewMap[view]}
            titleFormat={titleFormat}
            moreLinkClick={this.handleMoreClick}
            noEventsContent={this.renderCalendarNoEventsMessage()}
          />
        </div>
      </div>
    );
  }
}