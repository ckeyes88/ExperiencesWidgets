import { h, Component, JSX } from "preact";
import { Button } from "../../Components/Button/Button";
import { EventAvailability, fetchProductsWithAvailability } from "../../../Utils/api";
import { Filters, SortKey, FilterBy } from "../../Components/Filters/Filters";
import { Months } from "../../../Utils/Constants";
import { MonthAvailabilityList } from "../MonthAvailabilityList/MonthAvailabilityList";
import { deepClone } from "../../../Utils/clone";
import { keyify, unkeyify, findFeaturedImageUrl } from "../../../Utils/helpers";

// @ts-ignore
// declare const EXPERIENCES_APP_HOST: string;

export const KEY_DIVIDER = ">>>";

export type WidgetView = "ListView" | "CalendarView";

type LookupEvent = {
  /** Featured image URL */
  featureImage: string;
  /** Name of the event */
  name: string;
  /** Handle to Shopify product */
  handle: string;
};

export type EventLookup = {
  /** Key = event ID & value = object containing useful info */
  [key: string]: LookupEvent;
};

export type MonthData = {
  /** If true, month's data is still loading */
  isLoading: boolean;
  /** If true, failed to fetch current months' data */
  error?: string;
  /** The current month's `productsWithAvailabilities` */
  data?: EventAvailability[];
};

export type MonthsDataLookup = {
  /** Key = month name & value = object containing info about async status & data  */
  [key: string]: MonthData;
};

export type EventsListWidgetProps = {
  /** Base URL of the app API (eg: coolshop.myshopify.com/api) */
  baseUrl: string;
  /** The URL of the shop (eg: coolshop.myshopify.com) */
  shopUrl: string;
  /** The default # of months to display (set by customer in widget data attr) */
  monthsPerPage?: number;
  /** Number of timeslots to display under each month, per load (set by customer in widget data attr) */
  timeslotsPerLoad?: number;
};

export type EventsListWidgetState = {
  /** Lookup that contains data/load states/etc for each month */
  monthsDataLookup: MonthsDataLookup;
  /** Array of month (with year) keys that'll we'll use to loop over */
  monthsToRender: string[];
  /** Whether we should show all events or filter based on event name */
  filterBy: FilterBy;
  /** Determines how to sort the returned product list */
  sortBy: SortKey;
  /** Total number of unique products */
  totalProductsCount?: number;
  /** Expresses whether we're looking at the list or calendar view */
  viewType: WidgetView;
};

/**
 * The `EventsListWidget` may take two forms: 1) a list view, or 2) a calendar view showing
 * a customer's present and upcoming events with a provide time frame. 
 */
export class EventsListWidget extends Component<EventsListWidgetProps, EventsListWidgetState> {
  constructor(props: EventsListWidgetProps) {
    super(props);

    const monthsPerPage = props.monthsPerPage || 3;
    const monthsToRender: string[] = [];
    const monthsDataLookup: MonthsDataLookup = {};

    for (let i = 0; i < monthsPerPage; i++) {
      // Create new date object represent a start date
      const startDate = new Date();
      // Set hours to start of day
      startDate.setHours(0, 0, 0);
      // Define the current month value
      const currentMonth = startDate.getMonth() + i;
      // Grab the full year
      const currentYear = startDate.getFullYear();
      // Default array of month values that are rendered to the page
      monthsToRender.push(keyify(currentMonth, currentYear));
      // Default all months as still loading data
      monthsDataLookup[`${Months[currentMonth]}`] = { isLoading: true };
    }

    // Define default state
    this.state = {
      filterBy: "All",
      monthsDataLookup,
      monthsToRender,
      sortBy: "Date",
      viewType: "ListView",
    };
  }

  /** Additional timeslots that are revealed per month */
  private timeslotsPerLoad: number = this.props.timeslotsPerLoad || 3;

  /** Lookup that stores useful info for a particular event ID */
  private eventLookup: EventLookup = {};

  /** 
   * Fetch all data for months up front so we can count result set. 
   */
  public async componentWillMount() {
    // Pull good stuff from state
    const { monthsToRender } = this.state;
    // Look over each initial month to render & fetch data for it 
    for (let i = 0; i < monthsToRender.length; i++) {
      const [month, year] = unkeyify(monthsToRender[i]);
      await this.handleFetchAvailabilities(Number.parseInt(month), Number.parseInt(year), i === 0);
    }
  }

  /**
   * Fetch availabilities for given range/month & store in state.
   */
  private handleFetchAvailabilities = async (
    month: number, 
    year: number, 
    isFirstMonth: boolean, 
    shouldInsert?: boolean,
  ) => {
    // Pull URLs from props
    const { baseUrl, shopUrl } = this.props;
    const now = new Date();
    // Create new date object represent a start date
    const startDate = new Date(
      year,
      month, 
    );
    // We only want to show availabilities from current date in first month, but from first day of month in all following months
    const date = isFirstMonth ? now.getDate() : 1;
    // Set the month
    startDate.setDate(date);
    // Set hours to start of day
    startDate.setHours(0, 0, 0);
    // Establish end date to cap our query range
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 7, 0);

    // Store returned products here
    let productsWithAvailabilities: EventAvailability[] | undefined;

    // Attempt to fetch products with availabilities
    try {
      productsWithAvailabilities = await fetchProductsWithAvailability(
        baseUrl,
        shopUrl,
        startDate,
        endDate,
      );

      // Pull good stuff out of state
      const { monthsToRender, monthsDataLookup, totalProductsCount } = this.state;
      // Full name of current month
      const monthName = Months[month];
      // Clone current lookup so we don't accidentally mutate anything in state
      const currentLookup = deepClone<MonthsDataLookup>(monthsDataLookup);
      // Set up default partial to update state later
      const newMonthData: Partial<MonthData> = {};
      // Make sure we have existing data if it exists
      const currentMonthData = currentLookup[monthName] 
        ? currentLookup[monthName]
        : newMonthData;

      currentMonthData.isLoading = false;
      currentMonthData.data = productsWithAvailabilities;
      currentLookup[monthName] = currentMonthData as MonthData;

      const newState: Partial<EventsListWidgetState> = {
        monthsDataLookup: currentLookup,
        totalProductsCount: Math.max(this.handleCountTotalTimeslots(currentLookup), totalProductsCount || 0),
      };

      // If we need to, add the provided month to the months to render list (useful for "show more")
      if (shouldInsert) {
        const newMonthsToRender = deepClone(monthsToRender);
        newMonthsToRender.push(keyify(month, year));
        newState.monthsToRender = newMonthsToRender;
      }

      this.setState(newState as EventsListWidgetState);
    }
    // Throw error if fetch fails
    catch (err) {
      console.error(err);
    }
  }

  /**
   * Returns total number of unique products.
   */
  private handleCountTotalTimeslots(lookup: MonthsDataLookup) {
    const monthKeys = Object.keys(lookup);
    // Loop over the month values
    for (let i = 0; i < monthKeys.length; i++) {
      const monthData = lookup[monthKeys[i]];
      // Make sure we're not loading still & actually have data
      if (!monthData.isLoading) {
        const data = monthData.data;
        for (let j = 0; j < data.length; j++) {
          const { _id, name, handle, images, imageLinks, shopifyProductId } = data[j];
          // console.log(name, _id, shopifyProductId);
          
          // Only add to our lookup if it's not a draft
          if (!!shopifyProductId) {            
            this.eventLookup[_id] = {
              featureImage: findFeaturedImageUrl(images, imageLinks),
              name, 
              handle, 
            };
          }
        }
      }
    }    
        
    return Object.keys(this.eventLookup).length;
  }

  /**
   * Increment the months per page, thereby loading more products.
   */
  private handleIncrementMonthsToDisplay = async () => {
    const date = new Date();
    const monthsToRender = this.state.monthsToRender;
    const [m, y] = unkeyify(monthsToRender[monthsToRender.length - 1]);
    const month = Number.parseInt(m); 
    const year = Number.parseInt(y);
    // Increment the month
    date.setMonth(month + 1);
    // If we spill over to next year, increment year
    if (month === 11) {
      date.setFullYear(year + 1);
    }
    // Call for availabilities
    await this.handleFetchAvailabilities(date.getMonth(), date.getFullYear(), false, true);
  }

  /**
   * Update the sort by value in state.
   */
  private handleSortChange = (e: MouseEvent) => {
    this.setState({ 
      sortBy: (e.target as HTMLSelectElement).value as SortKey, 
    });
  }

  /**
   * Update the filter by value in state.
   */
  private handleEventFilterChange = (e: MouseEvent) => {    
    this.setState({
      filterBy: (e.target as HTMLSelectElement).value as FilterBy,
    });
  }

  /**
   * Render number (`numMonthsToDisplay`) of months starting from current date.
   */
  private renderMonths() {
    /** Grab stuff from state */
    const { filterBy, monthsDataLookup } = this.state;
    /** Grab full month names */
    const monthKeys = Object.keys(monthsDataLookup);
    /** Contain all the elements we'll render out later */
    const monthsToRender: JSX.Element[] = [];    

    // Look over months & create a `MonthAvailabilityList` for each
    for (let i = 0; i < monthKeys.length; i++) {      
      const monthName = monthKeys[i];
      const monthData = monthsDataLookup[monthName];   
      // Add to list   
      monthsToRender.push((
        <MonthAvailabilityList
          {...monthData}
          eventLookup={this.eventLookup}
          filterBy={filterBy}
          monthName={monthName}
          shopUrl={this.props.shopUrl}
          timeslotsPerLoad={this.timeslotsPerLoad}
        />
      ));
    }
    // Render the elements
    return monthsToRender;
  }

  /**
   * Render the carousel widget.
   */
  public render() {    
    const { filterBy, sortBy, totalProductsCount, viewType } = this.state;    
    switch(viewType) {
      // Display the list view widget
      case "ListView": 
        return (
          <div className="EventsListWidget">
            <Filters 
              eventLookup={this.eventLookup}
              filterBy={filterBy}
              sortBy={sortBy} 
              totalProducts={totalProductsCount} 
              onFilterChange={this.handleEventFilterChange}
              onSortChange={this.handleSortChange} 
            />
            {this.renderMonths()}
            <Button
              className="EventsListWidget-LoadMore"
              action={this.handleIncrementMonthsToDisplay}
              label="Load More"
            />
          </div>
        );

      // TODO: Display the calendar widget
      case "CalendarView": 
        return (
          <h1>Calendar</h1>
        );

      default: 
        console.error("Unrecognized widget view.");
        return;
    }
  }
}
