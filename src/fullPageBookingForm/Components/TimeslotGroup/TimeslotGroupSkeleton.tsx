/** @jsx h */
import { h, FunctionComponent } from "preact";
import { Skeleton } from "../Common/Skeleton";
import { TimeslotCardSkeleton } from "../TimeslotCard";
import "./TimeslotGroup.scss";

export type TimeslotGroupSkeletonProps = {
  length: number;
};

export const TimeslotGroupSkeleton: FunctionComponent<TimeslotGroupSkeletonProps> = ({
  length,
}) => (
  <div className="timeslot-group">
    <div className="timeslot-group__header">
      <Skeleton variant="display" />
    </div>
    <div className="timeslot-group__list">
      {Array.from({ length }).map((_, i) => (
        <TimeslotCardSkeleton key={i} />
      ))}
    </div>
  </div>
);
