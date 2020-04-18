 import { h, Component } from "preact";
 import { Availability } from "../../../typings/Availability";
 import { AvailabilityListItem } from "../../Components/AvailabilityListItem/AvailabilityListItem";
 import { fetchProductsWithAvailability, EventAvailability } from "../../../Utils/api";
import { /*diffDays,*/ Months } from "../../../Utils/constants";
import { SortKey } from "../../Components/Filters/Filters";

export interface IAvailabilityListProps {
  /** The start date of the availability range */
  startDate: Date;
  /** Number of timeslots to display under each month, per load */
  timeslotsPerLoad: number;
  /** Determines how to sort the returned product list */
  sortBy: SortKey;
  /** Base URL of the app API (eg: coolshop.myshopify.com/api) */
  baseUrl: string;
  /** The URL of the shop (eg: coolshop.myshopify.com) */
  shopUrl: string;
  /** Handler to update product quantity */
  onProductQuantityChange(id: number): void;
}

export interface IAvailabilityListState {
  availabilities: Availability[][] | undefined;
  products: any;
  sortedItems: any[];
  loaded: boolean;
  /** Error message to display */
  errorMsg?: string;
  /** The number of days between now and a month later */
  maxDays: number;
  displayNum: number;
}

/**
 * 
 */
export class AvailabilityList extends Component<IAvailabilityListProps, IAvailabilityListState> {

  constructor(props: IAvailabilityListProps) {
    super(props);

    // The same date, a month later from now
    const oneMonthLater = new Date(this.startDate.getFullYear(), this.startDate.getMonth() + 1, 0);
    // The number of days between now and a month later
    const maxDays = oneMonthLater.getDate() - this.startDate.getDate();
    
    this.state = {
      availabilities: undefined,
      products: undefined,
      sortedItems: [],
      loaded: false,
      displayNum: 3,
      maxDays,
    };
  }

  /** Clone of the start date so we don't accidentally mutate the original ref */
  private startDate = new Date(this.props.startDate);

  /**
   * Fetch timeslots on component mount.
   */
  public async componentWillMount() {    
    const end = new Date(this.startDate.getFullYear(), this.startDate.getMonth() + 1, 0);
    await this.handleFetchTimeslots(this.startDate, end);
  }

  /**
   * 
   */
  public componentDidUpdate(prevProps: IAvailabilityListProps) {
    const sortBy = this.props.sortBy;

    if (prevProps.sortBy !== sortBy) {
      const { sortedItems } = this.state;

      switch (sortBy) {
        case "Date":
          this.setState({ sortedItems: this.handleSortByDate(sortedItems) });
          break;
        case "Name":
          this.setState({ sortedItems: this.handleSortByName(sortedItems) });
          break;
      }
    }
  }

  /**
   * Fetch all timeslots for the provided date range.
   */
  private async handleFetchTimeslots(start: Date, end: Date) {
    const { baseUrl, shopUrl } = this.props;

    // Attempt to fetch availabilities
    try {
      const productsWithAvailability = await fetchProductsWithAvailability(
        baseUrl,
        shopUrl,
        start,
        end,
      );

      console.log("productsWithAvailability:::", productsWithAvailability);
      this.handleFormatAvailabilities(productsWithAvailability);
    } 
    // Log & set error
    catch (e) {
      console.error(`Error fetching timeslots for range ${start.toDateString()} - ${end.toDateString()}: ` + e);
      const timeStr = `${start.getMonth()}/${start.getDate()}/${start.getFullYear()} - ${end.getMonth()}/${end.getDate()}/${end.getFullYear()}`;
      this.setState({ errorMsg: "Failed to fetch availabilities for " + timeStr });
    }
  }

  /**
   * 
   */
  private handleFormatAvailabilities(productsWithAvailability: EventAvailability[]) {
    const availabilities: Availability[][] = [];
    // console.log("productsWithAvailability:::", productsWithAvailability);
    
    // For every day from now till a month later, create an array to store the day's availabilities
    for (let i = 0; i <= this.state.maxDays; i++) {
      availabilities.push([]);
    }

    // Some sort of lookup
    const products: any = {};

    for (let i = 0; i < productsWithAvailability.length; i++) {
      const product = productsWithAvailability[i]; 

      products[product._id] = product;

      const availabilityProducts = product.availabilityProducts;

      if (!Array.isArray(availabilityProducts) || availabilityProducts.length === 0) {
        continue;
      }



      for (let j = 0; j < availabilityProducts.length; j++) {
        const availabilityProduct = availabilityProducts[j];
        const availableTimeslots = availabilityProduct.availableTimeslots;

        for (let k = 0; k < availableTimeslots.length; k++) {
          // availabilities.push()
          availableTimeslots[k].productId
          // console.log(availableTimeslots[k].startsAt);
        }
      }

    }    

    productsWithAvailability.forEach(productWithAvail => {
      products[productWithAvail._id] = productWithAvail;
      const { availabilityProducts } = productWithAvail;
      if (availabilityProducts && Array.isArray(availabilityProducts) && availabilityProducts.length) {
        
        availabilityProducts.forEach(p => {
          const { availableTimeslots } = p;          
          availableTimeslots.reduce((acc: any[], avail: any, i: number) => {
            //const idx: number = diffDays(this.props.startDate, avail.startsAt);
            if (i >= availabilities.length) {
              return acc;
            }

            acc[i].push({ ...avail, productId: productWithAvail._id });
            return acc;
          }, availabilities);

        });
      }
    });

    // console.log("availabilities after...", availabilities);

    let sortedItems: any[] = [];

    availabilities.map((day: Availability[]) => {
      return day.map((timeslot: Availability) => {
        sortedItems.push({ timeslot, ...products[timeslot.productId] });
      });
    });

    // console.log("sorted...", sortedItems);
    
    this.setState({
      availabilities,
      products,
      sortedItems: this.handleSortByDate(sortedItems),
      loaded: true,
    });

  }

  /**
   * 
   */
  handleShowMore = () => {
    const { sortedItems, displayNum } = this.state;
    const { timeslotsPerLoad: perLoad } = this.props;
    const num = displayNum + perLoad > sortedItems.length 
      ? sortedItems.length 
      : displayNum + perLoad;
    this.setState({ displayNum: num });
  }

  /**
   * 
   */
  handleSortByDate(arr: any[]): any[] {
    return arr.sort((a, b) => {
      return new Date(a.timeslot.startsAt).getTime() - new Date(b.timeslot.startsAt).getTime();
    });
  }

  /**
   * 
   */
  handleSortByName(arr: any[]): any[] {
    return arr.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
  }

  /**
   * 
   */
  private renderItems = () => {
    let res: any[] = [];
    const { sortedItems, displayNum } = this.state;
    if (!sortedItems || !sortedItems.length) { return <h5>No events for this month.</h5>; }
    // console.log("sorted items::", sortedItems);
    for (let i = 0; i < displayNum; i++) {
      res.push((
        <AvailabilityListItem
          shopUrl={this.props.shopUrl}
          item={sortedItems[i]}
          index={i}
        />
      ));
    }

    return res;
  }

  /**
   * 
   */
  private renderShowMoreButton(monthName: string) {
    const { sortedItems, displayNum } = this.state;
    return sortedItems.length > displayNum ? (
      <div onClick={this.handleShowMore} className="AvailabilityList-ShowMore">
        More events in {monthName}
      </div>
    ) : null;
  }

  /**
   * 
   */
  public render() {
    const { loaded, errorMsg } = this.state;

    if (errorMsg) { return null; }

    // TODO: Make this only appear once
    if (!loaded) { return <div className="Container">loading...</div>; }

    const { startDate } = this.props;
    const monthName = Months[startDate.getMonth()];

    return (
      <div className="Container AvailabilityList">
        <p className="AvailabilityList-MonthName">{monthName}</p>
        {this.renderItems()}
        {this.renderShowMoreButton(monthName)}
      </div>
    );
  }
}