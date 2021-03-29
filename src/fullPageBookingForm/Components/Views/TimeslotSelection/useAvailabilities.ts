import { useEffect, useState } from "preact/hooks";
import moment from "moment-timezone";
import { Availability } from "../../../../typings/Availability";
import { FirstAvailability } from "../../../../typings/FirstAvailability";
import { getFirstAvailability } from "../../../../Utils/api";
import { unionAvailability } from "../../../../Utils/mergeAvailability";
import { useWidgetData } from "../../WidgetDataProvider";

const TIMESPAN_IN_SECONDS = 32 * 24 * 60 * 60;

export const useAvailabilities = ({
  date,
  month,
  year,
}: {
  date: Date;
  month: number;
  year: number;
}) => {
  const { baseUrl, shopUrl, shopifyProductId } = useWidgetData();

  const [isFetchingInitially, setFetchingInitially] = useState(true);
  const [isFetching, setFetching] = useState(false);
  const [fetchedMonths, setFetchedMonths] = useState<{
    [year: number]: number[];
  }>({});
  const [availabilities, setAvailabilities] = useState<FirstAvailability>({});
  const [timeslotsByDay, setTimeslotsByDay] = useState<
    Record<string, Availability[]>
  >({});

  const addTimeslots = () => {
    let numOfDaysAdded = 0;
    const timeslotsToAdd: Availability[] = [];

    try {
      Object.keys(availabilities).forEach((year) => {
        Object.keys(availabilities[year]).forEach((month) => {
          Object.keys(availabilities[year][month]).forEach((week) => {
            Object.keys(availabilities[year][month][week]).forEach((day) => {
              const timeslots = availabilities[year][month][week][day];

              timeslotsToAdd.push(...timeslots);

              numOfDaysAdded += 1;

              const newDay = moment(timeslots[0].startsAt)
                .startOf("day")
                .toJSON();

              setTimeslotsByDay((prev) => ({
                ...prev,
                [newDay]: timeslots,
              }));

              if (numOfDaysAdded === 10) {
                throw new Error("Reached 10 days of timeslots");
              }
            });
          });
        });
      });
    } catch {}
  };

  const addFetchedMonth = (month: number, year: number) =>
    setFetchedMonths((prev) => {
      let newYear: number[] = [];

      if (!fetchedMonths[year]) {
        newYear = [month];
      } else {
        newYear = [...fetchedMonths[year], month];
      }

      return {
        ...prev,
        [year]: newYear,
      };
    });

  const monthWasFetched = (month: number, year: number) =>
    fetchedMonths[year] && fetchedMonths[year].includes(month);

  useEffect(() => {
    const fetchAvailabilities = async () => {
      if (monthWasFetched(month, year)) {
        return;
      }

      setFetching(true);

      const finalDate = moment(date)
        .set("month", month)
        .set("year", year)
        .startOf("month")
        .toDate();

      const startingFrom =
        new Date().getTime() >= finalDate.getTime() ? new Date() : finalDate;

      const result = await getFirstAvailability({
        baseUrl,
        productId: shopifyProductId,
        shopId: shopUrl,
        startingFrom,
        timespanInSeconds: TIMESPAN_IN_SECONDS,
      });

      setAvailabilities(unionAvailability(availabilities, result));

      setFetching(false);

      addFetchedMonth(month, year);

      setFetchingInitially(false);
    };

    fetchAvailabilities();
  }, [date.getTime(), month]);

  useEffect(() => {
    if (!isFetching) {
      addTimeslots();
    }
  }, [isFetching]);

  return {
    availabilities,
    timeslotsByDay,
    isFetchingInitialAvailabilities: isFetchingInitially,
    isFetchingMoreAvailabilities: isFetching,
  };
};
