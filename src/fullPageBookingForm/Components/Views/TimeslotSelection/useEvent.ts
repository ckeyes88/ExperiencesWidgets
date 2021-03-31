import { useEffect, useState } from "preact/hooks";
import { EventDBO } from "../../../../typings/Event";
import { getEvent } from "../../../../Utils/api";
import { useEventStore } from "../../../Hooks/useEventStore";
import { useWidgetData } from "../../WidgetDataProvider";

export const useEvent = () => {
  const setEventInStore = useEventStore((state) => state.setEvent);
  const { baseUrl, shopUrl, shopifyProductId } = useWidgetData();
  const [isLoading, setLoading] = useState(true);
  const [event, setEvent] = useState<EventDBO | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      const { data: event } = await getEvent({
        baseUrl,
        shopifyProductId,
        shopId: shopUrl,
      });

      setEvent(event);
      setEventInStore(event);
      setLoading(false);
    };

    fetchEvent();
  }, []);

  return {
    event,
    isFetchingEvent: isLoading,
  };
};
