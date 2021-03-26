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
import { defaultEvent } from "../__mocks__/Event";
import { clone } from "ramda";
import { CustomerInputData } from "../../typings/CustomerInput";
import { FormFieldValueInput } from "../../typings/FormFieldValueInput";
import { EventVariantDBO } from "../../typings/Event";

export type AppProps = {
  baseUrl: string;
  languageCode: string;
  shopUrl: string;
  shopifyProductId: number;
};

export type QuantitySelectionStore = {
  onDecreaseClick: (variantIdx: number) => void;
  onIncreaseClick: (variantIdx: number) => void;
  onChange: (variantIdx: number, variantQty: string) => void;
  variants: NumberCarouselVariants;
};

export const useQtySelectionStore = create<QuantitySelectionStore>((set) => ({
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
      oldArray[variantIdx].currentQty += 1;

      return {
        variants: oldArray,
      };
    }),
  onChange: (variantIdx: number, variantQty: string) =>
    set((state) => {
      let oldArray = clone(state.variants);
      oldArray[variantIdx].currentQty = parseInt(variantQty);

      return {
        variants: oldArray,
      };
    }),
  variants: defaultEvent.variants.map((variant) => ({
    isDisabled: false,
    currentQty: 0,
    name: variant.name,
    price: variant.price,
    qtyMaximum: defaultEvent.maxLimit,
  })),
}));

export type CustomerFormStore = {
  customerData: CustomerInputData;
  handleCustomerFormChange: (fieldName: string, fieldValue: string) => void;
  onAddCustomerInfo: () => void;
};

export const useCustomerFormStore = create<CustomerFormStore>((set) => ({
  customerData: {
    email: "",
    firstName: "",
    lastName: "",
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
  customFormValues: FormFieldValueInput[];
  handleCustomFormChange: (fieldLabelIndex: string, fieldValue: string) => void;
  handleRemoveVariant: (variantName: string, variantIdx: number) => void;
  onConfirmOrder: () => void;
};

export const useCustomFormStore = create<CustomFormStore>((set) => ({
  customFormValues: defaultEvent.customOrderDetails.fields.map((field) => ({
    ...field,
    value: field.defaultValue,
  })),
  handleCustomFormChange: (fieldLabelIndex: string, fieldValue: string) =>
    set((state) => {
      //fieldLabelIndex is the field label/name and its index position joined by a hyphen
      //Split the values apart here
      // Changed this to split on %%% since a dash causes problems if the customer inputs a field name with a dash i.e. T-Shirt
      const [label, index] = fieldLabelIndex.split("%%%");

      //Create a new custom form value of type FormFieldValueInput
      const oldVal = state.customFormValues[parseInt(index)] || {};

      let newCurrentCustomFormValues = clone(state.customFormValues);
      //Index into the form values array using the index from the field ID
      newCurrentCustomFormValues[parseInt(index)] = {
        ...oldVal,
        label,
        value: fieldValue,
      };

      //Set state with the updated value
      return {
        customFormValues: newCurrentCustomFormValues,
      };
    }),
  //TODO: update logic
  handleRemoveVariant: (variantName: string, variantIdx: number) => {},
  onConfirmOrder: () => {},
}));

export type OrderDetailsStore = {
  onClickBack: () => void;
  closeModal: () => void;
  saveButtonVisibility: "visible" | "hidden" | "disabled";
  setSaveButtonVisibility: (
    buttonVisibility: "visible" | "hidden" | "disabled",
  ) => void;
};

export const useOrderDetailsStore = create<OrderDetailsStore>((set) => ({
  saveButtonVisibility: "visible",
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
          <OrderDetails />
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
