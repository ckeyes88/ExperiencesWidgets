import { useEffect, useState } from "preact/hooks";
import { FirstAvailability } from "../../../../typings/FirstAvailability";
import { getFirstAvailability } from "../../../../Utils/api";
import { unionAvailability } from "../../../../Utils/mergeAvailability";
import { useWidgetData } from "../../WidgetDataProvider";

const TIMESPAN_IN_SECONDS = 32 * 24 * 60 * 60;

export const useAvailabilities = (date: Date) => {
  const { baseUrl, shopUrl, shopifyProductId } = useWidgetData();

  const [isFetching, setFetching] = useState(false);
  const [availabilities, setAvailabilities] = useState<FirstAvailability>({});

  useEffect(() => {
    const fetchAvailabilities = async () => {
      setFetching(true);

      const startingFrom =
        new Date().getTime() >= date.getTime() ? new Date() : date;

      const result = await getFirstAvailability({
        baseUrl,
        productId: shopifyProductId,
        shopId: shopUrl,
        startingFrom,
        timespanInSeconds: TIMESPAN_IN_SECONDS,
      });

      setAvailabilities(unionAvailability(availabilities, result));
      setFetching(false);
    };

    fetchAvailabilities();
  }, [date.getTime()]);

  return {
    availabilities,
    isFetchingAvailabilities: isFetching,
  };
};
