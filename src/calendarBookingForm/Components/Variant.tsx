import { h, Component } from "preact";
import { formatCurrency } from "../../Utils/helpers"
import "./Variant.scss";
import { EventVariantDBO } from "../../typings/Event";

export interface IVariantProps {
  /** creating variant to connect to shopify event detials for selected date */
  variant: EventVariantDBO;
  /** setting the money format to a string */
  moneyFormat: string;
  quantity: number;
  onChangeQuantity(dir: number, variantId: number): void;
  currentlySelectedTotal: number;
  maxLimit: number;
}
export interface IVariantState { }

/** exports the variant class */
export class Variant extends Component<IVariantProps, IVariantState> {

  constructor(props: IVariantProps) {
    super(props);
  }

  setInnerPriceHTML() {
    return { __html: formatCurrency(this.props.moneyFormat, this.props.variant.price) };
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
    const { quantity, maxLimit, currentlySelectedTotal } = this.props;
    if (quantity === 0) {
      return (
        <button
          onClick={this.handleIncrQty}
          className="Variant-AddBtn"
          disabled={maxLimit && currentlySelectedTotal >= maxLimit}
        >Add
        </button>
      );
    } else {
      return (
        <div className="Variant-QtyContainer">
          <div className="Variant-QtyBtnContainer">
            <button
              className="Variant-QtyBtn"
              onClick={this.handleDecrQty}
            >&#8722;
            </button>
            <span>
              {quantity}
            </span>
            <button
              className="Variant-QtyBtn"
              onClick={this.handleIncrQty}
              disabled={maxLimit && currentlySelectedTotal >= maxLimit}
            >&#43;
            </button>
          </div>
        </div>
      );
    }
  }


  /** renders */
  render() {
    const name = (this.props.variant.name === "Default") ? "Guest" : this.props.variant.name; 

    return (
      <div className="Variant">
        <div className="Variant-Grid">
          <p id="Variant-Details"><span className="Variant-Age">{name} </span>
            <span className="Variant-Price" dangerouslySetInnerHTML={this.setInnerPriceHTML()} /></p>
          {this.renderQtySelector()}
        </div>
      </div>
    );
  }
}