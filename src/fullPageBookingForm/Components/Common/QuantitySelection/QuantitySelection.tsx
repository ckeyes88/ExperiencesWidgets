/** @jsx h */
import { h, FunctionComponent } from "preact";
import { NumberCarousel, NumberCarouselProps } from "../Input/NumberCarousel";
import { TextStyle } from "../TextStyle";
import "./QuantitySelection.scss";

export type NumberCarouselVariants = Array<
  Omit<
    NumberCarouselProps,
    "onIncreaseClick" | "onDecreaseClick" | "onChange"
  > & {
    price: number;
  }
>;

export type QuantitySelectionProps = {
  /**Array of variants to be shown in table.*/
  variants: NumberCarouselVariants;
  /**Callback for increasing variant quantity at variantIdx. */
  onIncreaseClick: (variantIdx: number) => void;
  /**Callback for decreasing variant quantity at variantIdx */
  onDecreaseClick: (variantIdx: number) => void;
  /**Callback for changing variant quantity at variantIdx. */
  onChange: (variantIdx: number, variantQty: string) => void;
};
export const QuantitySelection: FunctionComponent<QuantitySelectionProps> = ({
  variants,
  onIncreaseClick,
  onChange,
  onDecreaseClick,
}) => {
  variants;
  /**Calculates total of order. */
  let total = variants
    .map((variant) => variant.price * variant.currentQty)
    .reduce((a, b) => a + b, 0);

  //Ensures total never shows NaN.
  total = isNaN(total) ? 0 : total;

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
                  onDecreaseClick={() => onDecreaseClick(idx)}
                  onIncreaseClick={() => onIncreaseClick(idx)}
                  currentQty={variant.currentQty}
                  qtyMaximum={variant.qtyMaximum}
                  onChange={(value) => onChange(idx, value)}
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
