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
        /**
         * If user enters an empty string, disallow change.
         */
        if (isNaN(parseInt(variantQty))) {
          return;
        }

        let oldArray = clone(state.variants);
        const oldQuantity = oldArray[variantIdx].currentQty;
        let newQuantity = parseInt(variantQty);

        const tempSelectedUnits = state.currentSelectedUnits - oldQuantity;
        const tempUnitsLeft = state.unitsLeft + oldQuantity;

        //Determine if updated value meets minimum limit.
        const meetsMinLimit = tempSelectedUnits + newQuantity >= state.minLimit;

        //Ensure entered qty meets minimum limit.
        if (!meetsMinLimit) {
          const minAmount = state.minLimit - tempSelectedUnits;
          oldArray[variantIdx].currentQty = minAmount;

          return {
            variants: oldArray,
            unitsLeft: tempUnitsLeft - minAmount,
            currentSelectedUnits: tempSelectedUnits + minAmount,
          };
        }

        //If no max limit is provided, ensure we are below unitsLeft for variant.
        if (!state.maxLimit) {
          const maxQty = tempUnitsLeft;
          newQuantity = newQuantity >= maxQty ? maxQty : newQuantity;
          oldArray[variantIdx].currentQty = newQuantity;

          return {
            variants: oldArray,
            unitsLeft: tempUnitsLeft - newQuantity,
            currentSelectedUnits: tempSelectedUnits + newQuantity,
          };
        }

        //If max limit is provided, maximum possible qty is minimum between
        //units left and maxLimit.
        const maxQtyLimit =
          state.maxLimit > tempUnitsLeft + tempSelectedUnits
            ? tempUnitsLeft + tempSelectedUnits
            : state.maxLimit;
        const meetsMaxLimit = maxQtyLimit >= newQuantity + tempSelectedUnits;

        //Max limit is provided, and entry does not meet max limit.
        if (!meetsMaxLimit) {
          const maxQty = maxQtyLimit - tempSelectedUnits;
          oldArray[variantIdx].currentQty = maxQty;

          return {
            variants: oldArray,
            unitsLeft: tempUnitsLeft - maxQty,
            currentSelectedUnits: tempSelectedUnits + maxQty,
          };
        }

        oldArray[variantIdx].currentQty = newQuantity;

        return {
          variants: oldArray,
          unitsLeft: tempUnitsLeft - newQuantity,
          currentSelectedUnits: tempSelectedUnits + newQuantity,
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
