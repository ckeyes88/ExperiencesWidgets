/** @jsx h */
import { h, FunctionComponent } from "preact";
import moment from "moment-timezone";
import { TextStyle } from "../Common/TextStyle";
import { TimeslotCard, TimeslotCardProps } from "../TimeslotCard";
import "./TimeslotGroup.scss";

export type TimeslotGroup = {
  timeslots: TimeslotCardProps[];
};

export const TimeslotGroup: FunctionComponent<TimeslotGroup> = ({
  timeslots,
}) => {
  const { startsAt, timezone } = timeslots[0];
  const formattedDayText = moment(startsAt).tz(timezone).format("dddd, MMMM D");

  return (
    <div className="timeslot-group">
      <div className="timeslot-group__header">
        <TextStyle variant="display2" text={formattedDayText} />
      </div>
      <div className="timeslot-group__list">
        {timeslots.map((timeslot) => (
          <TimeslotCard key={timeslot.startsAt.getTime()} {...timeslot} />
        ))}
      </div>
    </div>
  );
};
