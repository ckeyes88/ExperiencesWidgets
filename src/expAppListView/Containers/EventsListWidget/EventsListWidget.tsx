import { h, Component } from "preact";
import { AvailabilityList } from "../AvailabilityList/AvailabilityList";
import { Filters, SortKey } from "../../Components/Filters/Filters";
import { Button } from "../../Components/Button/Button";

// @ts-ignore
declare const EXPERIENCES_APP_HOST: string;

export type WidgetView = "ListView" | "CalendarView";

export interface IEventsListWidgetProps {
  /** Base URL of the app API (eg: coolshop.myshopify.com/api) */
  baseUrl: string;
  /** The URL of the shop (eg: coolshop.myshopify.com) */
  shopUrl: string;
  /** The default # of months to display (set by customer in widget data attr) */
  monthPerPage?: number;
  /** Number of timeslots to display under each month, per load (set by customer in widget data attr) */
  timeslotsPerLoad?: number;
}

export interface IEventsListWidgetState {
  /** The minimum number of months to show on a given page */
  monthsPerPage: number;
  /** A set containing product IDs */
  productsSet: Set<number>;
  /** Determines how to sort the returned product list */
  sortBy: SortKey;
  /** Expresses whether we're looking at the list or calendar view */
  viewType: WidgetView;
}

/**
 * The `EventsListWidget` may take two forms: 1) a list view, or 2) a calendar view showing
 * a customer's present and upcoming events with a provide time frame. 
 */
export class EventsListWidget extends Component<IEventsListWidgetProps, IEventsListWidgetState> {
  /** Defined default props */
  public static defaultProps: Partial<IEventsListWidgetProps> = {
    timeslotsPerLoad: 3,
    monthPerPage: 3,
  };

  constructor(props: IEventsListWidgetProps) {
    super(props);

    this.handleIncrementMonthsToDisplay = this.handleIncrementMonthsToDisplay.bind(this);

    // Define default state
    this.state = {
      monthsPerPage: props.monthPerPage,
      productsSet: new Set(),
      sortBy: "Date",
      viewType: "ListView",
    };
  }

  /**
   * 
   */
  private handleProductQuantityChange = (id: number) => {
    this.setState({ 
      productsSet: this.state.productsSet.add(id), 
    });
  }

  /**
   * Increment the months per page, thereby loading more products.
   */
  private handleIncrementMonthsToDisplay = () => {
    this.setState({
      monthsPerPage: this.state.monthsPerPage + 1,
    });
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
    // Pull out useful stuff from props
    const {
      baseUrl,
      shopUrl,
      timeslotsPerLoad,
    } = this.props;
    // Pull good stuff from state
    const { monthsPerPage, sortBy } = this.state;
    // Keep track of elements we'll render
    const monthsToRender: JSX.Element[] = [];


    // today.setHours(0, 0, 0);

    for (let i = 0; i < monthsPerPage; i++) {
      // Create new date object to mutate
      const scopedToday = new Date();
      // We only want to show availabilities from current date in first month, but from first day of month in all following months
      const date = i === 0 ? scopedToday.getDate() : 1;
      // Set hours to start of day
      scopedToday.setHours(0, 0, 0);
      // Set the month
      scopedToday.setMonth(scopedToday.getMonth() + i, date);
      // Add list to render array
      monthsToRender.push((
        <AvailabilityList
          baseUrl={baseUrl}
          onProductQuantityChange={this.handleProductQuantityChange}
          timeslotsPerLoad={timeslotsPerLoad}
          startDate={scopedToday}
          sortBy={sortBy}
          shopUrl={shopUrl}
        />
      ));
    }

    // const today = new Date()

    // var myToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
    
    // monthsToRender.push((
    //   <AvailabilityList
    //     startDate={myToday}
    //     perLoad={timeslotsPerLoad}
    //     onProductQuantityChange={this.handleProductQuantityChange}
    //     sortBy={this.state.sortBy}
    //     baseUrl={baseUrl}
    //     shopUrl={shopUrl}
    //   />
    // ));

    // for (let i = 1; i < monthsPerPage; i++) {
    //   let startDate = new Date();
    //   var anotherToday = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), 0, 0, 0);
    //   anotherToday.setMonth(anotherToday.getMonth() + i, 1);
    //   monthsToRender.push((
    //     <AvailabilityList
    //       startDate={anotherToday}
    //       perLoad={timeslotsPerLoad}
    //       onProductQuantityChange={this.handleProductQuantityChange}
    //       sortBy={this.state.sortBy}
    //       baseUrl={baseUrl}
    //       shopUrl={shopUrl}
    //     />
    //   ));
    // }

    return monthsToRender;
  }

  /**
   * Render the carousel widget.
   */
  public render() {
    const { productsSet, sortBy, viewType } = this.state;
    console.log("PRODUCT SET: ", productsSet);

    console.log("props:", this.props);
    
    
    switch(viewType) {
      // Display the list view widget
      case "ListView": 
        return (
          <div className="EventsListWidget">
            <Filters 
              productsQuantity={productsSet.size} 
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
