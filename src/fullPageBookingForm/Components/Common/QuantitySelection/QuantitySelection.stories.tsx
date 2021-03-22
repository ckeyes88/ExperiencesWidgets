/** @jsx h */
import { h } from "preact";
import { QuantitySelection, QuantitySelectionProps } from "./QuantitySelection";

export default {
  title: "Full Page Booking Form/Common/Quantity Selection",
  component: QuantitySelection,
  argTypes: {},
};

const defaultOnChange = (value: string) => {};
const defaultOnIncreaseClick = () => {};
const defaultOnDecreaseClick = () => {};

const defaultArgs: QuantitySelectionProps = {
  variants: {
    0: {
      name: "Adult",
      price: 150,
      onChange: defaultOnChange,
      onDecreaseClick: defaultOnDecreaseClick,
      onIncreaseClick: defaultOnIncreaseClick,
      currentQty: 0,
      qtyMaximum: 5,
    },
    1: {
      name: "Child",
      price: 100,
      onChange: defaultOnChange,
      onDecreaseClick: defaultOnDecreaseClick,
      onIncreaseClick: defaultOnIncreaseClick,
      currentQty: 0,
      qtyMaximum: 5,
    },
    2: {
      name: "Senior",
      price: 50,
      onChange: defaultOnChange,
      onDecreaseClick: defaultOnDecreaseClick,
      onIncreaseClick: defaultOnIncreaseClick,
      currentQty: 0,
      qtyMaximum: 5,
    },
  },
};

const Template = (args: QuantitySelectionProps) => (
  <QuantitySelection {...args} />
);

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};
