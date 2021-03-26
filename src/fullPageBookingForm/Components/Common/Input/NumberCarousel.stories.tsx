/** @jsx h */
import { h } from "preact";
import { NumberCarousel, useNumberCarouselStore } from "./NumberCarousel";

export default {
  title: "Full Page Booking Form/Common/Inputs/Number Carousel",
  component: NumberCarousel,
};

const { setName, setValue, setQtyMaximum } = useNumberCarouselStore();
setName("Test");
setQtyMaximum(5);
setValue("2");

const Template = () => <NumberCarousel />;

export const Basic = Template.bind({});

export const Disabled = Template.bind({});
