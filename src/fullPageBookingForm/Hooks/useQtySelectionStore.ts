import { EventDBO } from "../../typings/Event";
import { clone } from "ramda";
import { NumberCarouselVariants } from "../Components/Common/QuantitySelection";
import create from "zustand";
import { Availability } from "../../typings/Availability";

export type QuantitySelectionStore = {
  /**Update variant count on decrease click. */
  onDecreaseClick: (variantIdx: number) => void;
  /**Update variant count on increase click. */
  onIncreaseClick: (variantIdx: number) => void;
  /**Update quantity on change of input field. */
  onChange: (variantIdx: number, variantQty: string) => void;
  /**Whether the customer can confirm their order per store. */
  canConfirmOrder: () => boolean;
  /**Variants in the store. */
  variants: NumberCarouselVariants;
  /**Number of total units left for the event. */
  unitsLeft: number;
  /**Populate initial variants of store based upon event. */
  setVariants: (event: EventDBO, selectedTimeslot: Availability) => void;
  /**Disables the variants from being edited in view. */
  disableVariants: () => void;
  /**Enables all variants for edit in view. */
  enableVariants: () => void;
  /**Handles the removal of a variant when filling out custom per attendee form. */
  handleRemoveVariant: (variantName: string) => void;
};

export const useQtySelectionStore = create<QuantitySelectionStore>(
  (set, get) => ({
    onDecreaseClick: (variantIdx: number) =>
      set((state) => {
        let oldArray = clone(state.variants);
        oldArray[variantIdx].currentQty -= 1;

        return {
          variants: oldArray,
          unitsLeft: state.unitsLeft + 1,
        };
      }),
    onIncreaseClick: (variantIdx: number) =>
      set((state) => {
        let oldArray = clone(state.variants);
        oldArray[variantIdx].currentQty = oldArray[variantIdx].currentQty + 1;

        return {
          variants: oldArray,
          unitsLeft: state.unitsLeft - 1,
        };
      }),
    onChange: (variantIdx: number, variantQty: string) =>
      set((state) => {
        let oldArray = clone(state.variants);
        /**Ensure maximum qty typed in is at most the maximum variant quantity. */
        oldArray[variantIdx].currentQty =
          parseInt(variantQty) > state.unitsLeft
            ? state.unitsLeft
            : parseInt(variantQty);

        const selectedQty = oldArray[variantIdx].currentQty;

        return {
          variants: oldArray,
          unitsLeft: state.unitsLeft - selectedQty,
        };
      }),
    canConfirmOrder: () => {
      const variants = get().variants;

      return variants.some((variant) => variant.currentQty > 0);
    },
    variants: [],
    unitsLeft: 0,
    setVariants: (event: EventDBO, selectedTimeslot: Availability) =>
      set((_) => {
        return {
          unitsLeft: selectedTimeslot.unitsLeft,
          variants: event.variants.map((variant) => ({
            isDisabled: false,
            currentQty: 0,
            name: variant.name,
            price: variant.price,
          })),
        };
      }),
    disableVariants: () =>
      set((state) => {
        return {
          variants: state.variants.map((variant) => ({
            ...variant,
            isDisabled: true,
          })),
        };
      }),
    enableVariants: () =>
      set((state) => {
        return {
          variants: state.variants.map((variant) => ({
            ...variant,
            isDisabled: false,
          })),
        };
      }),
    handleRemoveVariant: (variantName) =>
      set((state) => {
        return {
          variants: state.variants.map((variant) => {
            if (variant.name === variantName) {
              return {
                ...variant,
                currentQty: variant.currentQty - 1,
              };
            }

            return {
              ...variant,
            };
          }),
        };
      }),
  }),
);
