import create from "zustand";
import { useWizardModalAction } from "../Components/Common/WizardModal";
import { BookingFormPage } from "../Typings/BookingFormPage";
import { useConnectActivators } from "./useConnectActivators";

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
