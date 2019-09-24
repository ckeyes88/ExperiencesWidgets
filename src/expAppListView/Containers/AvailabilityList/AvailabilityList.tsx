import { h, Component } from "preact";
import { fetchProductsWithAvailability } from "../../../Utils/api";
import { Availability } from "../../../typings/Availability";
import { AvailabilityListItem } from "../../Components/AvailabilityListItem/AvailabilityListItem";
import { diffDays, Months } from "../../../Utils/Constants";

export interface IAvailabilityListProps {
  startDate: Date;
  perLoad: number;
  productQuantityChange: any;
  sortBy: string;
  baseUrl: string;
  shopUrl: string;
}

export interface IAvailabilityListState {
  availabilities: Availability[][];
  products: any;
  sortedItems: any[];
  loaded: boolean;
  error: boolean;
  maxDays: number;
  displayNum: number;
}

export class AvailabilityList extends Component<IAvailabilityListProps, IAvailabilityListState> {

  constructor(props: IAvailabilityListProps) {
    super(props);
    const { startDate } = props;
    const maxDays = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0).getDate() - startDate.getDate();
    this.state = {
      availabilities: undefined,
      products: undefined,
      sortedItems: [],
      loaded: false,
      displayNum: 3,
      maxDays,
      error: false,
    };

    this.showMore = this.showMore.bind(this);
  }

  public async componentWillMount() {
    const { startDate } = this.props;
    const end = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
    //const end: Date = new Date(startDate.getTime() + MINUTES_IN_DAY * (this.state.numDays - 1));
    await this.fetchTimeslots(startDate, end);
  }

  private async fetchTimeslots(start: Date, end: Date) {
    try {
      const productsWithAvailability: any[] = await fetchProductsWithAvailability(
        this.props.baseUrl,
        this.props.shopUrl,
        start,
        end,
      );
      this.formatAvailabilities(productsWithAvailability);
    } catch (e) {
      this.setState({ error: true });
    }

  }

  private formatAvailabilities(productsWithAvailability: any[]) {
    const availabilities: Availability[][] = [];
    for (let i = 0; i <= this.state.maxDays; i++) {
      availabilities.push([]);
    }

    const products: any = {};
    productsWithAvailability.forEach(productWithAvail => {
      products[productWithAvail.id] = productWithAvail;
      const { availabilityProducts } = productWithAvail;
      if (availabilityProducts && Array.isArray(availabilityProducts) && availabilityProducts.length) {
        availabilityProducts.forEach(p => {
          const { availableTimeslots } = p;
          availableTimeslots.reduce((acc: any[], avail: any) => {
            const idx: number = diffDays(this.props.startDate, avail.startsAt);
            acc[idx].push({ ...avail, productId: productWithAvail.id });
            return acc;
          }, availabilities);

        });
      }
    });

    let sortedItems: any[] = [];

    availabilities.map((day: Availability[]) => {
      return day.map((timeslot: Availability) => {
        sortedItems.push({ timeslot, ...products[timeslot.productId] });
      });
    });

    this.setState({
      availabilities,
      products,
      sortedItems: this.sortByDate(sortedItems),
      loaded: true,
    });

  }

  showMore() {
    const { sortedItems, displayNum } = this.state;
    const { perLoad } = this.props;
    const num = displayNum + perLoad > sortedItems.length ? sortedItems.length : displayNum + perLoad;
    this.setState({ displayNum: num });
  }

  componentDidUpdate(prevProps: any) {

    if (prevProps.sortBy !== this.props.sortBy) {
      const { sortedItems } = this.state;
      switch (this.props.sortBy) {
        case "date":
          this.setState({ sortedItems: this.sortByDate(sortedItems) });
          break;
        case "name":
          this.setState({ sortedItems: this.sortByName(sortedItems) });
          break;
      }
    }
  }

  sortByDate(arr: any[]): any[] {
    return arr.sort((a, b) => {
      return new Date(a.timeslot.startsAt).getTime() - new Date(b.timeslot.startsAt).getTime();
    });
  }

  sortByName(arr: any[]): any[] {
    return arr.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
  }

  private renderItems() {
    let res: any[] = [];
    const { sortedItems, displayNum } = this.state;
    if (!sortedItems || !sortedItems.length) { return <h5>No events for this month.</h5>; }
    for (let i = 0; i < displayNum; i++) {
      res.push(<AvailabilityListItem shopUrl={this.props.shopUrl} item={sortedItems[i]} index={i} />);
    }

    return res;
  }

  private renderShowMoreButton(monthName: string) {
    const { sortedItems, displayNum } = this.state;
    return sortedItems.length > displayNum ? (
      <div onClick={this.showMore} className="AvailabilityList-ShowMore">
        More events in {monthName}
      </div>
    ) : null;
  }

  public render() {
    const { loaded, error } = this.state;

    if (error) { return null; }

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