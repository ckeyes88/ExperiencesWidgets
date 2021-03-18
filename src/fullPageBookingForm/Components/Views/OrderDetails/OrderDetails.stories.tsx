/** @jsx h */
import { h } from "preact";
import { QuantitySelectionProps } from "../../Common/QuantitySelection";
import { OrderDetails, OrderDetailsProps } from "../OrderDetails";

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
      cost: 150,
      currentQty: 0,
      qtyMaximum: 5,
      onDecreaseClick: () => {},
      onIncreaseClick: () => {},
      onChange: () => {},
    },
  ],
};

const defaultArgs: OrderDetailsProps = {
  cost: 50,
  costQuantity: "/ person",
  dateOfEvent: "Monday, January 13",
  startTimeEvent: "11:00am",
  endTimeEvent: "1:00pm",
  remainingSpots: 4,
  isStorybookTest: true,
  onBackClick: () => {},
  quantitySelections: defaultQuantitySelections,
};

export const Primary = Template.bind({});
Primary.args = {
  ...defaultArgs,
};
