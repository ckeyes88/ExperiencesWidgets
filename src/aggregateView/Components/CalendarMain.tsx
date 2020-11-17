import "./CalendarMain.scss";
import { addDays } from "date-fns/fp";
import { Component, createRef, h } from "preact";
import { CalendarViewSelector } from "../../SharedComponents/Calendar/CalendarViewSelector";
import { fetchProductsWithAvailability } from "../../Utils/api";
import { Calendar, CalendarEvent, calendarViewType } from "../../SharedComponents/Calendar/CalendarWrapper";
import { extractAndParseEvents } from "../../Utils/helpers";
import { CalendarEventListContent } from "../../SharedComponents/Calendar/CalendarEventListContent";
import { CalendarEventGridContent } from "../../SharedComponents/Calendar/CalendarEventGridContent";
import { CalendarDaySchedule } from "../../SharedComponents/Calendar/CalendarDaySchedule";
import { DateClickEvent } from "../../typings/Calendar";

interface ICalendarContainer {
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
  daySelected?: string;
  events: CalendarEvent[];
}

const eventRendererViewMap = {
  [calendarViewType.dayGrid]: CalendarEventGridContent,
  [calendarViewType.list]: CalendarEventListContent,
};

export class CalendarContainer extends Component<ICalendarContainer, ICalendarContainerState> {
  calendarRef = createRef();
  state: ICalendarContainerState = {
    view: calendarViewType.dayGrid,
    events: [],
    daySelected: "",
  };

  selectView = (view: string) => {
    const calendarApi = this.calendarRef.current.getApi();
    calendarApi.changeView(view);
    this.setState({ view });
  }

  handleSelectDay = ({ dateStr }: DateClickEvent) => {
    this.setState({ daySelected: dateStr });
  }

  handleClose = (isOpen: boolean) => this.setState({ daySelected: "" });

  async componentDidMount() {
    const { baseUrl, shopUrl } = this.props;
    const eventsResponse = await fetchProductsWithAvailability(baseUrl, shopUrl, new Date(), addDays(30)(new Date()));
    console.log('eventsResponse is ', eventsResponse);
    const events = extractAndParseEvents(eventsResponse, shopUrl);
    this.setState({ events });
  }

  render() {
    const { events, view, daySelected } = this.state;

    return (
      <div className="aggregate-calendar-container">
        <div className="main-heading">Events Calendar</div>
        <div className="aggregate-calendar-main">
          <CalendarViewSelector view={view} selectView={this.selectView} />
          <CalendarDaySchedule open={!!daySelected} handleClose={this.handleClose} title={daySelected} events={[]} />
          <Calendar
            forwardRef={this.calendarRef}
            view={view}
            events={events}
            dateClick={this.handleSelectDay}
            eventContent={eventRendererViewMap[view]}
          />
        </div>
      </div>
    );
  }
}