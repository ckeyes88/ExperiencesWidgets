import { EventDBO } from "../../typings/Event";
import { clone } from "ramda";
import { NumberCarouselVariants } from "../Components/Common/QuantitySelection";
import create from "zustand";

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
  variants: (NumberCarouselVariants[number] & { shopifyVariantId: number })[];
  /**Minimum quantity for a variant in the event. */
  minLimit: number;
  /**Current maximum quantity for variants. Is null if API response for event
   * has a maximum qty of 0.
   */
  maxLimit: number | null;
  /**Number of units currently selected in order. */
  currentSelectedUnits: number;
  /**Number of total units left for the event. */
  unitsLeft: number;
  /**Populate initial variants of store based upon event. */
  setVariants: (event: EventDBO, unitsLeft: number) => void;
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

        //If our order has a minimum limit, do not allow the user to
        //decrease qty below minimum value on min click.
        const decreaseValue =
          state.currentSelectedUnits === state.minLimit ? 0 : 1;
        oldArray[variantIdx].currentQty -= decreaseValue;

        return {
          variants: oldArray,
          unitsLeft: state.unitsLeft + decreaseValue,
          currentSelectedUnits: state.currentSelectedUnits - decreaseValue,
        };
      }),
    onIncreaseClick: (variantIdx: number) =>
      set((state) => {
        let oldArray = clone(state.variants);

        //If we are at a qty of 0, and the tickets have a min limit, we want to
        //increase the value of the variant by the min limit.
        const increaseValue =
          state.currentSelectedUnits === 0 && state.minLimit > 0
            ? state.minLimit
            : 1;

        //Update value
        oldArray[variantIdx].currentQty =
          oldArray[variantIdx].currentQty + increaseValue;

        return {
          variants: oldArray,
          unitsLeft: state.unitsLeft - increaseValue,
          currentSelectedUnits: state.currentSelectedUnits + increaseValue,
        };
      }),
    onChange: (variantIdx: number, variantQty: string) =>
      set((state) => {
        let oldArray = clone(state.variants);
        const oldQuantity = oldArray[variantIdx].currentQty;

        //Maximum quantity for event will be maxLimit first, and then a tracked value
        //of the addition of the current variant value + units left if no max limit is provided.
        const maxQty = state.maxLimit
          ? state.maxLimit - (state.currentSelectedUnits - oldQuantity)
          : state.unitsLeft + oldQuantity;
        /**Ensure maximum qty typed in is at most the maximum variant quantity.
         * If user enters an empty string, disallow change.
         */
        let newQuantity =
          parseInt(variantQty) >= maxQty ? maxQty : parseInt(variantQty);

        newQuantity = isNaN(newQuantity) ? 0 : newQuantity;

        //Ensure typed value is at minimum minLimit, if one exists.
        newQuantity =
          newQuantity <
          state.minLimit - (state.currentSelectedUnits - oldQuantity)
            ? state.minLimit
            : newQuantity;

        oldArray[variantIdx].currentQty = newQuantity;

        //Update unitsLeft according to quantity differences between
        //old quantity in field and entered quantity.
        const qtyDifference = newQuantity - oldQuantity;

        return {
          variants: oldArray,
          unitsLeft: state.unitsLeft - qtyDifference,
          currentSelectedUnits: state.currentSelectedUnits - qtyDifference,
        };
      }),
    canConfirmOrder: () => {
      const variants = get().variants;

      //Event meets min limit if no min limit is supplied, or there are enough tickets
      //selected.
      const meetsMinLimit =
        get().minLimit === 0 || get().currentSelectedUnits >= get().minLimit;

      return (
        meetsMinLimit && variants.some((variant) => variant.currentQty > 0)
      );
    },
    variants: [],
    unitsLeft: 0,
    currentSelectedUnits: 0,
    maxLimit: null,
    minLimit: 0,
    setVariants: (event: EventDBO, unitsLeft: number) =>
      set((_) => {
        return {
          unitsLeft: unitsLeft,
          maxLimit: event.maxLimit === 0 ? null : event.maxLimit,
          minLimit: event.minLimit,
          currentSelectedUnits: 0,
          variants: event.variants.map((variant) => ({
            isDisabled: false,
            currentQty: 0,
            name: variant.name,
            price: variant.price,
            shopifyVariantId: variant.shopifyVariantId,
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
          unitsLeft: state.unitsLeft + 1,
          currentSelectedUnits: state.currentSelectedUnits - 1,
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
