/** @jsx h */
import { h, FunctionComponent } from "preact";
import { JSXInternal } from "preact/src/jsx";
import "./NumberCarousel.scss";

export type NumberCarouselProps = {
  /**Whether component is disabled in parent. */
  isDisabled: boolean;
  /** Name of variant. */
  name: string;
  /**Role of component for testing. */
  role?: string;
  /**Current qty of tickets for variant. */
  currentQty: number;
  /**Minimum qty of tickets for variant. */
  qtyMinimum: number;
  /**Maximum qty of tickets for variant. */
  qtyMaximum: number;
  /**Callback for increasing qty click. */
  onIncreaseClick: () => void;
  /**Callback for decreasing qty click. */
  onDecreaseClick: () => void;
  /**Callback for updating ticket qty of variant on text change. */
  onChange: (value: string) => void;
};

export const NumberCarousel: FunctionComponent<NumberCarouselProps> = ({
  name,
  isDisabled,
  currentQty,
  qtyMinimum,
  qtyMaximum,
  onIncreaseClick,
  onDecreaseClick,
  onChange,
  role,
}) => {
  const handleChange: JSXInternal.DOMAttributes<
    HTMLInputElement
  >["onChange"] = (event) => {
    onChange(event.currentTarget.value);
  };
  const decreasingButtonClassNames = ["number-carousel__button"];
  const increasingButtonClassNames = [...decreasingButtonClassNames];
  const carouselClassNames = ["number-carousel"];

  if (currentQty <= 0 || isDisabled) {
    decreasingButtonClassNames.push("number-carousel__button--disabled");
  }

  if (currentQty >= qtyMaximum || isDisabled) {
    increasingButtonClassNames.push("number-carousel__button--disabled");
  }
  return (
    <div className={carouselClassNames.join(" ")} role={role}>
      <button
        className={decreasingButtonClassNames.join(" ")}
        onClick={onDecreaseClick}
        disabled={currentQty <= 0 || isDisabled}
        role="number-carousel-decrease"
      >
        -
      </button>
      <input
        className="number-carousel__input"
        type="number"
        name={name}
        min={qtyMinimum > 0 ? qtyMinimum : 0}
        max={qtyMaximum}
        value={currentQty}
        onChange={handleChange}
        disabled={isDisabled}
        role="number-carousel-input"
      />
      <button
        className={increasingButtonClassNames.join(" ")}
        onClick={onIncreaseClick}
        disabled={currentQty >= qtyMaximum || isDisabled}
        role="number-carousel-increase"
      >
        +
      </button>
    </div>
  );
};
