/** @jsx h */
import { h } from "preact";
import { CalendarSkeleton } from "./CalendarSkeleton";

export default {
  title: "Full Page Booking Form/Common/Calendar Skeleton",
  component: CalendarSkeleton,
};

const Template = () => <CalendarSkeleton />;

export const Basic = Template.bind({});
