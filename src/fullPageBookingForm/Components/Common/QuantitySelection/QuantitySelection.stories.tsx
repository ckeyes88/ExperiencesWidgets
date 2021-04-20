/** @jsx h */
import { h } from "preact";
import { QuantitySelection, QuantitySelectionProps } from "./QuantitySelection";

export default {
  title: "Full Page Booking Form/Common/Quantity Selection",
  component: QuantitySelection,
  argTypes: {},
};

const defaultOnChange = (value: number) => {};
const defaultOnIncreaseClick = () => {};
const defaultOnDecreaseClick = () => {};

const defaultArgs: QuantitySelectionProps = {
  variants: [
    {
      name: "Adult",
      price: 150,
      currentQty: 0,
      isDisabled: false,
    },
    {
      name: "Child",
      price: 100,
      currentQty: 0,
      isDisabled: false,
    },
    {
      name: "Senior",
      price: 50,
      currentQty: 0,
      isDisabled: false,
    },
  ],
  onChange: defaultOnChange,
  onDecreaseClick: defaultOnDecreaseClick,
  onIncreaseClick: defaultOnIncreaseClick,
  unitsLeft: 5,
  maxLimit: null,
  itemsInCart: 0,
};

const Template = (args: QuantitySelectionProps) => (
  <QuantitySelection {...args} />
);

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

const disabledArgs = {
  variants: [
    {
      name: "Adult",
      price: 150,
      currentQty: 0,
      isDisabled: true,
    },
  ],
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...disabledArgs,
};
