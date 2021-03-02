import "./VariantList.scss";

import { Component, h, JSX } from "preact";

import { Availability } from "../../typings/Availability";
import { EventDBO, EventVariantDBO } from "../../typings/Event";
import { Variant } from "./Variant";
import { VariantHeader } from "./VariantHeader";
import { AppDictionary } from "../../typings/Languages";
import { formatCurrency } from "../../Utils/helpers";

export interface IVariantListMainProps {
  /**passing in the entire event, may render some other props unnecessary */
  event: EventDBO;
  /** creating variants to connect to shopify event details of selected date*/
  variants: EventVariantDBO[];
  /** creating variant to be set to the selected date or null if not avaliable*/
  variantSelectedDate: Date | null;
  /** creating variant time slot to the availability details to that selected date  */
  variantTimeSlot: Availability;
  /** Formatting string to set the correct currency formatting */
  moneyFormat: string;
  /** the minimum number of spots that a user can book (if applicable) */
  minLimit: number;
  /** the maximum number of spots that a user can book (if applicable) */
  maxLimit: number;
  /** function will allow the page to go back when the button is clicked */
  onClickBack(): void;
  /** handle confirmation */
  onConfirmSelection(): void;
  /** object containing variant ids and respective quantities */
  quantities: { [variantId: number]: number };
  /** Method passed in to handle changes in the desired quantity of a variant */
  onChangeQuantity(dir: number, variantId: number): void;
  /** Indicate which language you want the calendar to display in */
  locale: string;
  /** Event custom labels set in admin experience interface */
  labels: Partial<AppDictionary>;
}

export interface IVariantListMainState {
  /** renders loading */
  loading: boolean;
}

/** exports variant list class */
export class VariantList extends Component<
  IVariantListMainProps,
  IVariantListMainState
> {
  constructor(props: IVariantListMainProps) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  /** Adds up the total quanities that have been selected  */
  get totalQuantity() {
    const { quantities } = this.props;
    return Object.entries(quantities).reduce(
      (sum, [variantId, quantity]) => sum + quantity,
      0,
    );
  }

  /** Adds up the total price of all variants, rounds to two decimal places, and adds a dollar sign plus appropriate commas */
  get totalAmount() {
    const total = Object.entries(this.props.quantities).reduce(
      (sum, [variantId, quantity]: [string, number]) => {
        const variant = this.props.variants.find(
          (v) => v.shopifyVariantId === +variantId,
        );
        return sum + variant.price * quantity;
      },
      0,
    );
    /** Convert the total to a string, add a dollar sign, and add commas if > 999 */
    return total;
  }

  /** add a message to specify minimum and maximum allowable quantities if applicable */
  renderLimitMessage() {
    const { minLimit, maxLimit, variantTimeSlot } = this.props;
    const maxQuantity = variantTimeSlot.unitsLeft;

    const message = this.props.labels.getOrderLimitMessage(
      minLimit || 0, 
      maxLimit || maxQuantity, 
      maxQuantity,
      { minLimit, maxLimit });

    if (!message) { return null; }

    return !!message.whole ? (
      <div className={"VariantListTotal-QtyMessage"}>
        {message.whole}
      </div>
    ) : (
        <div className={"VariantListTotal-QtyMessage"}>
          {!!message.composite.mainMessage && <div>{message.composite.mainMessage}</div>}
          {!!message.composite.minMessage && <div>{message.composite.minMessage}</div>}
          {!!message.composite.maxMessage && <div>{message.composite.maxMessage}</div>}
        </div>
      );
  }

  /** diplays variant header and mapping out the variants */
  renderVariants = () => {
    const {
      variants,
      variantSelectedDate,
      variantTimeSlot,
      onConfirmSelection,
      minLimit,
      labels,
      locale,
    } = this.props;

    const isDisabled = this.totalQuantity < minLimit;
    return (
      <div>
        <VariantHeader
          locale={locale}
          labels={labels}
          currentlySelectedTotal={this.totalQuantity}
          variantSelectedDate={variantSelectedDate}
          variantTimeSlot={variantTimeSlot}
          onClickBack={this.onClickBack}
        />
        <div className="VariantContent">{variants.map(this.renderVariant)}</div>
        {this.renderLimitMessage()}
        {this.totalQuantity > 0 && (
          <div className="VariantListTotal">
            <div className="VariantListTotal-Grid">
              <span className="VariantListTotal-Label">{labels.totalLabel}</span>
              <span className="VariantListTotal-Value" dangerouslySetInnerHTML={{__html: formatCurrency(this.props.moneyFormat, this.totalAmount)}}></span>
              <span className="VariantListTotal-Action">
                <button
                  className={`VariantListTotal-ConfirmBtn${
                    isDisabled ? " asDisabled" : ""
                  }`}
                  onClick={onConfirmSelection}
                  disabled={isDisabled}
                >
                  {labels.confirmVariantsLabel}
                </button>
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }

  /** rendering a single variant */
  renderVariant = (variant: EventVariantDBO): JSX.Element => {
    return (
      <Variant
        labels={this.props.labels}
        variantTimeSlot={this.props.variantTimeSlot}
        currentlySelectedTotal={this.totalQuantity}
        moneyFormat={this.props.moneyFormat}
        variant={variant}
        quantity={this.props.quantities[variant.shopifyVariantId]}
        onChangeQuantity={this.props.onChangeQuantity}
        maxLimit={this.props.maxLimit}
      />
    );
  }
  /** allows the page to go back once the button is clicked */
  onClickBack = () => {
    this.props.onClickBack();
  }

  /** rendering */
  render() {
    const { variants } = this.props;

    return (
      <div className={`VariantContainer ${this.totalQuantity > 0 ? "BottomPadding" : ""} ${variants && variants.length < 5 ? "" : "BottomGradient"}`}>
        {this.renderVariants()}
      </div>
    );
  }
}
