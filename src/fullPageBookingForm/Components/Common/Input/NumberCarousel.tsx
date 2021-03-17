/** @jsx h */
import { h, FunctionComponent } from "preact";
import { JSXInternal } from "preact/src/jsx";
import "./NumberCarousel.scss";

export type NumberCarouselProps = {
  variantName: string;
  variantQty: number;
  variantQtyMaximum: number;
  onIncreaseClick: () => void;
  onDecreaseClick: () => void;
  onChange: (value: string) => void;
};

export const NumberCarousel: FunctionComponent<NumberCarouselProps> = ({
  variantName,
  variantQty,
  variantQtyMaximum,
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

  if (variantQty <= 0) {
    decreasingButtonClassNames.push("number-carousel__button--disabled");
  }

  if (variantQty >= variantQtyMaximum) {
    increasingButtonClassNames.push("number-carousel__button--disabled");
  }
  return (
    <div className="number-carousel">
      <button
        className={decreasingButtonClassNames.join(" ")}
        onClick={onIncreaseClick}
        disabled={variantQty <= 0}
      >
        -
      </button>
      <input
        className="number-carousel__input"
        type="number"
        name={variantName}
        min={0}
        value={variantQty}
        onChange={handleChange}
      />
      <button
        className={increasingButtonClassNames.join(" ")}
        onClick={onDecreaseClick}
        disabled={variantQty >= variantQtyMaximum}
      >
        +
      </button>
    </div>
  );
};
