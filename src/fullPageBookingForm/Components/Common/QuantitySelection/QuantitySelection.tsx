/** @jsx h */
import { h, FunctionComponent, Fragment } from "preact";
import { NumberCarousel, NumberCarouselProps } from "../Input/NumberCarousel";
import { TextStyle } from "../TextStyle";
import "./QuantitySelection.scss";

export type QuantitySelectionProps = {
  variants: {
    [variantId: number]: NumberCarouselProps & {
      price: number;
    };
  };
};
export const QuantitySelection: FunctionComponent<QuantitySelectionProps> = ({
  variants,
}) => {
  variants;
  /**Calculates total of order. */
  const total = Object.values(variants)
    .map((variant) => variant.price * variant.currentQty)
    .reduce((a, b) => a + b);

  return (
    <Fragment>
      <TextStyle variant="display2" text="Quantity" />
      <table className="quantity-selection__table">
        <colgroup>
          <col span={1} style="width: 30%" />
          <col span={1} style="width: 30%" />
          <col span={1} style="width: 40%" />
        </colgroup>
        <tbody>
          {Object.values(variants).map((variant, idx) => (
            <tr key={`QuantitySelection-Table-Row-${idx}`}>
              <td className="quantity-selection__table-cell">
                <TextStyle variant="body1" text={variant.name} />
              </td>
              <td className="quantity-selection__table-cell">
                <TextStyle variant="body1" text={`$${variant.price}`} />
              </td>
              <td className="quantity-selection__table-cell quantity-selection__table-cell__input">
                <NumberCarousel
                  name={variant.name}
                  onDecreaseClick={variant.onDecreaseClick}
                  onIncreaseClick={variant.onIncreaseClick}
                  currentQty={variant.currentQty}
                  qtyMaximum={variant.qtyMaximum}
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
            <td className="quantity-selection__total">
              <TextStyle variant="body2" text={`$${total}`} />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="quantity-selection__header-rule" />
    </Fragment>
  );
};
