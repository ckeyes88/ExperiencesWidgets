import { h, Component } from "preact";
import { Availability } from "../../../typings/Availability";
import { AssetDBO, EventAssetLinkDBO } from "@helpfulhuman/expapp-shared-libs";
import { EventAvailability } from "../../../Utils/api";
import { MonthAvailabilityItem } from "../../Components/MonthAvailabilityItem/MonthAvailabilityItem";
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
  /** Key = event ID & value = object containing useful info */
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
  /** The timeslot objects that inform each list item */
  timeslotsToRender: ExtendedAvailability[];
};

/**
 * The `MonthAvailabilityList` takes in a data set and renders out a timeslot list for 
 * the current month.
 */
export class MonthAvailabilityList extends Component<MonthAvailabilityListProps, MonthAvailabilityListState> {
  constructor(props: MonthAvailabilityListProps) {
    super(props);

    const { isLoading, error, data } = props;
    
    this.state = {
      // Establish how many timeslots we're showing for the current month
      displayingTimeslotsCount: INITIAL_NUM_MONTHS_TO_DISPLAY,
      // Parse data to pull out timeslots
      timeslotsToRender: this.handleParseTimeslots(isLoading, error, data),
    };
  }

  /** Lookup that stores useful info for a particular event ID */
  private eventLookup: EventLookup = {};

  /**
   * When data is done loading (or hasn't errored), take the data, format it, and 
   * store it in state for render consumption.
   */
  public componentWillReceiveProps({ isLoading, error, data }: MonthAvailabilityListProps) {
    this.setState({ 
      timeslotsToRender: this.handleParseTimeslots(isLoading, error, data),
    });
  }

  /**
   * Take in data/load states/errors and try to pull out the timeslots for list
   * rendering.
   */
  private handleParseTimeslots = (
    isLoading: boolean, 
    error: string, 
    data: EventAvailability[],
  ): ExtendedAvailability[] => {
    // Only do work if we have data to parse
    if (!isLoading && !error) {
      // Store availabilities to render later
      let timeslotsToRender: ExtendedAvailability[] = [];
      // Loop over data set & update state with timeslots
      for (let i = 0; i < data.length; i++) {
        const {
          _id,
          availabilityProducts,
          handle,
          images,
          imageLinks,
          name,
        } = data[i];
        // Update event lookup so we can refer to these properties conveniently later
        if (!this.eventLookup.hasOwnProperty(_id)) {
          this.eventLookup[_id] = {
            featureImage: findFeaturedImageUrl(images, imageLinks),
            handle,
            name,
          };
        }
        // Loop over timeslots to attach the event ID
        for (let j = 0; j < availabilityProducts.length; j++) {
          const timeslots = deepClone(availabilityProducts[j].availableTimeslots) as ExtendedAvailability[];

          for (let k = 0; k < timeslots.length; k++) {
            timeslots[k].id = _id;
          }

          timeslotsToRender = timeslotsToRender.concat(timeslots);
        }
      }

      return timeslotsToRender;
    }
    // Return default empty list
    return [];
  }

  /**
   * Add next month to list & fetch data for it.
   */
  private handleShowMore = () => {
    const { displayingTimeslotsCount, timeslotsToRender } = this.state;
    const { timeslotsPerLoad } = this.props;
    const maxNumberOfTimeslots = timeslotsToRender.length;
    const newDisplayCount = Math.min(maxNumberOfTimeslots, displayingTimeslotsCount + timeslotsPerLoad);
    this.setState({ displayingTimeslotsCount: newDisplayCount }, () => console.log(this.state.displayingTimeslotsCount));
  }

  /**
   * Render the load more months button.
   */
  private renderShowMoreButton() {
    const { error, isLoading, monthName } = this.props;
    const {  displayingTimeslotsCount, timeslotsToRender } = this.state;
    // Only show button if we have timeslots left to load
    if (displayingTimeslotsCount < timeslotsToRender.length) {
      // Define classes
      let classes = "AvailabilityList-ShowMore";
      // Disable button if still loading or we errored out
      if (error || isLoading) { classes += " asDisabled"; }
      // Render the button
      return (
        <div
          className={classes}
          onClick={this.handleShowMore}
        >
          More in {monthName}
        </div>
      );
    }
  }

  /**
   * Render a timeslot rows up to the `displayingTimeslotsCount` limit.
   */
  private renderTimeslots = () => {
    const { displayingTimeslotsCount, timeslotsToRender } = this.state;
    const timeslotElements: JSX.Element[] = [];
    const timeslotsClone = deepClone(timeslotsToRender);
    
    // Sort our timeslots by ascending start date/time
    timeslotsClone.sort(sortTimeslotsAscending);

    // Display only the limit of timeslots specified
    for (let i = 0; i < displayingTimeslotsCount; i++) {
      const { 
        id, 
        startsAt, 
        formattedTimeslot: { date }, 
      } = timeslotsClone[i];

      // If we don't have the ID we can't derive requisite props for `MonthAvailabilityItem`
      if (!id) {
        console.error(`There was an error rendering availabilities for ${this.props.monthName}`);
        return;
      }

      // Add elements to array for rendering
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
          {this.renderShowMoreButton()}
        </div>
      </div>
    );
  }
}