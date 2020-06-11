import { h, Component, JSX } from "preact";
import { Availability } from "../../../typings/Availability";
import { EventAvailability } from "../../../Utils/api";
import { EventLookup } from "../EventsListWidget/EventsListWidget";
import { MonthAvailabilityItem } from "../../Components/MonthAvailabilityItem/MonthAvailabilityItem";
import { deepClone } from "../../../Utils/clone";
import { findFeaturedImageUrl } from "../../../Utils/helpers";
import { FilterBy } from "../../Components/Filters/Filters";
// import { Loading } from "../../../SharedComponents/loading/Loading";

// Initial number of months to display in list
const INITIAL_NUM_MONTHS_TO_DISPLAY = 3;

/**
 * Sorts timeslots in ascending order.
 */
function sortTimeslotsAscending(a: ExtendedAvailability, b: ExtendedAvailability) {
  return (new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime());
}

type ParseTimeslotArgs = {
  /** Load flag */
  isLoading: boolean;
  /** Error message */
  error: string;
  /** Data from fetch query */
  data: EventAvailability[];
  /** Event lookup */
  eventLookup: EventLookup;
  /** Filter value */
  filterBy?: FilterBy;
};

/**
 * Take in data/load states/errors and try to pull out the timeslots for list
 * rendering.
 */
function parseTimeslots({
  isLoading,
  error,
  data,
  eventLookup,
  filterBy,
}: ParseTimeslotArgs): ExtendedAvailability[] {
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
        shopifyProductId,
      } = data[i];
      // If we're filtering for a specific event, then skip over everything else
      if (filterBy !== "All" && filterBy !== _id) {
        continue;
      }
      // Update event lookup if they don't already exist (they should) + ensure not a draft
      if (!eventLookup.hasOwnProperty(_id) && shopifyProductId) {
        eventLookup[_id] = {
          featureImage: findFeaturedImageUrl(images, imageLinks),
          handle,
          name,
        };
      }
      // Loop over timeslots to attach the event ID
      for (let j = 0; j < availabilityProducts.length; j++) {
        const timeslots = deepClone(availabilityProducts[j].availableTimeslots) as ExtendedAvailability[];
        // Loop over inner timeslots to add event ID (so each timeslot can utilize event lookup)
        for (let k = 0; k < timeslots.length; k++) {
          timeslots[k].id = _id;
        }
        // Add it to the list
        timeslotsToRender = timeslotsToRender.concat(timeslots);
      }
    }
    // Return event timeslots
    return timeslotsToRender;
  }
  // Return default empty list
  return [];
}

export type ExtendedAvailability = Availability & {
  /** ID of the event */
  id: string;
};

export type MonthAvailabilityListProps = {
  /** The month's `productsWithAvailabilities` */
  data?: EventAvailability[];
  /** Whether the fetch failed for this month */
  error?: string;
  /** Lookup that stores useful info for a particular event ID */
  eventLookup: EventLookup;
  /** How to filter the render set */
  filterBy: FilterBy;
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

    const { isLoading, error, data, eventLookup, filterBy } = props;
    
    this.state = {
      // Establish how many timeslots we're showing for the current month
      displayingTimeslotsCount: INITIAL_NUM_MONTHS_TO_DISPLAY,
      // Parse data to pull out timeslots
      timeslotsToRender: parseTimeslots({ isLoading, error, data, eventLookup, filterBy }),
    };
  }
  
  /**
   * When data is done loading (or hasn't errored), take the data, format it, and 
   * store it in state for render consumption.
   */
  public componentWillReceiveProps({ isLoading, error, data, filterBy, eventLookup }: MonthAvailabilityListProps) {
    this.setState({ 
      timeslotsToRender: parseTimeslots({ isLoading, error, data, eventLookup, filterBy }),
    });
  }

  /**
   * Add next month to list & fetch data for it.
   */
  private handleShowMore = () => {
    const { displayingTimeslotsCount, timeslotsToRender } = this.state;
    const { timeslotsPerLoad } = this.props;
    const maxNumberOfTimeslots = timeslotsToRender.length;
    const newDisplayCount = Math.min(maxNumberOfTimeslots, displayingTimeslotsCount + timeslotsPerLoad);
    this.setState({ displayingTimeslotsCount: newDisplayCount });
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
      let classes = "MonthAvailabilityList-ShowMore";
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
    const { eventLookup, monthName, shopUrl } = this.props;
    const timeslotElements: JSX.Element[] = [];
    const timeslotsClone = deepClone(timeslotsToRender);
    
    // Sort our timeslots by ascending start date/time
    timeslotsClone.sort(sortTimeslotsAscending);

    // Display only the limit of timeslots specified
    for (let i = 0; i < displayingTimeslotsCount; i++) {
      if(!timeslotsClone[i]) {
        // At this point we're trying to display more time slots than are available and should just break out of the loop
        break;
      }

      const { 
        id, 
        startsAt, 
        formattedTimeslot: { date }, 
      } = timeslotsClone[i];

      // If we don't have the ID we can't derive requisite props for `MonthAvailabilityItem`
      if (!id) {
        console.error(`There was an error rendering availabilities for ${monthName}`);
        return;
      }
      const now = new Date();
      // Only add the time slot if the startsAt is in the future
      if (new Date(startsAt).getTime() >= now.getTime()) {
        const event = eventLookup[id];
        if (!event) {
          continue;
        }
        // Add elements to array for rendering
        timeslotElements.push((
          <MonthAvailabilityItem
            featuredImage={event.featureImage}
            formattedDate={date}
            handle={event.handle}
            name={event.name}
            startsAt={startsAt}
            shopUrl={shopUrl}
          />
        ));
      }
    }

    return timeslotElements;
  }

  /**
   * Render loading/error states, or the month's availabilities.
   */
  public render() {
    const { isLoading, error, monthName } = this.props;
    
    if (isLoading) {
      return (
        <div className="MonthAvailabilityList-EmptyContainer">
          {/* <Loading /> */}
          Loading availabilities for {monthName}
        </div>
      ); 
    }
    
    if (error) {
      return (
        <div className="MonthAvailabilityList-EmptyContainer">
          There was an error fetching availabilities for {monthName}
        </div>
      ); 
    }
  
    return (
      <div className="Container MonthAvailabilityList">
        <p className="MonthAvailabilityList-MonthName">
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