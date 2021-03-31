import {
  EventDBO,
  OrderDetailsFormType,
  FormFieldType,
} from "../../typings/Event";
import { clone } from "ramda";
import { AppDictionary } from "../../typings/Languages";
import { NumberCarouselVariants } from "../Components/Common/QuantitySelection";
import { CustomFormValue } from "../Typings/CustomForm";
import create from "zustand";

export type CustomFormStore = {
  /**Values of custom form. */
  customFormValues: CustomFormValue[];
  /**Sets the initial custom form values based upon the event and the
   * selected variants in the view.
   */
  setCustomFormValues: (
    event: EventDBO,
    labels: Partial<AppDictionary>,
    variants: NumberCarouselVariants,
  ) => void;
  /**Whether the customer can confirm the order based upon the custom form store. */
  canConfirmOrder: () => boolean;
  /**Handles the changing of a custom form. */
  handleCustomFormChange: (
    variantIdx: number,
    fieldLabelIndex: string,
    fieldValue: string,
  ) => void;
  /**Callback for handling data after confirmation of order. */
  onConfirmOrder: () => void;
  /**Whether the modal is open for removing a variant in a per attendee custom form. */
  isModalOpen: boolean;
  /**Variant name to be removed in per attendee custom form. */
  removeVariantName: string;
  /**Index of variant to be removed, relative to the customFormValues array. */
  removeVariantIdx: number;
  /**Sets the removal modal open in a per attendee custom form. */
  setIsModalOpen: (
    isOpen: boolean,
    variantToRemove: { name: string; idx: number },
  ) => void;
  /**Removes a variant in the custom form store. */
  removeVariant: () => void;
};

export const useCustomFormStore = create<CustomFormStore>((set, get) => ({
  customFormValues: [{ name: "", fields: [] }],
  isModalOpen: false,
  removeVariantName: "",
  removeVariantIdx: 0,
  setIsModalOpen: (
    isOpen: boolean,
    variantToRemove: { name: string; idx: number },
  ) =>
    set((_) => {
      return {
        isModalOpen: isOpen,
        removeVariantName: variantToRemove.name,
        removeVariantIdx: variantToRemove.idx,
      };
    }),
  removeVariant: () =>
    set((state) => {
      return {
        customFormValues: state.customFormValues.filter(
          (_, idx) => idx !== state.removeVariantIdx,
        ),
      };
    }),
  setCustomFormValues: (
    event: EventDBO,
    labels: Partial<AppDictionary>,
    selectedVariants: NumberCarouselVariants,
  ) =>
    set((_) => {
      let fields = clone(event.customOrderDetails.fields);

      //If the custom form is per attendee,
      //add name/email fields and render attendee-specific
      //info per form (ex. Attendee 1 of 3)
      if (
        event.customOrderDetails.formType === OrderDetailsFormType.PerAttendee
      ) {
        //Adds first, last, and email to any custom form by default, at the start
        //of the form.
        fields.unshift(
          {
            type: FormFieldType.Text,
            label: labels.firstNameLabel,
            required: true,
          },
          {
            type: FormFieldType.Text,
            label: labels.lastNameLabel,
            required: true,
          },
          {
            type: FormFieldType.Email,
            label: labels.emailLabel,
            required: true,
          },
        );
      }

      const formValues = fields.map((field) => ({
        ...field,
        value: field.defaultValue || "",
        isRequired: field.required,
        type: field.type,
        defaultValue: field.defaultValue,
        options: field.options,
        placeholder: field.placeholder,
      }));

      if (
        event.customOrderDetails.formType === OrderDetailsFormType.PerAttendee
      ) {
        //Create form values for each selected variant.
        const allValues: CustomFormValue[] = [].concat(
          ...selectedVariants.map((variant) => {
            return [...Array(variant.currentQty)].map((_) => ({
              name: variant.name,
              fields: [...formValues],
            }));
          }),
        );

        return {
          customFormValues: allValues,
        };
      }

      return {
        customFormValues: [{ name: "PerOrderForm", fields: formValues }],
      };
    }),
  canConfirmOrder: () => {
    const variants = get().customFormValues;

    return variants.every((variant) =>
      variant.fields.every(
        (field) =>
          !field.isRequired || (field.isRequired && field.value !== ""),
      ),
    );
  },
  handleCustomFormChange: (
    variantIdx,
    fieldLabelIndex: string,
    fieldValue: string,
  ) =>
    set((state) => {
      //fieldLabelIndex is the field label/name and its index position joined by a hyphen
      //Split the values apart here
      // Changed this to split on %%% since a dash causes problems if the customer inputs a field name with a dash i.e. T-Shirt
      const [label, index] = fieldLabelIndex.split("%%%");

      //Create a new custom form value of type FormFieldValueInput
      const oldVal = state.customFormValues[variantIdx].fields[parseInt(index)];

      let newCurrentCustomFormValues = clone(state.customFormValues);
      //Index into the form values array using the index from the field ID
      newCurrentCustomFormValues[variantIdx].fields[parseInt(index)] = {
        ...oldVal,
        label,
        value: fieldValue,
        isRequired: oldVal.isRequired,
        type: oldVal.type,
      };

      //Set state with the updated value
      return {
        customFormValues: newCurrentCustomFormValues,
      };
    }),
  onConfirmOrder: () => {},
}));
