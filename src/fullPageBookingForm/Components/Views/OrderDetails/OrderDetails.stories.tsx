/** @jsx h */
import { h } from "preact";
import { OrderDetails, OrderDetailsProps } from "../OrderDetails";
import { EventDBO, PaymentType } from "../../../../typings/Event";
import {
  defaultArgs,
  defaultEvent,
  defaultPerOrderCustomerDetails,
  defaultPerAttendeeCustomerDetails,
} from "../../../__mocks__/Event";
import { useCustomerFormStore } from "../../../Hooks/useCustomerFormStore";
import { useCustomFormStore } from "../../../Hooks/useCustomFormStore";
import { useOrderDetailsStore } from "../../../Hooks/useOrderDetailsStore";
import { useQtySelectionStore } from "../../../Hooks/useQtySelectionStore";
import { useEventStore } from "../../../Hooks/useEventStore";
import { useTimeslotStore } from "../../../Hooks/useTimeslotStore";
import { Availability } from "../../../../typings/Availability";

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
const initialEventState = useEventStore.getState();
const initialTimeslotState = useTimeslotStore.getState();

/**Resets state of all stores. */
const resetStoreState = () => {
  useOrderDetailsStore.setState(initialOrderDetailsState, true);
  useCustomFormStore.setState(initialCustomFormState, true);
  useCustomerFormStore.setState(initialCustomerFormState, true);
  useQtySelectionStore.setState(initialQtySelectionState, true);
  useEventStore.setState(initialEventState, true);
  useTimeslotStore.setState(initialTimeslotState, true);
};

//Sets initial state common to all views.
const setInitialState = (event: EventDBO, timeslot: Availability) => {
  //useTimeslotStore((state) => state.setSelectedTimeslot)(timeslot);
  console.log(event);
  useTimeslotStore((state) => state.setSelectedTimeslot)(timeslot);
  useEventStore((state) => state.setEvent)(event);
};

//Create template component for all testing, with the ability
//to seed the state of the component if needed.
const Template = (args: OrderDetailsProps, seedState?: () => void) => {
  if (seedState !== undefined && typeof seedState === "function") {
    console.log("seeding");
    seedState();
  }
  resetStoreState();
  setInitialState(args.event, args.selectedTimeslot);
  return (
    <div>
      <OrderDetails {...args} />
    </div>
  );
};

export const NonPrepayNoCustomForm = Template.bind({});
NonPrepayNoCustomForm.args = {
  ...defaultArgs,
};
export const NonPrepayNoCustomFormMinMaxLimit = Template.bind({});
NonPrepayNoCustomFormMinMaxLimit.args = {
  ...defaultArgs,
  event: {
    ...defaultEvent,
    minLimit: 2,
  },
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

export const NonPrepayPerAttendeeFormMinLimit = Template.bind({});
NonPrepayPerAttendeeFormMinLimit.args = {
  ...defaultArgs,
  event: {
    ...defaultEvent,
    customOrderDetails: defaultPerAttendeeCustomerDetails,
    minLimit: 2,
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
