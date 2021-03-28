/** @jsx h */
import { h } from "preact";
import { OrderDetails, OrderDetailsProps } from "../OrderDetails";
import { PaymentType } from "../../../../typings/Event";
import {
  defaultArgs,
  enabledQuantitySelection,
  disabledQuantitySelection,
  defaultEvent,
  defaultPerOrderCustomerDetails,
  defaultPerAttendeeCustomerDetails,
} from "../../../__mocks__/Event";
import {
  useCustomerFormStore,
  useCustomFormStore,
  useOrderDetailsStore,
  useQtySelectionStore,
} from "../../App";

export default {
  title: "Full Page Booking Form/Views/Order Details",
  component: OrderDetails,
  argTypes: {},
};

//Get initial store state.
const initialOrderDetailsState = useOrderDetailsStore.getState();
const initialCustomFormState = useCustomFormStore.getState();
const initialCustomerFormState = useCustomerFormStore.getState();
const initialQtySelectionState = useQtySelectionStore.getState();

/**Resets state of all stores. */
const resetStoreState = () => {
  useOrderDetailsStore.setState(initialOrderDetailsState, true);
  useCustomFormStore.setState(initialCustomFormState, true);
  useCustomerFormStore.setState(initialCustomerFormState, true);
  useQtySelectionStore.setState(initialQtySelectionState, true);
};

//Create template component for all testing, with the ability
//to seed the state of the component if needed.
const Template = (args: OrderDetailsProps, seedState?: () => void) => {
  if (typeof seedState === "function" && seedState !== undefined) {
    seedState();
  }
  return (
    <div>
      {resetStoreState()}
      <OrderDetails {...args} />
    </div>
  );
};

export const NonPrepayNoCustomForm = Template.bind({});
NonPrepayNoCustomForm.args = {
  ...defaultArgs,
  quantitySelectionProps: enabledQuantitySelection,
};

export const NonPrepayPerOrderForm = Template.bind({});
NonPrepayPerOrderForm.args = {
  ...defaultArgs,
  event: {
    ...defaultEvent,
    customOrderDetails: defaultPerOrderCustomerDetails,
  },
};

export const NonPrepayPerAttendeeForm = Template.bind({});
NonPrepayPerAttendeeForm.args = {
  ...defaultArgs,
  event: {
    ...defaultEvent,
    customOrderDetails: defaultPerAttendeeCustomerDetails,
  },
};

export const PrepayNoCustomForm = Template.bind({});
PrepayNoCustomForm.args = {
  ...defaultArgs,
  event: {
    ...defaultEvent,
    paymentType: PaymentType.Prepay,
  },
};

export const PrepayPerOrderForm = Template.bind({});
PrepayPerOrderForm.args = {
  ...defaultArgs,
  event: {
    ...defaultEvent,
    paymentType: PaymentType.Prepay,
    customOrderDetails: defaultPerOrderCustomerDetails,
  },
};

export const PrepayPerAttendeeForm = Template.bind({});
PrepayPerAttendeeForm.args = {
  ...defaultArgs,
  event: {
    ...defaultEvent,
    paymentType: PaymentType.Prepay,
    customOrderDetails: defaultPerAttendeeCustomerDetails,
  },
};
