/** @jsx h */
import { h, FunctionComponent } from "preact";
import { Card } from "../Common/Card";
import { Skeleton } from "../Common/Skeleton";
import "./TimeslotCard.scss";

export const TimeslotCardSkeleton: FunctionComponent = () => (
  <Card>
    <div
      className="timeslot-card timeslot-card--loading"
      data-testid="timeslot-card"
    >
      <div className="timeslot-card__details">
        <div className="timeslot-card__details__time">
          <Skeleton variant="body" />
        </div>
        <div className="timeslot-card__details__pricing">
          <Skeleton variant="body" width="70%" />
        </div>
      </div>
      <div className="timeslot-card__button">
        <Skeleton variant="button" />
      </div>
    </div>
  </Card>
);
