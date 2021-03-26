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

export default {
  title: "Full Page Booking Form/Views/Order Details",
  component: OrderDetails,
  argTypes: {},
};

const Template = (args: OrderDetailsProps) => <OrderDetails {...args} />;

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
  isStorybookTest: {
    isSaveContinueDisabled: false,
  },
};

export const NonPrePayNoCustomForm = Template.bind({});
NonPrePayNoCustomForm.args = {
  ...defaultArgs,
  quantitySelectionProps: enabledQuantitySelection,
  isStorybookTest: {
    isSaveContinueDisabled: false,
  },
};

export const NonPrePayPerOrderForm = Template.bind({});
NonPrePayPerOrderForm.args = {
  ...defaultArgs,
  quantitySelectionProps: disabledQuantitySelection,
  isStorybookTest: {
    isSaveContinueDisabled: true,
  },
  saveButtonState: "hidden",
  event: {
    ...defaultEvent,
    customOrderDetails: defaultPerOrderCustomerDetails,
  },
};

export const NonPrePayPerAttendeeForm = Template.bind({});
NonPrePayPerAttendeeForm.args = {
  ...defaultArgs,
  quantitySelectionProps: disabledQuantitySelection,
  isStorybookTest: {
    isSaveContinueDisabled: true,
  },
  saveButtonState: "hidden",
  event: {
    ...defaultEvent,
    customOrderDetails: defaultPerAttendeeCustomerDetails,
  },
};

export const PrePayNoCustomForm = Template.bind({});
PrePayNoCustomForm.args = {
  ...defaultArgs,
  quantitySelectionProps: enabledQuantitySelection,
  isStorybookTest: {
    isSaveContinueDisabled: false,
  },
  event: {
    ...defaultEvent,
    paymentType: PaymentType.Prepay,
  },
};

export const PrePayPerOrderForm = Template.bind({});
PrePayPerOrderForm.args = {
  ...defaultArgs,
  quantitySelectionProps: enabledQuantitySelection,
  isStorybookTest: {
    isSaveContinueDisabled: false,
  },
  event: {
    ...defaultEvent,
    paymentType: PaymentType.Prepay,
    customOrderDetails: defaultPerOrderCustomerDetails,
  },
};

export const PrePayPerAttendeeForm = Template.bind({});
PrePayPerAttendeeForm.args = {
  ...defaultArgs,
  quantitySelectionProps: disabledQuantitySelection,
  isStorybookTest: {
    isSaveContinueDisabled: true,
  },
  saveButtonState: "hidden",
  event: {
    ...defaultEvent,
    paymentType: PaymentType.Prepay,
    customOrderDetails: defaultPerAttendeeCustomerDetails,
  },
};
