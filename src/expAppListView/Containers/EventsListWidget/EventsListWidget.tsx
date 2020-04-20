import { h, Component } from "preact";
// import { AvailabilityList } from "../AvailabilityList/AvailabilityList";
import { Filters, SortKey } from "../../Components/Filters/Filters";
import { Button } from "../../Components/Button/Button";
import { Months } from "../../../Utils/Constants";
import { EventAvailability, fetchProductsWithAvailability } from "../../../Utils/api";
import { deepClone } from "../../../Utils/clone";
import { MonthAvailabilityList } from "../MonthAvailabilityList/MonthAvailabilityList";

// @ts-ignore
declare const EXPERIENCES_APP_HOST: string;

export const KEY_DIVIDER = ">>>";

export type WidgetView = "ListView" | "CalendarView";

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

export interface IEventsListWidgetProps {
  /** Base URL of the app API (eg: coolshop.myshopify.com/api) */
  baseUrl: string;
  /** The URL of the shop (eg: coolshop.myshopify.com) */
  shopUrl: string;
  /** The default # of months to display (set by customer in widget data attr) */
  monthsPerPage?: number;
  /** Number of timeslots to display under each month, per load (set by customer in widget data attr) */
  timeslotsPerLoad?: number;
}

export interface IEventsListWidgetState {
  /** Lookup that contains data/load states/etc for each month */
  monthsDataLookup: MonthsDataLookup;
  /** The minimum number of months to show on a given page */
  monthsToRender: number[];
  /** Determines how to sort the returned product list */
  sortBy: SortKey;
  /** Total number of unique products */
  totalProductsCount?: number;
  /** Expresses whether we're looking at the list or calendar view */
  viewType: WidgetView;
}

/**
 * The `EventsListWidget` may take two forms: 1) a list view, or 2) a calendar view showing
 * a customer's present and upcoming events with a provide time frame. 
 */
export class EventsListWidget extends Component<IEventsListWidgetProps, IEventsListWidgetState> {
  constructor(props: IEventsListWidgetProps) {
    super(props);

    const monthsPerPage = props.monthsPerPage || 3;
    const monthsToRender: number[] = [];
    const monthsDataLookup: MonthsDataLookup = {};

    for (let i = 0; i < monthsPerPage; i++) {
      // Create new date object represent a start date
      const startDate = new Date();
      // Set hours to start of day
      startDate.setHours(0, 0, 0);
      // Define the current month value
      const currentMonth = startDate.getMonth() + i;
      // Default array of month values that are rendered to the page
      monthsToRender.push(currentMonth);
      // Default all months as still loading data
      monthsDataLookup[`${Months[currentMonth]}`] = { isLoading: true };
    }

    // Define default state
    this.state = {
      monthsDataLookup,
      monthsToRender,
      sortBy: "Date",
      viewType: "ListView",
    };
  }

  /** 
   * Fetch all data for months up front so we can count result set. 
   */
  public async componentWillMount() {    
    // Pull URLs from props
    const { baseUrl, shopUrl } = this.props;
    // Pull good stuff from state
    const { monthsToRender } = this.state;

    for (let i = 0; i < monthsToRender.length; i++) {
      const month = monthsToRender[i];
      // Create new date object represent a start date
      const startDate = new Date();
      // We only want to show availabilities from current date in first month, but from first day of month in all following months
      const date = i === 0 ? startDate.getDate() : 1;
      // Set hours to start of day
      startDate.setHours(0, 0, 0);
      // Set the month
      startDate.setMonth(month, date);
      // Establish end date to cap our query range
      const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
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

        const { monthsDataLookup, totalProductsCount } = this.state;
        const currentLookup = deepClone<MonthsDataLookup>(monthsDataLookup);
        const currentMonthData = currentLookup[`${Months[month]}`];

        currentMonthData.isLoading = false;
        currentMonthData.data = productsWithAvailabilities;

        this.setState({ 
          monthsDataLookup: currentLookup, 
          totalProductsCount: Math.max(this.handleCountTotalTimeslots(currentLookup), totalProductsCount || 0), 
        });
      }
      // Throw error if fetch fails
      catch (err) {
        console.error(err);
      }
    }
  }

  /**
   * TODO: Should this return total unique events, products, or timeslots?
   */
  private handleCountTotalTimeslots(lookup: MonthsDataLookup) {
    const monthKeys = Object.keys(lookup);
    const idSet: Set<string> = new Set();

    for (let i = 0; i < monthKeys.length; i++) {
      const monthData = lookup[monthKeys[i]];

      if (!monthData.isLoading) {
        const data = monthData.data;
        for (let j = 0; j < data.length; j++) {
          idSet.add(data[j]._id);
        }
      }
    }    

    return idSet.size;
  }

  /**
   * Increment the months per page, thereby loading more products.
   */
  private handleIncrementMonthsToDisplay = () => {
    // this.setState({
    //   monthsPerPage: this.state.monthsPerPage + 1,
    // });
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
   * Render number (`numMonthsToDisplay`) of months starting from current date.
   */
  private renderMonths() {
    /** Make ref to state lookup */
    const monthsDataLookup = this.state.monthsDataLookup;
    /** Grab full month names */
    const monthKeys = Object.keys(monthsDataLookup);
    /** Contain all the elements we'll render out later */
    const monthsToRender: JSX.Element[] = [];

    // console.log("keys...", monthKeys);
    
    for (let i = 0; i < monthKeys.length; i++) {
      const monthName = monthKeys[i];
      const monthData = monthsDataLookup[monthName];

      console.log(`rendering in loop with for ${monthName}`, monthData.data);
      
      monthsToRender.push((
        <MonthAvailabilityList
          {...monthData}
          monthName={monthName}
          shopUrl={this.props.shopUrl}
          timeslotsPerLoad={this.props.timeslotsPerLoad}
        />
      ));
    }

    return monthsToRender;
  }

  /**
   * Render the carousel widget.
   */
  public render() {    
    const { sortBy, totalProductsCount, viewType } = this.state;
    
    switch(viewType) {
      // Display the list view widget
      case "ListView": 
        return (
          <div className="EventsListWidget">
            <Filters 
              totalProducts={totalProductsCount} 
              onSortChange={this.handleSortChange} 
              sortBy={sortBy} 
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
