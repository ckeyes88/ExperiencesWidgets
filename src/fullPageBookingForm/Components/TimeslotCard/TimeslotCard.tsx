/** @jsx h */
import { h, FunctionComponent, Fragment } from "preact";
import moment from "moment-timezone";
import { Button } from "../Common/Button";
import { Card } from "../Common/Card";
import { TextStyle } from "../Common/TextStyle";
import "./TimeslotCard.scss";
import { formatCurrency } from "../../../Utils/helpers";
import { AppDictionary } from "../../../typings/Languages";

export type TimeslotCardProps = {
  startsAt: Date;
  endsAt: Date;
  timezone: string;
  remainingSpots: number;
  minPrice: number;
  onSelect: () => void;
  moneyFormat: string;
  labels: Partial<AppDictionary>;
};

export const TimeslotCard: FunctionComponent<TimeslotCardProps> = ({
  startsAt,
  endsAt,
  timezone,
  remainingSpots,
  minPrice,
  moneyFormat,
  onSelect,
  labels,
}) => {
  const formattedStartsAt = moment(startsAt).tz(timezone).format("h:mma");
  const formattedEndsAt = moment(endsAt).tz(timezone).format("h:mma");

  let timeslotClassNames = ["timeslot-card"];

  if (remainingSpots === 0) {
    timeslotClassNames.push("timeslot-card--is-disabled");
  }

  return (
    <Card>
      <div className={timeslotClassNames.join(" ")} data-testid="timeslot-card">
        <div className="timeslot-card__details">
          <div className="timeslot-card__details__time">
            <TextStyle
              variant="body1"
              text={
                <Fragment>
                  {formattedStartsAt} &ndash; {formattedEndsAt} |{" "}
                </Fragment>
              }
            />
            <TextStyle
              variant="body3"
              text={`${remainingSpots} ${
                labels.spotsLeftLabel ? labels.spotsLeftLabel : "spots left"
              }`}
            />
          </div>
          <div className="timeslot-card__details__pricing">
            <TextStyle
              variant="display1"
              text={
                minPrice
                  ? `From ${formatCurrency(moneyFormat, minPrice)}`
                  : "Free"
              }
            />
            <TextStyle
              variant="body1"
              text={` | ${
                labels.singularUnitLabel ? labels.singularUnitLabel : "person"
              }`}
            />
          </div>
        </div>
        <div className="timeslot-card__button">
          <Button
            color={remainingSpots === 0 ? "grayed" : "primary"}
            text={
              remainingSpots === 0
                ? `${labels.soldOutLabel ? labels.soldOutLabel : "Sold Out"}`
                : `${
                    labels.selectDateLabel ? labels.selectDateLabel : "Select"
                  }`
            }
            onClick={onSelect}
            disabled={remainingSpots === 0}
          />
        </div>
      </div>
    </Card>
  );
};
