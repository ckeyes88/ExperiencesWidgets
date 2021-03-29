/** @jsx h */
import { h, FunctionComponent, Fragment } from "preact";
import { useState } from "preact/hooks";
import { BookingFormPage } from "../../../Typings/BookingFormPage";
import { getTimeslotsByDate } from "../../../../Utils/helpers";
import { Calendar } from "../../Common/Calendar";
import { BottomDrawer } from "../../Common/BottomDrawer";
import { TextStyle } from "../../Common/TextStyle";
import {
  useWizardModalAction,
  WizardModalTitleBar,
} from "../../Common/WizardModal";
import { EventTitle } from "../../EventTitle";
import { TimeslotGroup, TimeslotGroupSkeleton } from "../../TimeslotGroup";
import { CalendarIcon } from "./CalendarIcon";
import { useEvent } from "./useEvent";
import { useAvailabilities } from "./useAvailabilities";
import "./TimeslotSelection.scss";

export const TimeslotSelection: FunctionComponent = () => {
  const { setPage, close } = useWizardModalAction();
  const [calendarDrawerOpen, setCalendarOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const { isFetchingEvent, event } = useEvent();
  const {
    isFetchingInitialAvailabilities,
    isFetchingMoreAvailabilities,
    availabilities,
  } = useAvailabilities({
    date: currentDate,
    month: currentMonth,
    year: currentYear,
  });

  const handleSelect = () => {
    setPage(BookingFormPage.ORDER_DETAILS);
  };

  const handleClose = () => {
    close();
  };

  const handleCalendarDrawerToggle = () => setCalendarOpen((prev) => !prev);

  const handleDateChange = (date: Date) => setCurrentDate(date);

  const handleMonthChange = (month: number) => setCurrentMonth(month);

  const handleYearChange = (year: number) => setCurrentYear(year);

  const dateIsDisabled = (date: Date) => {
    const timeslots = getTimeslotsByDate(availabilities, date);
    const disabled = !timeslots.length;

    return disabled;
  };

  const calendar = (
    <Calendar
      date={currentDate}
      dateIsDisabled={dateIsDisabled}
      loading={isFetchingInitialAvailabilities || isFetchingMoreAvailabilities}
      onDateChange={handleDateChange}
      onMonthChange={handleMonthChange}
      onYearChange={handleYearChange}
    />
  );

  return (
    <Fragment>
      <WizardModalTitleBar title="Select dates" onBack={handleClose}>
        {!isFetchingEvent && (
          <button
            className="timeslot-selection__calendar-button"
            onClick={handleCalendarDrawerToggle}
          >
            <CalendarIcon />
          </button>
        )}
      </WizardModalTitleBar>
      {isFetchingEvent ? (
        <div style={{ textAlign: "center" }}>
          <TextStyle variant="display2" text="Loading experience data..." />
        </div>
      ) : (
        <Fragment>
          <EventTitle
            inlineWithThumbnail
            title={event.name}
            thumbnailSrc={event.featuredImageUrl}
          />
          <div className="timeslot-selection">
            <div className="timeslot-selection__calendar">{calendar}</div>
            <BottomDrawer
              open={calendarDrawerOpen}
              onClose={handleCalendarDrawerToggle}
            >
              {calendar}
            </BottomDrawer>
            <div className="timeslot-selection__timeslot-list">
              <div className="timeslot-selection__timeslot-list__margin" />
              {isFetchingInitialAvailabilities ? (
                <Fragment>
                  <TimeslotGroupSkeleton length={4} />
                  <TimeslotGroupSkeleton length={2} />
                </Fragment>
              ) : (
                <Fragment>
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
                </Fragment>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
