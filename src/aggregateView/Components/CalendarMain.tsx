import "./CalendarMain.scss";
import { addDays } from "date-fns/fp";
import { Component, createRef, h } from "preact";
import { CalendarViewSelector } from "./CalendarViewSelector";
import { fetchProductsWithAvailability } from "../../Utils/api";
import { Calendar, CalendarEvent, calendarViewType } from "../../SharedComponents/Calendar/CalendarWrapper";
import { extractAndParseEvents } from "../../Utils/helpers";
import { CalendarEventListContent } from "../../SharedComponents/Calendar/CalendarEventListContent";
import { CalendarEventGridContent } from "../../SharedComponents/Calendar/CalendarEventGridContent";

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
  };

  selectView = (view: string) => {
    const calendarApi = this.calendarRef.current.getApi();
    calendarApi.changeView(view);
    this.setState({ view });
  }

  async componentDidMount() {
    const { baseUrl, shopUrl } = this.props;
    const eventsResponse = await fetchProductsWithAvailability(baseUrl, shopUrl, new Date(), addDays(30)(new Date()));
    console.log('eventsResponse is ', eventsResponse);
    const events = extractAndParseEvents(eventsResponse, shopUrl);
    this.setState({ events });
  }

  render() {
    const { events, view } = this.state;

    return (
      <div className="aggregate-calendar-container">
        <div className="main-heading">Events Calendar</div>
        <div className="aggregate-calendar-main">
          <CalendarViewSelector view={view} selectView={this.selectView} />
          <Calendar
            forwardRef={this.calendarRef}
            view={view}
            events={events}
            eventContent={eventRendererViewMap[view]}
          />
        </div>
      </div>
    );
  }
}