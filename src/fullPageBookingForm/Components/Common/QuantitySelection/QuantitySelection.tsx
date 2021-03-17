/** @jsx h */
import { h, FunctionComponent, Fragment } from "preact";
import { NumberCarousel } from "../Input/NumberCarousel";
import { TextStyle } from "../TextStyle";
import "./QuantitySelection.scss";

export type QuantitySelectionProps = {
  variants: {
    name: string;
    cost: number;
    qty: number;
    qtyMaximum: number;
    onIncreaseClick: () => void;
    onDecreaseClick: () => void;
    onChange: (value: string) => void;
  }[];
};
export const QuantitySelection: FunctionComponent<QuantitySelectionProps> = ({
  variants,
}) => {
  /**Calculates total of order. */
  const total = variants
    .map((variant) => variant.cost * variant.qty)
    .reduce((a, b) => a + b);

  return (
    <Fragment>
      <TextStyle variant="display2" text="Quantity" />
      <table className="quantity-selection__table">
        <tbody>
          {variants.map((variant, idx) => (
            <tr key={`QuantitySelection-Table-Row-${idx}`}>
              <td className="quantity-selection__table-cell">
                <TextStyle variant="body1" text={variant.name} />
              </td>
              <td className="quantity-selection__table-cell">
                <TextStyle variant="body1" text={`$${variant.cost}`} />
              </td>
              <td className="quantity-selection__table-cell">
                <NumberCarousel
                  variantName={variant.name}
                  onDecreaseClick={variant.onDecreaseClick}
                  onIncreaseClick={variant.onIncreaseClick}
                  variantQty={variant.qty}
                  variantQtyMaximum={variant.qtyMaximum}
                  onChange={variant.onChange}
                />
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <TextStyle variant="body2" text="Total" />
            </td>
            <td />
            <td>
              <TextStyle variant="body2" text={`$${total}`} />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="quantity-selection__header-rule" />
    </Fragment>
  );
};
