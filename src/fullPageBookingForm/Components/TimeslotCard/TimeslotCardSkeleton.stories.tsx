/** @jsx h */
import { h } from "preact";
import { TimeslotCardSkeleton } from "./TimeslotCardSkeleton";

export default {
  title: "Full Page Booking Form/App/Timeslot Card Skeleton",
  component: TimeslotCardSkeleton,
};

export const Basic = () => (
  <div style={{ width: 460 }}>
    <TimeslotCardSkeleton />
  </div>
);
