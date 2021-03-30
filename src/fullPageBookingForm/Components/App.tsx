/** @jsx h */
import { h, FunctionComponent } from "preact";
import { useConnectActivators } from "../Hooks/useConnectActivators";
import { BookingFormPage } from "../Typings/BookingFormPage";
import { useWizardModalAction, WizardModal } from "./Common/WizardModal";
import { TimeslotSelection } from "./Views/TimeslotSelection";
import { OrderDetails } from "./Views/OrderDetails";
import { SubmissionLoader } from "./Views/SubmissionLoader";
import { Confirmation } from "./Views/Confirmation";
import { WidgetDataProvider } from "./WidgetDataProvider";
import create from "zustand";
import { NumberCarouselVariants } from "./Common/QuantitySelection";

//Use mock data for now.
import { defaultArgs } from "../__mocks__/Event";
import { clone } from "ramda";
import { CustomerInputData } from "../../typings/CustomerInput";
import { FormFieldValueInput } from "../../typings/FormFieldValueInput";
import {
  EventDBO,
  FormFieldType,
  OrderDetailsFormType,
} from "../../typings/Event";
import { AppDictionary } from "../../typings/Languages";
import { CustomFormValue } from "../Typings/CustomForm";
export type AppProps = {
  baseUrl: string;
  languageCode: string;
  shopUrl: string;
  shopifyProductId: number;
};

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
  setVariants: (event: EventDBO) => void;
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
    setVariants: (event: EventDBO) =>
      set((_) => {
        return {
          variants: event.variants.map((variant) => ({
            isDisabled: false,
            currentQty: 0,
            name: variant.name,
            price: variant.price,
            qtyMaximum: event.maxLimit,
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

export type CustomerFormStore = {
  /**Customer data in store. */
  customerData: CustomerInputData;
  /**Whether the customer can confirm order per customer form store. */
  canConfirmOrder: () => boolean;
  /**Callback to handle changes to customer form. */
  handleCustomerFormChange: (fieldName: string, fieldValue: string) => void;
  /**Updates customer data on change of form data. */
  onAddCustomerInfo: () => void;
};

export const useCustomerFormStore = create<CustomerFormStore>((set, get) => ({
  customerData: {
    email: "",
    firstName: "",
    lastName: "",
  },
  canConfirmOrder: () => {
    const customerData = get().customerData;

    return (
      customerData.email !== "" &&
      customerData.firstName !== "" &&
      customerData.lastName !== ""
    );
  },
  handleCustomerFormChange: (fieldName: string, fieldValue: string) =>
    set((state) => {
      return {
        customerData: {
          ...state.customerData,
          [fieldName]: fieldValue,
        },
      };
    }),
  onAddCustomerInfo: () => {},
}));

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

export type OrderDetailsStore = {
  /**Callback for clicking back in order details view. */
  onClickBack: () => void;
  /**Callback for closing wizard modal in view. */
  closeModal: () => void;
  /**Current visibility of the Save & continue button in view. */
  saveButtonVisibility: "visible" | "hidden" | "disabled";
  /**Sets visibility of save and continue button in view. */
  setSaveButtonVisibility: (
    buttonVisibility: "visible" | "hidden" | "disabled",
  ) => void;
  /**Whether this component is being tested in storybook. */
  isStorybookTest: boolean;
  /**Whether the save and continue button is disabled in view. */
  isSaveContinueDisabled: boolean;
  /**Sets the save and continue button to be disabled or not in view. */
  setIsSaveContinueDisabled: (isDisabled: boolean) => void;
  /**Sets current page in wizard modal. */
  setPage: (page: number) => void;
};

export const useOrderDetailsStore = create<OrderDetailsStore>((set) => ({
  saveButtonVisibility: "visible",
  isSaveContinueDisabled: false,
  setIsSaveContinueDisabled: (isDisabled: boolean) =>
    set((_) => ({
      isSaveContinueDisabled: isDisabled,
    })),
  isStorybookTest: false,
  setPage: () =>
    set((state) => {
      const setPage = state.isStorybookTest
        ? (pageNumber: number) => {}
        : useWizardModalAction().setPage;

      return {
        setPage: setPage,
      };
    }),
  onClickBack: () => {
    //TODO: Determine if we want to reset data here too.
    useWizardModalAction().setPage(BookingFormPage.TIMESLOT_SELECTION);
  },
  closeModal: () => {
    //TODO: Determine if we want to reset data here too.
    useConnectActivators().setOpen(false);
  },
  setSaveButtonVisibility: (
    buttonVisiblity: "visible" | "hidden" | "disabled",
  ) =>
    set((_) => ({
      saveButtonVisibility: buttonVisiblity,
    })),
}));

export const App: FunctionComponent<AppProps> = (props) => {
  const { open, setOpen } = useConnectActivators();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <WidgetDataProvider data={props}>
      <WizardModal
        open={open}
        initialPage={BookingFormPage.TIMESLOT_SELECTION}
        onClose={handleClose}
      >
        <WizardModal.Page page={BookingFormPage.TIMESLOT_SELECTION}>
          <TimeslotSelection />
        </WizardModal.Page>
        <WizardModal.Page page={BookingFormPage.ORDER_DETAILS}>
          <OrderDetails {...defaultArgs} />
        </WizardModal.Page>
        <WizardModal.Page page={BookingFormPage.SUBMISSION_LOADER}>
          <SubmissionLoader />
        </WizardModal.Page>
        <WizardModal.Page page={BookingFormPage.CONFIRMATION}>
          <Confirmation />
        </WizardModal.Page>
      </WizardModal>
    </WidgetDataProvider>
  );
};
