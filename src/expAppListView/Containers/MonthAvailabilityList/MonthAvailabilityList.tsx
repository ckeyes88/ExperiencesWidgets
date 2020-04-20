import { h, Component } from "preact";
import { Availability } from "../../../typings/Availability";
import { EventAvailability } from "../../../Utils/api";
import { MonthAvailabilityItem } from "../../Components/MonthAvailabilityItem/MonthAvailabilityItem";
import { AssetDBO, EventAssetLinkDBO } from "@helpfulhuman/expapp-shared-libs";
import { deepClone } from "../../../Utils/clone";

// Initial number of months to display in list
const INITIAL_NUM_MONTHS_TO_DISPLAY = 3;

// URL to default featured image (same as what's used in admin UI)
const DEFAULT_EVENT_FEATURED_IMAGE = "https://s3-us-west-2.amazonaws.com/shopify-experiences-app/image_upload_illustration.png";

/**
 * Finds the featured image URL with provided resources. If one cannot be found, defaults
 * to a default URL.
 */
export function findFeaturedImageUrl(images: EventAssetLinkDBO[], imageLinks: AssetDBO[]): string {
  let featuredId;

  for (let i = 0; i < images.length; i++) {
    const { id, featured } = images[i];
    if (featured) {
      featuredId = id.toString();
      break;
    }
  }

  for (let j = 0; j < imageLinks.length; j++) {
    if (imageLinks[j]._id.toString() === featuredId) {
      return imageLinks[j].url;
    }
  }

  return imageLinks.length > 0
    ? imageLinks[0].url
    : DEFAULT_EVENT_FEATURED_IMAGE;
}

/**
 * Sorts timeslots in ascending order.
 */
export function sortTimeslotsAscending(a: ExtendedAvailability, b: ExtendedAvailability) {
  return (new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime());
}

export type ExtendedAvailability = Availability & {
  /** ID of the event */
  id: string;
};

type LookupEvent = {
  /** Featured image URL */
  featureImage: string;
  /** Name of the event */
  name: string;
  /** Handle to Shopify product */
  handle: string;
};

type EventLookup = {
  [key: string]: LookupEvent;
};

export type MonthAvailabilityListProps = {
  /** The month's `productsWithAvailabilities` */
  data?: EventAvailability[];
  /** Whether the fetch failed for this month */
  error?: string;
  /** Whether this month's data is still loading */
  isLoading: boolean;
  /** The full month name */
  monthName: string;
  /** The URL of the shop (eg: coolshop.myshopify.com) */
  shopUrl: string;
  /** Number of timeslots to display under each month, per load */
  timeslotsPerLoad: number;
};

export type MonthAvailabilityListState = {
  /** The number of timeslots currently displaying for this month */
  displayingTimeslotsCount: number;
  /** kdjf */
  timeslotsToRender: ExtendedAvailability[];
};

/**
 * dfjdslkjf
 */
export class MonthAvailabilityList extends Component<MonthAvailabilityListProps, MonthAvailabilityListState> {

  /** Set default state */
  state: MonthAvailabilityListState = {
    displayingTimeslotsCount: INITIAL_NUM_MONTHS_TO_DISPLAY,
    timeslotsToRender: [],
  };

  /** dfjlksajf */
  private eventLookup: EventLookup = {};

  /**
   * When data is done loading (or hasn't errored), take the data, format it, and 
   * store it in state for render consumption.
   */
  public componentWillReceiveProps({ isLoading, error, monthName, data }: MonthAvailabilityListProps) {
    if (!isLoading && !error) {
      console.log(`received data...${monthName}`, data);

      let timeslotsToRender: ExtendedAvailability[] = [];

      for (let i = 0; i < data.length; i++) {
        const { 
          _id,
          availabilityProducts, 
          handle,
          images, 
          imageLinks,
          name,
        } = data[i];

        if (!this.eventLookup.hasOwnProperty(_id)) {
          this.eventLookup[_id] = {
            featureImage: findFeaturedImageUrl(images, imageLinks),
            handle,
            name,
          };
        }

        for (let j = 0; j < availabilityProducts.length; j++) {
          const timeslots = deepClone(availabilityProducts[j].availableTimeslots) as ExtendedAvailability[];

          for (let k = 0; k < timeslots.length; k++) {
            timeslots[k].id = _id;
          }

          timeslotsToRender = timeslotsToRender.concat(timeslots);
        }
      }

      this.setState({ timeslotsToRender });
    }
  }

  /**
   * 
   */
  // handleShowMore = () => {
  //   const { sortedItems, displayingTimeslotsCount } = this.state;
  //   const { timeslotsPerLoad } = this.props;
  //   const num = displayingTimeslotsCount + timeslotsPerLoad > sortedItems.length
  //     ? sortedItems.length
  //     : displayingTimeslotsCount + timeslotsPerLoad;
  //   this.setState({ displayNum: num });
  // }

  // /**
  //  * 
  //  */
  // private renderShowMoreButton(monthName: string) {
  //   const { sortedItems, displayingTimeslotsCount } = this.state;
  //   return sortedItems.length > displayingTimeslotsCount ? (
  //     <div onClick={this.handleShowMore} className="AvailabilityList-ShowMore">
  //       More events in {monthName}
  //     </div>
  //   ) : null;
  // }

  /**
   * Render a timeslot rows up to the `displayingTimeslotsCount` limit.
   */
  private renderTimeslots = () => {
    const { displayingTimeslotsCount, timeslotsToRender } = this.state;
    const timeslotElements: JSX.Element[] = [];
    const timeslotsClone = deepClone(timeslotsToRender);
    timeslotsClone.sort(sortTimeslotsAscending);

    for (let i = 0; i < displayingTimeslotsCount; i++) {
      const { 
        id, 
        startsAt, 
        formattedTimeslot: { date }, 
      } = timeslotsClone[i];

      if (!id) {
        console.error(`There was an error rendering availabilities for ${this.props.monthName}`);
        return;
      }

      timeslotElements.push((
        <MonthAvailabilityItem
          featuredImage={this.eventLookup[id].featureImage}
          formattedDate={date}
          handle={this.eventLookup[id].handle}
          name={this.eventLookup[id].name}
          startsAt={startsAt}
          shopUrl={this.props.shopUrl}
        />
      ));
    }

    return timeslotElements;
  }

  /**
   * Render loading/error states, or the month's availabilities.
   */
  public render() {
    const { isLoading, error, monthName } = this.props;
    // console.log(`received data...${monthName}`, this.props.productsWithAvailabilities);
    // TODO: style
    if (isLoading) {
      return (
        <div className="Container">
          Loading availabilities for {monthName}
        </div>
      ); 
    }
    
    // TODO: style
    if (error) {
      return (
        <div className="Container">
          There was an error fetching availabilities for {monthName}
        </div>
      ); 
    }
  
    return (
      <div className="Container AvailabilityList">
        <p className="AvailabilityList-MonthName">
          {monthName}
        </p>
        <div className="MonthAvailabilityList-Timeslots">
          {this.renderTimeslots()}
        </div>
      </div>
    );
  }
}