/** @jsx h */
import { h, FunctionComponent } from "preact";
import { NumberCarousel, NumberCarouselProps } from "../Input/NumberCarousel";
import { TextStyle } from "../TextStyle";
import "./QuantitySelection.scss";

export type QuantitySelectionProps = {
  /**Map of variant IDs and information of variant to be shown in table. */
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

  const classNames = ["quantity-selection"];

  //Entire form is disabled if all variant inputs are disabled.
  const isDisabled = Object.values(variants).every(
    (variant) => variant.isDisabled,
  );
  if (isDisabled) {
    classNames.push("quantity-selection--is-disabled");
  }

  return (
    <div className={classNames.join(" ")}>
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
                  isDisabled={variant.isDisabled}
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
    </div>
  );
};
