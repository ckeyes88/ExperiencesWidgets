import { useEffect, useState } from "preact/hooks";
import moment from "moment-timezone";
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

  return {
    availabilities,
    isFetchingInitialAvailabilities: isFetchingInitially,
    isFetchingMoreAvailabilities: isFetching,
  };
};
