import { useEffect, useState } from "preact/hooks";
import { EventDBO } from "../../../../typings/Event";
import { getEvent } from "../../../../Utils/api";
import { useWidgetData } from "../../WidgetDataProvider";

export const useEvent = () => {
  const { baseUrl, shopUrl, shopifyProductId } = useWidgetData();
  const [isLoading, setLoading] = useState(true);
  const [event, setEvent] = useState<EventDBO | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      const result = await getEvent({
        baseUrl,
        shopifyProductId,
        shopId: shopUrl,
      });

      setEvent(result.data);
      setLoading(false);
    };

    fetchEvent();
  }, []);

  return {
    event,
    isFetchingEvent: isLoading,
  };
};
