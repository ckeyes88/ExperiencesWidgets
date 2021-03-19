/** @jsx h */
import { h } from "preact";
import { object } from "@storybook/addon-knobs";
import { QuantitySelectionProps } from "../../Common/QuantitySelection";
import { OrderDetails, OrderDetailsProps } from "../OrderDetails";
import { Availability } from "../../../../typings/Availability";
import { FormFieldValueInput } from "../../../../typings/FormFieldValueInput";
import { CustomerInputData } from "../../../../typings/CustomerInput";
import { AppDictionary } from "../../../../typings/Languages";
import { EventDBO } from "@helpfulhuman/expapp-shared-libs";
import { OrderLineItemInputData } from "../../../../typings/OrderLineItemInput";

export default {
  title: "Full Page Booking Form/Views/Order Details",
  component: OrderDetails,
  argTypes: {},
};

const Template = (args: OrderDetailsProps) => <OrderDetails {...args} />;

const defaultQuantitySelections: QuantitySelectionProps = {
  variants: [
    {
      name: "Adult",
      price: 150,
      currentQty: 0,
      qtyMaximum: 5,
      onDecreaseClick: () => {},
      onIncreaseClick: () => {},
      onChange: () => {},
    },
  ],
};

const defaultTimeslot: Availability = {
  endsAt: new Date(2021, 1, 13),
  startsAt: new Date(2021, 1, 13),
  productId: "0",
  totalUnits: 5,
  unitsLeft: 4,
  timezone: "UTC",
  formattedTimeslot: {
    time: "11:00am-1:00pm",
    dateStamp: "Date Stamp",
    date: "",
    isoWithoutTZ: "",
    when: "When",
  },
};

const defaultEvent: EventDBO = {};

const defaultLabels: Partial<AppDictionary> = {};

const defaultOrderLineItemData: OrderLineItemInputData = {};

const defaultArgs: OrderDetailsProps = {
  selectedDate: new Date(2021, 1, 13),
  selectedTimeslot: defaultTimeslot,
  event: defaultEvent,
  error: "",
  onAddCustomFormValues: async (
    variant,
    newCustomFormFieldValues: FormFieldValueInput[],
    index: number,
  ) => {
    return {};
  },
  onAddCustomerInfo: async (customerInfo: CustomerInputData) => {},
  onConfirmOrder: () => {},
  onClickBack: () => {},
  closeModal: () => {},
  lineItems: defaultOrderLineItemData,
  labels: defaultLabels,
  isStorybookTest: true,
  quantitySelectionProps: defaultQuantitySelections,
};

export const Primary = Template.bind({});
Primary.args = {
  ...defaultArgs,
};
