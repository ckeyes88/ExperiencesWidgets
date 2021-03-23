/** @jsx h */
import { h } from "preact";
import { Calendar } from "./Calendar";

export default {
  title: "Full Page Booking Form/Common/Calendar",
  component: Calendar,
};

export const Basic = () => (
  <div style={{ width: 300 }}>
    <Calendar
      month={2}
      year={2021}
      date={new Date("March 26, 2021 06:00:00")}
    />
  </div>
);
