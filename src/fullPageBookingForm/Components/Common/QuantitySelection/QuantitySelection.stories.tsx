/** @jsx h */
import { h } from "preact";
import { QuantitySelection, QuantitySelectionProps } from "./QuantitySelection";

export default {
  title: "Full Page Booking Form/Common/Quantity Selection",
  component: QuantitySelection,
  argTypes: {},
};

const defaultArgs: QuantitySelectionProps = {
  variants: [
    { name: "Adult", cost: 100 },
    { name: "Senior", cost: 75 },
    { name: "Child", cost: 50 },
  ],
};

const Template = (args: QuantitySelectionProps) => (
  <QuantitySelection {...defaultArgs} />
);

export const Default = Template.bind({});
Default.args = {};
