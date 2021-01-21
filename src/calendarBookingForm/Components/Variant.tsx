import "./Variant.scss";

import { Component, h } from "preact";

import { Availability } from "../../typings/Availability";
import { EventVariantDBO } from "../../typings/Event";
import { formatCurrency } from "../../Utils/helpers";
import { AppDictionary } from "../../typings/Languages";

export interface IVariantProps {
  /** creating variant to connect to shopify event detials for selected date */
  variant: EventVariantDBO;
  /** creating variant time slot to hold the availabilty details of selected date */
  variantTimeSlot: Availability;
  /** setting the money format to a string */
  moneyFormat: string;
  quantity: number;
  onChangeQuantity(dir: number, variantId: number): void;
  currentlySelectedTotal: number;
  maxLimit: number;
  /** Event custom labels set in admin experience interface */
  labels: Partial<AppDictionary>;
}

/** exports the variant class */
export class Variant extends Component<IVariantProps> {
  constructor(props: IVariantProps) {
    super(props);
  }

  setInnerPriceHTML() {
    return {
      __html: formatCurrency(this.props.moneyFormat, this.props.variant.price),
    };
  }

  handleIncrQty = () => {
    this.props.onChangeQuantity(1, this.props.variant.shopifyVariantId);
  }

  handleDecrQty = () => {
    if (this.props.quantity !== 0) {
      this.props.onChangeQuantity(-1, this.props.variant.shopifyVariantId);
    }
  }

  renderQtySelector() {
    const {
      quantity,
      maxLimit,
      variantTimeSlot,
      labels,
    } = this.props;

    const unitsLeft = variantTimeSlot.unitsLeft || 0;
    let spaceLeft = unitsLeft - this.props.currentlySelectedTotal;
    const isDisabled = spaceLeft === 0 || (quantity >= maxLimit && maxLimit > 0);

    if (quantity === 0) {
      return (
        <button
          onClick={this.handleIncrQty}
          className={`Variant-AddBtn ${isDisabled ? "asDisabled" : ""}`}
          disabled={isDisabled}
        >
          {labels.addLabel}
        </button>
      );
    } else {
      return (
        <div className="Variant-QtyContainer">
          <div className="Variant-QtyBtnContainer">
            <button className="Variant-QtyBtn" onClick={this.handleDecrQty}>
              &#8722;
            </button>
            <span className="Variant-Qty">{quantity}</span>
            {/* If there is space left that is greater than 0, can be increased */}
            <button
              className={`Variant-QtyBtn ${isDisabled ? "asDisabled" : ""}`}
              onClick={this.handleIncrQty}
              disabled={isDisabled}
            >
              &#43;
            </button>
          </div>
        </div>
      );
    }
  }

  /** renders */
  render() {
    const name =
      this.props.variant.name === "Default" ? "Guest" : this.props.variant.name;

    return (
      <div className="Variant">
        <div className="Variant-Grid">
          <span className="Variant-Age">{name} </span>
          <span
            className="Variant-Price"
            dangerouslySetInnerHTML={this.setInnerPriceHTML()}
          />
          <span className="Variant-QtySelector">{this.renderQtySelector()}</span>
        </div>
      </div>
    );
  }
}
