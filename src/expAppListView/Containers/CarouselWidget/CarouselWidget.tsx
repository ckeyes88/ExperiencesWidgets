import { h, Component } from "preact";
import { AvailabilityList } from "../AvailabilityList/AvailabilityList";
import { Filters, SortKey } from "../../Components/Filters/Filters";
import { Button } from "../../Components/Button/Button";

// @ts-ignore
declare const EXPERIENCES_APP_HOST: string;

export type WidgetView = "ListView" | "CalendarView";

export interface ICarouselWidgetProps {
  perLoad?: number;
  /** The default # of months to display */
  numMonths?: number;
  shopUrl: string;
  baseUrl: string;
}

export interface ICarouselWidgetState {
  /** The minimum number of months to show on a given page */
  monthsPerPage: number;
  /** A set containing product IDs */
  productsSet: Set<number>;
  /** The start date */
  startDate: Date;
  /** Determines how to sort the returned product list */
  sortBy: SortKey;
  /** Expresses whether we're looking at the list or calendar view */
  viewType: WidgetView;
}

/**
 * A carousel widget
 */
export class CarouselWidget extends Component<ICarouselWidgetProps, ICarouselWidgetState> {
  /** Defined default props */
  public static defaultProps: Partial<ICarouselWidgetProps> = {
    perLoad: 3,
    numMonths: 3,
  };

  constructor(props: ICarouselWidgetProps) {
    super(props);

    this.handleIncrementMonthsToDisplay = this.handleIncrementMonthsToDisplay.bind(this);

    // Define default state
    this.state = {
      monthsPerPage: props.numMonths,
      startDate: new Date(),
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
  private renderMonths(numMonthsToDisplay: number) {
    const res: JSX.Element[] = [];
    const today = new Date();
    const {
      baseUrl,
      shopUrl,
      perLoad,
    } = this.props;

    var myToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
    
    res.push((
      <AvailabilityList
        startDate={myToday}
        perLoad={perLoad}
        onProductQuantityChange={this.handleProductQuantityChange}
        sortBy={this.state.sortBy}
        baseUrl={baseUrl}
        shopUrl={shopUrl}
      />
    ));

    for (let i = 1; i < numMonthsToDisplay; i++) {
      let startDate = new Date();
      var anotherToday = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), 0, 0, 0);
      anotherToday.setMonth(anotherToday.getMonth() + i, 1);
      res.push((
        <AvailabilityList
          startDate={anotherToday}
          perLoad={perLoad}
          onProductQuantityChange={this.handleProductQuantityChange}
          sortBy={this.state.sortBy}
          baseUrl={baseUrl}
          shopUrl={shopUrl}
        />
      ));
    }

    return res;
  }

  /**
   * Render the carousel widget.
   */
  public render() {
    const { productsSet, sortBy, monthsPerPage: monthDisplayNum, viewType } = this.state;
    console.log("PRODUCT SET: ", productsSet);
    
    switch(viewType) {
      case "ListView": 
        return (
          <div className="CarouselWidget">
            <Filters 
              productsQuantity={productsSet.size} 
              onSortChange={this.handleSortChange} 
              sortBy={sortBy} 
            />
            {this.renderMonths(monthDisplayNum)}
            <Button
              className="CarouselWidget-LoadMore"
              action={this.handleIncrementMonthsToDisplay}
              label="Load More"
            />
          </div>
        );

      // TODO: 
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
