/** @jsx h */
import { h, FunctionComponent } from "preact";
import { JSXInternal } from "preact/src/jsx";
import create from "zustand";
import "./NumberCarousel.scss";

export type NumberCarouselStore = {
  /**Whether component is disabled in parent. */
  isDisabled: boolean;
  /**Sets whether the component should be disabled. */
  setIsDisabled: (isDisabled: boolean) => void;
  /** Name of variant. */
  name: string;
  /**Sets name of variant. */
  setName: (name: string) => void;
  /**Current qty of tickets for variant. */
  currentQty: number;
  /**Maximum qty of tickets for variant. */
  qtyMaximum: number;
  /**Sets the maximum quantity for the variant. */
  setQtyMaximum: (value: number) => void;
  /**Callback for increasing qty click. */
  onIncreaseClick: () => void;
  /**Callback for decreasing qty click. */
  onDecreaseClick: () => void;
  /**Callback for updating ticket qty of variant on text change. */
  setValue: (value: string) => void;
};

export const useNumberCarouselStore = create<NumberCarouselStore>((set) => ({
  isDisabled: false,
  setIsDisabled: (isDisabled: boolean) => set((_) => ({ isDisabled })),
  name: "",
  setName: (name: string) => set((_) => ({ name })),
  currentQty: 0,
  qtyMaximum: 0,
  setQtyMaximum: (qtyMaximum: number) => set((_) => ({ qtyMaximum })),
  onIncreaseClick: () => set((state) => ({ currentQty: state.currentQty + 1 })),
  onDecreaseClick: () => set((state) => ({ currentQty: state.currentQty - 1 })),
  setValue: (value: string) => set((_) => ({ currentQty: parseInt(value) })),
}));

export const NumberCarousel: FunctionComponent = () => {
  const {
    currentQty,
    isDisabled,
    name,
    setValue,
    onDecreaseClick,
    onIncreaseClick,
    qtyMaximum,
  } = useNumberCarouselStore();

  const handleChange: JSXInternal.DOMAttributes<
    HTMLInputElement
  >["onChange"] = (event) => {
    setValue(event.currentTarget.value);
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
