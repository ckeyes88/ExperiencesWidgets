import { useEffect, useState } from "preact/hooks";
import moment from "moment-timezone";
import { Availability } from "../../../../typings/Availability";
import { FirstAvailability } from "../../../../typings/FirstAvailability";
import { getFirstAvailability } from "../../../../Utils/api";
import { unionAvailability } from "../../../../Utils/mergeAvailability";
import { useWidgetData } from "../../WidgetDataProvider";
import { equals } from "ramda";

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

  const [nextAvailabilites, setNextAvailabilities] = useState<
    FirstAvailability
  >({});
  const [isFetchingInitially, setFetchingInitially] = useState(true);
  const [isFetching, setFetching] = useState(false);
  const [isFetchingMoreFromList, setFetchingMoreFromList] = useState(false);
  const [fetchedMonths, setFetchedMonths] = useState<{
    [year: number]: number[];
  }>({});
  const [availabilities, setAvailabilities] = useState<FirstAvailability>({});
  const [timeslotsByDay, setTimeslotsByDay] = useState<
    Record<string, Availability[]>
  >({});
  const [lastDateFetched, setLastDateFetched] = useState(new Date());

  /**Concatenates next availabilities with current availabilities to add availabilites
   * to list.
   */
  const fetchMoreFromList = () => {
    setAvailabilities(unionAvailability(availabilities, nextAvailabilites));
    addTimeslots();
  };

  /**Determines if more availabilities are available to be fetched. */
  const hasMoreAvailabilites = async (): Promise<boolean> => {
    setFetchingMoreFromList(true);

    const result = await getFirstAvailability({
      baseUrl,
      productId: shopifyProductId,
      shopId: shopUrl,
      startingFrom: lastDateFetched,
      timespanInSeconds: TIMESPAN_IN_SECONDS,
    });

    const hasNewAvailabilites = !equals(result, availabilities);

    if (hasNewAvailabilites) {
      setNextAvailabilities(result);
      setFetchingMoreFromList(false);

      return true;
    }

    setFetchingMoreFromList(false);
    return false;
  };

  const addTimeslots = () => {
    const timeslotsToAdd: Availability[] = [];

    (function collectTimeslots<TData extends Record<string, any>>(data: TData) {
      Object.keys(data).forEach((key) => {
        const currentItem = data[key];

        if (!Array.isArray(currentItem)) {
          collectTimeslots(currentItem);
          return;
        }

        const timeslots = currentItem;

        timeslotsToAdd.push(...timeslots);

        const newDay = moment(timeslots[0].startsAt).startOf("day");

        addFetchedMonth(newDay.month() - 1, newDay.year());
        setLastDateFetched(new Date(timeslots[timeslots.length - 1].startsAt));
        setTimeslotsByDay((prev) => ({
          ...prev,
          [newDay.toJSON()]: timeslots,
        }));
      });
    })(availabilities);
  };

  const addFetchedMonth = (month: number, year: number) =>
    setFetchedMonths((prev) => {
      const existingFetchedMonths = prev[year];

      return {
        ...prev,
        [year]: !existingFetchedMonths?.length
          ? [month]
          : [...existingFetchedMonths, month],
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
    fetchMoreFromList,
    hasMoreAvailabilites,
    isFetchingInitialAvailabilities: isFetchingInitially,
    isFetchingMoreAvailabilities: isFetching,
    isFetchingMoreFromList,
  };
};
