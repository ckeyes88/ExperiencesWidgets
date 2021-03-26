/** @jsx h */
import { h, FunctionComponent } from "preact";
import { JSXInternal } from "preact/src/jsx";
import "./NumberCarousel.scss";

export type NumberCarouselProps = {
  /**Whether component is disabled in parent. */
  isDisabled: boolean;
  /** Name of variant. */
  name: string;
  /**Current qty of tickets for variant. */
  currentQty: number;
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
  qtyMaximum,
  onIncreaseClick,
  onDecreaseClick,
  onChange,
}) => {
  const handleChange: JSXInternal.DOMAttributes<
    HTMLInputElement
  >["onChange"] = (event) => {
    onChange(event.currentTarget.value);
  };
  const decreasingButtonClassNames = ["number-carousel__button"];
  const increasingButtonClassNames = [...decreasingButtonClassNames];
  const carouselClassNames = ["number-carousel"];

  if (currentQty <= 0) {
    decreasingButtonClassNames.push("number-carousel__button--disabled");
  }

  if (currentQty >= qtyMaximum) {
    increasingButtonClassNames.push("number-carousel__button--disabled");
  }
  return (
    <div className={carouselClassNames.join(" ")}>
      <button
        className={decreasingButtonClassNames.join(" ")}
        onClick={onDecreaseClick}
        disabled={currentQty <= 0 || isDisabled}
      >
        -
      </button>
      <input
        className="number-carousel__input"
        type="number"
        name={name}
        min={0}
        max={qtyMaximum}
        value={currentQty}
        onChange={handleChange}
        disabled={isDisabled}
      />
      <button
        className={increasingButtonClassNames.join(" ")}
        onClick={onIncreaseClick}
        disabled={currentQty >= qtyMaximum}
      >
        +
      </button>
    </div>
  );
};
