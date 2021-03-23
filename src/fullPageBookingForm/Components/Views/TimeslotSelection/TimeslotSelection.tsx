/** @jsx h */
import { h, FunctionComponent, Fragment } from "preact";
import { BookingFormPage } from "../../../Typings/BookingFormPage";
import { Calendar } from "../../Common/Calendar";
import { useWizardModalAction } from "../../Common/WizardModal";
import { PageTitle } from "../../PageTitle";
import { TimeslotGroup } from "../../TimeslotGroup";
import "./TimeslotSelection.scss";

export const TimeslotSelection: FunctionComponent = () => {
  const { setPage } = useWizardModalAction();

  const handleSelect = () => {
    setPage(BookingFormPage.ORDER_DETAILS);
  };

  return (
    <Fragment>
      <PageTitle
        inlineWithThumbnail
        title="Conquer Mount Storm King"
        thumbnailSrc="https://f6d3w8j9.rocketcdn.me/wp-content/uploads/2019/09/Hiking-Packing-List.sq.jpg"
      />
      <div className="timeslot-selection">
        <div className="timeslot-selection__calendar">
          <Calendar date={new Date()} />
        </div>
        <div className="timeslot-selection__timeslot-list">
          <div className="timeslot-selection__timeslot-list__margin" />
          <TimeslotGroup
            timeslots={[
              {
                startsAt: new Date("March 17, 2021 06:00:00"),
                endsAt: new Date("March 17, 2021 10:00:00"),
                remainingSpots: 4,
                minPrice: 150,
                timezone: "Asia/Manila",
                onSelect: handleSelect,
              },
              {
                startsAt: new Date("March 17, 2021 11:30:00"),
                endsAt: new Date("March 17, 2021 12:00:00"),
                remainingSpots: 4,
                minPrice: 150,
                timezone: "Asia/Manila",
                onSelect: handleSelect,
              },
              {
                startsAt: new Date("March 17, 2021 14:30:00"),
                endsAt: new Date("March 17, 2021 16:30:00"),
                remainingSpots: 4,
                minPrice: 150,
                timezone: "Asia/Manila",
                onSelect: handleSelect,
              },
              {
                startsAt: new Date("March 17, 2021 16:30:00"),
                endsAt: new Date("March 17, 2021 18:30:00"),
                remainingSpots: 4,
                minPrice: 150,
                timezone: "Asia/Manila",
                onSelect: handleSelect,
              },
            ]}
          />
          <TimeslotGroup
            timeslots={[
              {
                startsAt: new Date("March 18, 2021 13:00:00"),
                endsAt: new Date("March 18, 2021 15:30:00"),
                remainingSpots: 4,
                minPrice: 150,
                timezone: "Asia/Manila",
                onSelect: handleSelect,
              },
              {
                startsAt: new Date("March 18, 2021 17:00:00"),
                endsAt: new Date("March 18, 2021 19:00:00"),
                remainingSpots: 4,
                minPrice: 150,
                timezone: "Asia/Manila",
                onSelect: handleSelect,
              },
            ]}
          />
          <TimeslotGroup
            timeslots={[
              {
                startsAt: new Date("March 19, 2021 06:00:00"),
                endsAt: new Date("March 19, 2021 10:00:00"),
                remainingSpots: 4,
                minPrice: 150,
                timezone: "Asia/Manila",
                onSelect: handleSelect,
              },
              {
                startsAt: new Date("March 19, 2021 11:30:00"),
                endsAt: new Date("March 19, 2021 12:00:00"),
                remainingSpots: 4,
                minPrice: 150,
                timezone: "Asia/Manila",
                onSelect: handleSelect,
              },
              {
                startsAt: new Date("March 19, 2021 14:30:00"),
                endsAt: new Date("March 19, 2021 16:30:00"),
                remainingSpots: 4,
                minPrice: 150,
                timezone: "Asia/Manila",
                onSelect: handleSelect,
              },
              {
                startsAt: new Date("March 19, 2021 16:30:00"),
                endsAt: new Date("March 19, 2021 18:30:00"),
                remainingSpots: 4,
                minPrice: 150,
                timezone: "Asia/Manila",
                onSelect: handleSelect,
              },
            ]}
          />
        </div>
      </div>
    </Fragment>
  );
};
