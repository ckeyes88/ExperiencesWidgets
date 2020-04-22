import { h, Component } from "preact";
import { ButtonLink } from "../Button/ButtonLink";
// import { formatCurrency } from "../../../Utils/helpers";

export type MonthAvailabilityItemProps = {
  /** URL to hosted featured image */
  featuredImage: string;
  /** Formatted date range from BE */
  formattedDate: string;
  /** The handle of the Shopify product */
  handle: string;
  /** ??? */
  moneyFormat?: string;
  /** Name of the timeslot's event */
  name: string;
  /** Start date of the timeslot */
  startsAt?: Date;
  /** The URL of the shop (eg: coolshop.myshopify.com) */
  shopUrl: string;
  /** ??? */
  ticketCost?: number;
};

/**
 * Represents a single timeslot. Links customers to Shopify page.
 */
export class MonthAvailabilityItem extends Component<MonthAvailabilityItemProps> {
  /**
   * Render the component.
   */
  public render() {
    const { 
      featuredImage, 
      formattedDate,
      handle,
      name,
      startsAt,
      shopUrl,
    } = this.props;

    return (
      <div className="Container MonthAvailabilityItem">
        <div className="MonthAvailabilityItem-Left">
          <div
            className="MonthAvailabilityItem-Photo"
            style={{ backgroundImage: `url("${featuredImage}")` }}
          >
            <span className="MonthAvailabilityItem-Date">
              {formattedDate}
            </span>
          </div>
          <div className="MonthAvailabilityItem-Desc">
            <h3 className="MonthAvailabilityItem-DescTitle">
              {name}
            </h3>
            {/* <p className="MonthAvailabilityItem-DescCost">{item.ticketCost ? `${cost}` : "Free"}</p> */}
          </div>
        </div>
        <div className="MonthAvailabilityItem-Right">
          <ButtonLink
            className="MonthAvailabilityItem-GoTo"
            label={"Details"}
            href={`https://${shopUrl}/products/${handle}?select=${new Date(startsAt).getTime() / 1000}`}
          />
        </div>
      </div>
    );
  }
}