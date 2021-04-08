/** @jsx h */
import { h, FunctionComponent } from "preact";
import moment from "moment-timezone";
import { Button } from "../Common/Button";
import { Card } from "../Common/Card";
import { TextStyle } from "../Common/TextStyle";
import "./TimeslotCard.scss";

export type TimeslotCardProps = {
  startsAt: Date;
  endsAt: Date;
  timezone: string;
  remainingSpots: number;
  minPrice: number;
  onSelect: () => void;
};

export const TimeslotCard: FunctionComponent<TimeslotCardProps> = ({
  startsAt,
  endsAt,
  timezone,
  remainingSpots,
  minPrice,
  onSelect,
}) => {
  const formattedStartsAt = moment(startsAt).tz(timezone).format("h:mma");
  const formattedEndsAt = moment(endsAt).tz(timezone).format("h:mma");

  return (
    <Card>
      <div className="timeslot-card" data-testid="timeslot-card">
        <div className="timeslot-card__details">
          <div className="timeslot-card__details__time">
            <TextStyle
              variant="body1"
              text={`${formattedStartsAt} - ${formattedEndsAt} | `}
            />
            <TextStyle variant="body3" text={`${remainingSpots} spots left`} />
          </div>
          <div className="timeslot-card__details__pricing">
            <TextStyle variant="display1" text={`From $${minPrice}`} />
            <TextStyle variant="body1" text=" / person" />
          </div>
        </div>
        <div className="timeslot-card__button">
          <Button color="primary" text="Select" onClick={onSelect} />
        </div>
      </div>
    </Card>
  );
};
