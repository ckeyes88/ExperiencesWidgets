import { h, Component } from "preact";

export type SortKey = "Date" | "Name";

export interface IFiltersProps {
  /** What basis to sort the product list by */
  sortBy: SortKey;
  /** Total # of unique products */
  totalProducts: number;
  /** Sort by change handler */
  onSortChange(event: MouseEvent): void;
}

/**
 * Renders all possible configuration affordances for the widget in a row. These 
 * affordances allow users to sort by name/date, or specify a category of products
 * to filter by.
 */
export class Filters extends Component<IFiltersProps> {
  /**
   * Render the filter bar.
   */
  public render({
    // totalProducts,
    // sortBy,
    // onSortChange,
  }: IFiltersProps) {
    // const productWord = totalProducts === 1
    //   ? "product"
    //   : "products";

    // const totalMsg = totalProducts === undefined
    //   ? "Loading"
    //   : `${totalProducts} ${productWord}`;

    return (
      <div className="Filters">
        <div className="Container Filters-Container">
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