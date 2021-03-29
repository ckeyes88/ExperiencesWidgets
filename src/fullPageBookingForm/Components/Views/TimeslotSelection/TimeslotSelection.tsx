/** @jsx h */
import { h, FunctionComponent, Fragment } from "preact";
import { useEffect, useState, useMemo } from "preact/hooks";
import { Availability } from "../../../../typings/Availability";
import { getTimeslotsByDate } from "../../../../Utils/helpers";
import { BookingFormPage } from "../../../Typings/BookingFormPage";
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
    timeslotsByDay,
  } = useAvailabilities({
    date: currentDate,
    month: currentMonth,
    year: currentYear,
  });

  useEffect(() => {
    if (Object.keys(timeslotsByDay)[0]) {
      console.log("new date", Object.keys(timeslotsByDay)[0]);
      setCurrentDate(new Date(Object.keys(timeslotsByDay)[0]));
    }
  }, [Object.keys(timeslotsByDay)[0]]);

  const handleTimeslotSelect = (timeslot: Availability) => {
    alert(JSON.stringify(timeslot, null, 2));
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

  const minPrice = useMemo(
    () => event?.variants?.map(({ price }) => price).sort()[0],
    [isFetchingEvent],
  );

  const renderTimeslots = () => {
    if (isFetchingInitialAvailabilities) {
      return null;
    }

    return Object.keys(timeslotsByDay).map((date) => (
      <TimeslotGroup
        key={date}
        timeslots={timeslotsByDay[date].map((timeslot) => {
          const handleSelect = () => handleTimeslotSelect(timeslot);

          return {
            minPrice,
            startsAt: new Date(timeslot.startsAt),
            endsAt: new Date(timeslot.endsAt),
            remainingSpots: timeslot.unitsLeft,
            timezone: timeslot.timezone,
            onSelect: handleSelect,
          };
        })}
      />
    ));
  };

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
                <Fragment>{renderTimeslots()}</Fragment>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
