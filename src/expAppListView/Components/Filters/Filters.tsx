import { h, Component } from "preact";
import { EventLookup } from "../../Containers/EventsListWidget/EventsListWidget";
import { Select, OptionDefinition } from "../Select/Select";

/**
 * Takes in the event lookup and constructs all the option definitions needed
 * to hydrate the "filter by" dropdown.
 */
function createFilterOptionsFromSet(lookup: EventLookup): OptionDefinition[] {
  const ids = Object.keys(lookup);
  const options: OptionDefinition[] = [{ label: "All Products", value: "All" }];

  for (let i = 0; i < ids.length; i++) {
    const id = ids[i];
    options.push({
      label: lookup[id].name,
      value: id,
    });
  }

  return options;
}

export type FilterBy = "All" | string;

export type SortKey = "Date" | "Name";

export type FiltersProps = {
  /** Lookup so we can find useful info w/ event ID */
  eventLookup: EventLookup;
  /** Whether to show all or a specific event */
  filterBy: FilterBy;
  /** What basis to sort the product list by */
  sortBy: SortKey;
  /** Total # of unique products */
  totalProducts: number;
  /** Sort by change handler */
  onSortChange(event: MouseEvent): void;
  /** Filter by event name or show all */
  onFilterChange(event: MouseEvent): void;
};

/**
 * Renders all possible configuration affordances for the widget in a row. These 
 * affordances allow users to sort by name/date, or specify a category of products
 * to filter by.
 */
export class Filters extends Component<FiltersProps> {
  /**
   * Render the filter bar.
   */
  public render({
    eventLookup,
    filterBy,
    onFilterChange,
    // totalProducts,
    // sortBy,
    // onSortChange,
  }: FiltersProps) {
    // const productWord = totalProducts === 1
    //   ? "product"
    //   : "products";

    // const totalMsg = totalProducts === undefined
    //   ? "Loading"
    //   : `${totalProducts} ${productWord}`;

    return (
      <div className="Filters">
        <div className="Container Filters-Container">
          <Select
            label="FILTER BY"
            options={createFilterOptionsFromSet(eventLookup)}
            onSelectOption={onFilterChange}
            value={filterBy}
          />
          {/* <div className="Filters-SortBy">
            Sort by:
            <select 
              className="Filters-SortBy" 
              id="lang" 
              onChange={onSortChange} 
              value={sortBy}
            >
              <option value="Date">Date</option>
              <option value="Name">Name</option>
            </select>
          </div> */}

          {/* <div>
            {totalMsg}
          </div> */}
        </div>
      </div>
    );
  }
}