/** @jsx h */
import { h } from "preact";
import { TimeslotCard, TimeslotCardProps } from "./TimeslotCard";

export default {
  title: "Full Page Booking Form/App/Timeslot Card",
  component: TimeslotCard,
};

const Template = (args: TimeslotCardProps) => (
  <div style={{ width: 460 }}>
    <TimeslotCard {...args} />
  </div>
);

const defaultArgs: TimeslotCardProps = {
  startsAt: new Date("March 17, 2021 06:00:00"),
  endsAt: new Date("March 17, 2021 10:00:00"),
  remainingSpots: 4,
  minPrice: 150,
  timezone: "Asia/Manila",
  onSelect: () => {},
};

export const Basic = Template.bind({});
Basic.args = {
  ...defaultArgs,
};
