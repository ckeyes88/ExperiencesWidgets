import './VariantList.scss';

import { Component, h, JSX } from 'preact';

import { Availability } from '../../typings/Availability';
import { EventDBO, EventVariantDBO } from '../../typings/Event';
import { Variant } from './Variant';
import { VariantHeader } from './VariantHeader';

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
      0
    );
  }

  /** Adds up the total price of all variants, rounds to two decimal places, and adds a dollar sign plus appropriate commas */
  get totalAmount() {
    const total = Object.entries(this.props.quantities).reduce(
      (sum, [variantId, quantity]: [string, number]) => {
        const variant = this.props.variants.find(
          (v) => v.shopifyVariantId === +variantId
        );
        return sum + variant.price * quantity;
      },
      0
    );
    /** Convert the total to a string, add a dollar sign, and add commas if > 999 */
    return `$${total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  }

  /** add a message to specify minimum and maximum allowable quantities if applicable */
  renderLimitMessage() {
    const { minLimit, maxLimit } = this.props;
    if (minLimit && !maxLimit) {
      return (
        <p className="VariantListTotal-QtyMessage">
          Minimum purchase quantity of {minLimit} per order.
        </p>
      );
    }
    if (!minLimit && maxLimit) {
      return (
        <p className="VariantListTotal-QtyMessage">
          Maximum purchase quantity of {maxLimit} per order.
        </p>
      );
    }
    if (minLimit && maxLimit) {
      return (
        <p className="VariantListTotal-QtyMessage">
          Minimum purchase quantity of {minLimit} with a maximum limit of{" "}
          {maxLimit} per order.
        </p>
      );
    }
    return;
  }

  /** diplays variant header and mapping out the variants */
  renderVariants = () => {
    const {
      variants,
      variantSelectedDate,
      variantTimeSlot,
      onConfirmSelection,
      minLimit,
    } = this.props;
    return (
      <div>
        <VariantHeader
          currentlySelectedTotal={this.totalQuantity}
          variantSelectedDate={variantSelectedDate}
          variantTimeSlot={variantTimeSlot}
          onClickBack={this.onClickBack}
        />
        {variants.map(this.renderVariant)}
        {this.totalQuantity > 0 && (
          <div className="VariantListTotal">
            <div className="VariantListTotal-Grid">
              <p className="VariantListTotal-Label">Total</p>
              <p className="VariantListTotal-Value">{this.totalAmount}</p>
              <span className="VariantListTotal-Action">
                <button
                  className="VariantListTotal-ConfirmBtn"
                  onClick={onConfirmSelection}
                  disabled={this.totalQuantity < minLimit}
                >
                  Confirm
                </button>
              </span>
            </div>
          </div>
        )}
        {this.renderLimitMessage()}
      </div>
    );
  };

  /** rendering a single variant */
  renderVariant = (variant: EventVariantDBO): JSX.Element => {
    return (
      <Variant
        variantTimeSlot={this.props.variantTimeSlot}
        currentlySelectedTotal={this.totalQuantity}
        moneyFormat={this.props.moneyFormat}
        variant={variant}
        quantity={this.props.quantities[variant.shopifyVariantId]}
        onChangeQuantity={this.props.onChangeQuantity}
        maxLimit={this.props.maxLimit}
      />
    );
  };
  /** allows the page to go back once the button is clicked */
  onClickBack = () => {
    this.props.onClickBack();
  };

  /** rendering */
  render() {
    return <div className="VariantContainer">{this.renderVariants()}</div>;
  }
}
