import { h, Component } from "preact";
import { AvailabilityList } from "../AvailabilityList/AvailabilityList";
import { Filters, SortByTypes } from "../../Components/Filters/Filters";
import { Button } from "../../Components/Button/Button";

// @ts-ignore
declare const EXPERIENCES_APP_HOST: string;

export interface ICarouselWidgetProps {
  perLoad?: number;
  numMonth?: number;
  shopUrl: string;
  baseUrl: string;
}

export interface ICarouselWidgetState {
  startDate: Date;
  productsSet: any;
  sortBy: SortByTypes;
  monthDisplayNum: number;
  viewType: ViewType;
}

enum ViewType {
  ListView,
  CalendarView,
}
export class CarouselWidget extends Component<ICarouselWidgetProps, ICarouselWidgetState> {
  public static defaultProps: Partial<ICarouselWidgetProps> = {
    perLoad: 3,
    numMonth: 3,
  };

  constructor(props: ICarouselWidgetProps) {
    super(props);
    this.loadMore = this.loadMore.bind(this);
    this.state = {
      monthDisplayNum: props.numMonth,
      startDate: new Date(),
      productsSet: new Set(),
      sortBy: "date",
      viewType: ViewType.ListView,
    };
  }

  productQuantityChange = (id: number) => {
    const { productsSet } = this.state;
    this.setState({ productsSet: productsSet.add(id) });
  }

  onSortChange = (e: any) => {
    this.setState({ sortBy: e.target.value });
  }

  private renderMonths(n: number) {
    let res = [];
    var today = new Date();

    var myToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
    res.push(
      <AvailabilityList
        {...this.props}
        startDate={myToday}
        perLoad={this.props.perLoad}
        productQuantityChange={this.productQuantityChange}
        sortBy={this.state.sortBy}
        baseUrl={this.props.baseUrl}
        shopUrl={this.props.shopUrl}
      />
    );

    for (let i = 1; i < n; i++) {
      let startDate = new Date();
      var anotherToday = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), 0, 0, 0);
      anotherToday.setMonth(anotherToday.getMonth() + i, 1);
      res.push(
        <AvailabilityList
          {...this.props}
          startDate={anotherToday}
          perLoad={this.props.perLoad}
          productQuantityChange={this.productQuantityChange}
          sortBy={this.state.sortBy}
          baseUrl={this.props.baseUrl}
          shopUrl={this.props.shopUrl}
        />
      );
    }
    return res;
  }

  loadMore = () => {
    let { monthDisplayNum } = this.state;
    monthDisplayNum++;
    this.setState({ monthDisplayNum });
  }

  public render() {
    const { productsSet, sortBy, monthDisplayNum, viewType } = this.state;
    console.log("PRODUCT SET: ", productsSet);
    switch(viewType) {
      case ViewType.ListView: 
        return (
          <div className="CarouselWidget">
            <Filters productsQuantity={productsSet.size} onSortChange={this.onSortChange} sortBy={sortBy} />
            {this.renderMonths(monthDisplayNum)}
            <Button
              className="CarouselWidget-LoadMore"
              label={"Load More"}
              action={this.loadMore}
            />
          </div>
        );
      case ViewType.CalendarView: 
          return (
            <h1>Calendar</h1>
          );
    }
    
  }
}
