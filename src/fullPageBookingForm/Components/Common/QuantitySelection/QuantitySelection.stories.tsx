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
  variants: [
    {
      name: "Adult",
      price: 100,
      onChange: defaultOnChange,
      onDecreaseClick: defaultOnDecreaseClick,
      onIncreaseClick: defaultOnIncreaseClick,
      currentQty: 0,
      qtyMaximum: 5,
    },
    {
      name: "Senior",
      price: 75,
      onChange: defaultOnChange,
      onDecreaseClick: defaultOnDecreaseClick,
      onIncreaseClick: defaultOnIncreaseClick,
      currentQty: 0,
      qtyMaximum: 5,
    },
    {
      name: "Child",
      price: 50,
      onChange: defaultOnChange,
      onDecreaseClick: defaultOnDecreaseClick,
      onIncreaseClick: defaultOnIncreaseClick,
      currentQty: 0,
      qtyMaximum: 5,
    },
  ],
};

const Template = (args: QuantitySelectionProps) => (
  <QuantitySelection {...args} />
);

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};
