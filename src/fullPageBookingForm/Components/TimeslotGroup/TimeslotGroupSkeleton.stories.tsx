/** @jsx h */
import { h } from "preact";
import {
  TimeslotGroupSkeleton,
  TimeslotGroupSkeletonProps,
} from "./TimeslotGroupSkeleton";

export default {
  title: "Full Page Booking Form/App/Timeslot Group Skeleton",
  component: TimeslotGroupSkeleton,
};

const Template = (args: TimeslotGroupSkeletonProps) => (
  <div style={{ width: 460 }}>
    <TimeslotGroupSkeleton {...args} />
  </div>
);

export const Basic = Template.bind({});
Basic.args = {
  length: 3,
};
