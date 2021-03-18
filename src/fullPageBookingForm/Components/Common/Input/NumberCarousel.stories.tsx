/** @jsx h */
import { h } from "preact";
import { NumberCarousel, NumberCarouselProps } from "./NumberCarousel";

export default {
  title: "Full Page Booking Form/Common/Inputs/Number Carousel",
  component: NumberCarousel,
};

const defaultArgs: NumberCarouselProps = {
  name: "Senior",
  currentQty: 0,
  qtyMaximum: 5,
  onDecreaseClick: () => {},
  onIncreaseClick: () => {},
  onChange: (value: string) => {},
};

const Template = (args: NumberCarouselProps) => <NumberCarousel {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  ...defaultArgs,
};
