import { addToCart, createOrder, AddToCartArgs } from "../../Utils/api";
import { OrderLineItemInputData } from "../../typings/OrderLineItemInput";
import { useWidgetData } from "../Components/WidgetDataProvider";
import { OrderDetailsFormType } from "../../typings/Event";
import { AttendeeInputData } from "../../typings/AttendeeInput";
import { useCustomerFormStore } from "./useCustomerFormStore";
import { useCustomFormStore } from "./useCustomFormStore";
import { useEventStore } from "./useEventStore";
import { useQtySelectionStore } from "./useQtySelectionStore";
import { useTimeslotStore } from "./useTimeslotStore";

export const useCreateNonPrepayOrder = () => {
  const { shopUrl, baseUrl } = useWidgetData();
  const customer = useCustomerFormStore((state) => state.customerData);
  const customFormValues = useCustomFormStore(
    (state) => state.customFormValues,
  );
  const variants = useQtySelectionStore((state) => state.variants);
  const event = useEventStore((state) => state.event);
  const timeslot = useTimeslotStore((state) => state.selectedTimeslot);

  const { _id: eventId, shopifyProductId, customOrderDetails } = event;
  const isPerAttendee =
    customOrderDetails.formType === OrderDetailsFormType.PerAttendee;

  const { timeslotId, startsAt, endsAt, timezone } = timeslot;

  const filteredVariants = variants.filter(({ currentQty }) => !!currentQty);

  const createNonPrepayOrder = () => {
    const baseLineItems = filteredVariants.reduce<
      { variantName: string; quantity: number; shopifyVariantId: number }[]
    >(
      (currentItems, { name, currentQty, shopifyVariantId }) => [
        ...currentItems,
        ...Array.from({ length: currentQty }).map(() => ({
          shopifyVariantId,
          variantName: name,
          quantity: 1,
        })),
      ],
      [],
    );

    const lineItems = baseLineItems.map<OrderLineItemInputData>(
      (baseLineItem, i) => {
        const { variantName, shopifyVariantId } = baseLineItem;

        let customFields = customFormValues[0].fields;
        let attendee: AttendeeInputData;

        if (isPerAttendee) {
          const [
            { value: firstName },
            { value: lastName },
            { value: email },
            ...restFields
          ] = customFormValues[i].fields;

          attendee = {
            checkedInAt: null,
            info: {
              name: `${firstName} ${lastName}`,
              email: email,
            },
          };

          customFields = restFields;
        }

        return {
          eventId,
          timeslotId,
          startsAt,
          endsAt,
          timezone,
          attendee,
          eventVariantName: variantName,
          productId: shopifyProductId,
          productVariantId: shopifyVariantId,
          quantity: baseLineItem.quantity,
          customOrderDetailsValues: customFields.map(({ label, value }) => ({
            label,
            value,
          })),
        };
      },
    );

    return createOrder({
      baseUrl,
      shopId: shopUrl,
      order: {
        lineItems,
        customer: {
          email: customer.email,
          firstName: customer.firstName,
          lastName: customer.lastName,
        },
      },
    });
  };

  return createNonPrepayOrder;
};

export const useAddOrderToCart = () => {
  const customFormValues = useCustomFormStore(
    (state) => state.customFormValues,
  );
  const variants = useQtySelectionStore((state) => state.variants);
  const event = useEventStore((state) => state.event);
  const timeslot = useTimeslotStore((state) => state.selectedTimeslot);

  const { customOrderDetails } = event;
  const isPerAttendee =
    customOrderDetails.formType === OrderDetailsFormType.PerAttendee;
  const isPerOrder =
    customOrderDetails.formType === OrderDetailsFormType.PerOrder;

  const filteredVariants = variants.filter(({ currentQty }) => !!currentQty);

  const addOrderToCart = () => {
    const quantities: AddToCartArgs["quantities"] = filteredVariants.reduce(
      (currentMap, { shopifyVariantId, currentQty }) => {
        currentMap[shopifyVariantId] = currentQty;
        return currentMap;
      },
      {} as AddToCartArgs["quantities"],
    );

    const fields: AddToCartArgs["fields"] = !isPerOrder
      ? undefined
      : customFormValues[0].fields.map(({ label, value }) => ({
          label,
          value,
        }));

    const attendees: AddToCartArgs["attendees"] = !isPerAttendee
      ? undefined
      : filteredVariants.reduce<AddToCartArgs["attendees"]>(
          (currentItems, { currentQty, shopifyVariantId }, variantIndex) => [
            ...currentItems,
            ...Array.from({ length: currentQty }).map((_, attendeeIndex) => {
              const customFieldIndex = variantIndex + attendeeIndex;
              const customFields = customFormValues[customFieldIndex].fields;
              const [
                { value: firstName },
                { value: lastName },
                { value: email },
              ] = customFields;

              return {
                firstName,
                lastName,
                email,
                fields: customFields.map(({ label, value }) => ({
                  label,
                  value,
                })),
                variantId: shopifyVariantId,
              };
            }),
          ],
          [],
        );

    const order: AddToCartArgs = {
      timeslot,
      quantities,
      fields,
      attendees,
    };

    return addToCart(order, {
      event,
      onCartAdd: (url) => {
        window.location.href = url || "/cart";
      },
    });
  };

  return addOrderToCart;
};
