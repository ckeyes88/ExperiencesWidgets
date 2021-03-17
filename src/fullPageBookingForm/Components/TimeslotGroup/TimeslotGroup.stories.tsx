/** @jsx h */
import { h } from "preact";
import { TimeslotGroup } from "./TimeslotGroup";

export default {
  title: "Full Page Booking Form/App/TimeslotGroup",
  component: TimeslotGroup,
};

export const Basic = () => (
  <div style={{ width: 460 }}>
    <TimeslotGroup
      timeslots={[
        {
          startsAt: new Date("March 17, 2021 06:00:00"),
          endsAt: new Date("March 17, 2021 10:00:00"),
          remainingSpots: 4,
          minPrice: 150,
          timezone: "Asia/Manila",
          onSelect: () => {},
        },
        {
          startsAt: new Date("March 17, 2021 11:30:00"),
          endsAt: new Date("March 17, 2021 12:00:00"),
          remainingSpots: 4,
          minPrice: 150,
          timezone: "Asia/Manila",
          onSelect: () => {},
        },
        {
          startsAt: new Date("March 17, 2021 14:30:00"),
          endsAt: new Date("March 17, 2021 16:30:00"),
          remainingSpots: 4,
          minPrice: 150,
          timezone: "Asia/Manila",
          onSelect: () => {},
        },
      ]}
    />
  </div>
);
