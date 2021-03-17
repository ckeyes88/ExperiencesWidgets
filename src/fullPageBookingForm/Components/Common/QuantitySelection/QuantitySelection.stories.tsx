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
      cost: 100,
      onChange: defaultOnChange,
      onDecreaseClick: defaultOnDecreaseClick,
      onIncreaseClick: defaultOnIncreaseClick,
      qty: 0,
      qtyMaximum: 5,
    },
    {
      name: "Senior",
      cost: 75,
      onChange: defaultOnChange,
      onDecreaseClick: defaultOnDecreaseClick,
      onIncreaseClick: defaultOnIncreaseClick,
      qty: 0,
      qtyMaximum: 5,
    },
    {
      name: "Child",
      cost: 50,
      onChange: defaultOnChange,
      onDecreaseClick: defaultOnDecreaseClick,
      onIncreaseClick: defaultOnIncreaseClick,
      qty: 0,
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
