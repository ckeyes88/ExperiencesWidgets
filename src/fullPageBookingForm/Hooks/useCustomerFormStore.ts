import create from "zustand";
import { CustomerInputData } from "../../typings/CustomerInput";

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
