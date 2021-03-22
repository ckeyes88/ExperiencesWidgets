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
      isDisabled: false,
    },
    1: {
      name: "Child",
      price: 100,
      onChange: defaultOnChange,
      onDecreaseClick: defaultOnDecreaseClick,
      onIncreaseClick: defaultOnIncreaseClick,
      currentQty: 0,
      qtyMaximum: 5,
      isDisabled: false,
    },
    2: {
      name: "Senior",
      price: 50,
      onChange: defaultOnChange,
      onDecreaseClick: defaultOnDecreaseClick,
      onIncreaseClick: defaultOnIncreaseClick,
      currentQty: 0,
      qtyMaximum: 5,
      isDisabled: false,
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

const disabledArgs = {
  variants: {
    0: {
      name: "Adult",
      price: 150,
      onChange: defaultOnChange,
      onDecreaseClick: defaultOnDecreaseClick,
      onIncreaseClick: defaultOnIncreaseClick,
      currentQty: 0,
      qtyMaximum: 5,
      isDisabled: true,
    },
  },
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...disabledArgs,
};
