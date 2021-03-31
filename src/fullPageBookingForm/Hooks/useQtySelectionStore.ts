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
        };
      }),
    onIncreaseClick: (variantIdx: number) =>
      set((state) => {
        let oldArray = clone(state.variants);
        oldArray[variantIdx].currentQty = oldArray[variantIdx].currentQty + 1;

        return {
          variants: oldArray,
        };
      }),
    onChange: (variantIdx: number, variantQty: string) =>
      set((state) => {
        let oldArray = clone(state.variants);
        const qtyMaximum = oldArray[variantIdx].qtyMaximum;
        /**Ensure maximum qty typed in is at most the maximum variant quantity. */
        oldArray[variantIdx].currentQty =
          parseInt(variantQty) > qtyMaximum ? qtyMaximum : parseInt(variantQty);

        return {
          variants: oldArray,
        };
      }),
    canConfirmOrder: () => {
      const variants = get().variants;

      return variants.some((variant) => variant.currentQty > 0);
    },
    variants: [],
    setVariants: (event: EventDBO, selectedTimeslot: Availability) =>
      set((_) => {
        return {
          variants: event.variants.map((variant) => ({
            isDisabled: false,
            currentQty: 0,
            name: variant.name,
            price: variant.price,
            qtyMaximum: selectedTimeslot.unitsLeft,
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
