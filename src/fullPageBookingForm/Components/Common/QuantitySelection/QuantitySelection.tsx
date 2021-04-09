/** @jsx h */

import { h, FunctionComponent, Fragment } from "preact";
import { NumberCarousel, NumberCarouselProps } from "../Input/NumberCarousel";
import { TextStyle } from "../TextStyle";
import "./QuantitySelection.scss";

export type NumberCarouselVariants = Array<
  Omit<
    NumberCarouselProps,
    | "onIncreaseClick"
    | "onDecreaseClick"
    | "onChange"
    | "qtyMaximum"
    | "qtyMinimum"
  > & {
    price: number;
  }
>;

export type QuantitySelectionProps = {
  /**Array of variants to be shown in table.*/
  variants: NumberCarouselVariants;
  /**Minimum Quantity for event variant */
  qtyMinimum: number;
  /**Optional maximum quantity for event variant. */
  currentMaximumQty?: number;
  /**Number of units left to be selected. */
  unitsLeft: number;
  /** Total number of items for this time slot in their cart */
  itemsInCart: number | null;
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
  unitsLeft,
  qtyMinimum,
  currentMaximumQty,
  itemsInCart,
}) => {
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

  const showCartItemWarning =
    itemsInCart !== null && itemsInCart > 0 && unitsLeft <= itemsInCart;

  return (
    <div className={classNames.join(" ")} role="QuantitySelection">
      <TextStyle variant="display2" text="Quantity" />
      <div className="quantity-selection__table">
        {Object.values(variants).map((variant, idx) => (
          <Fragment key={`QuantitySelection-Table-Row-${idx}`}>
            <div className="quantity-selection__table-cell">
              <TextStyle variant="body1" text={variant.name} />
              <TextStyle variant="body1" text={`$${variant.price}`} />
              <div
                className="quantity-selection__table-cell__input"
                role={variant.name}
              >
                <NumberCarousel
                  name={variant.name}
                  role={`NumberCarousel-${variant.name}`}
                  onDecreaseClick={() => onDecreaseClick(idx)}
                  onIncreaseClick={() => onIncreaseClick(idx)}
                  currentQty={variant.currentQty}
                  qtyMaximum={
                    currentMaximumQty
                      ? variant.currentQty + currentMaximumQty
                      : variant.currentQty + unitsLeft
                  }
                  qtyMinimum={qtyMinimum}
                  onChange={(value) => onChange(idx, value)}
                  isDisabled={variant.isDisabled}
                />
              </div>
            </div>
          </Fragment>
        ))}
        <div className="quantity-selection__total">
          <TextStyle variant="body2" text="Total" />
          <div />
          <div className="quantity-selection__total__value">
            <TextStyle variant="body2" text={`$${total}`} />
          </div>
        </div>

        {showCartItemWarning && (
          <div className="quantity-selection__cart-warning">
            <TextStyle
              variant="body3"
              text={`You already have ${itemsInCart} item${
                itemsInCart > 1 ? "s" : ""
              } in your cart for this time slot.`}
            />
          </div>
        )}
      </div>
      <div className="quantity-selection__header-rule" />
    </div>
  );
};
