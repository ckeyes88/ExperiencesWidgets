/** @jsx h */
import { h, FunctionComponent } from "preact";
import moment from "moment-timezone";
import { TextStyle } from "../Common/TextStyle";
import { TimeslotCard, TimeslotCardProps } from "../TimeslotCard";
import "./TimeslotGroup.scss";
import { useEffect, useRef, useState } from "preact/hooks";

export type TimeslotGroup = {
  timeslots: TimeslotCardProps[];
  lang: string;
  setActiveTimeslot: (startsAt: Date) => void;
  setTimeslotLocations: (timeslot: Date, element: HTMLDivElement) => void;
};

export const TimeslotGroup: FunctionComponent<TimeslotGroup> = ({
  lang,
  timeslots,
  setActiveTimeslot,
  setTimeslotLocations,
}) => {
  const ref = useRef<HTMLDivElement>();
  const [currentY, setCurrentY] = useState(0);
  const { startsAt, timezone } = timeslots[0];
  const formattedDayText = moment(startsAt)
    .tz(timezone)
    .locale(lang)
    .format("dddd, MMMM D");

  useEffect(() => {
    const onScroll = () => {
      const currentY = ref.current?.getBoundingClientRect().y;
      setCurrentY(currentY);

      if (
        currentY >= window.innerHeight / 2 - ref.current.offsetHeight / 2 - 2 &&
        currentY < window.innerHeight / 2
      ) {
        setActiveTimeslot(startsAt);
      }
    };
    window.addEventListener("scroll", onScroll, true);

    return () => window.removeEventListener("scroll", onScroll, true);
  }, [currentY, ref]);

  useEffect(() => {
    if (ref.current) {
      setTimeslotLocations(startsAt, ref.current);
    }
  }, [ref]);

  return (
    <div className="timeslot-group" ref={ref}>
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
