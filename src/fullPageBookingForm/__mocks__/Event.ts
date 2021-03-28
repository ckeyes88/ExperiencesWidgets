import {
  EventDBO,
  OrderDetailsFormType,
  LanguageCode,
  PaymentType,
  TaxStatus,
  CustomOrderDetailsDBO,
  FormFieldType,
} from "../../typings/Event";
import { Availability } from "../../typings/Availability";
import { AppDictionary } from "../../typings/Languages";
import { OrderLineItemInputData } from "../../typings/OrderLineItemInput";
import { QuantitySelectionProps } from "../Components/Common/QuantitySelection";
import { OrderDetailsProps } from "../Components/Views/OrderDetails";

export const defaultQuantitySelections: QuantitySelectionProps = {
  variants: [
    {
      name: "Adult",
      price: 150,
      currentQty: 0,
      qtyMaximum: 5,

      isDisabled: false,
    },
  ],
  onDecreaseClick: () => {},
  onIncreaseClick: () => {},
  onChange: () => {},
};

export const defaultTimeslot: Availability = {
  endsAt: new Date(2021, 1, 13, 13),
  startsAt: new Date(2021, 1, 13, 11),
  productId: "0",
  totalUnits: 5,
  unitsLeft: 4,
  timezone: "UTC",
  formattedTimeslot: {
    time: "11:00am-1:00pm",
    dateStamp: "Date Stamp",
    date: "",
    isoWithoutTZ: "",
    when: "When",
  },
};

export const defaultEvent: EventDBO = {
  _id: "0",
  confirmationEmailTemplateId: {
    toHexString: () => "0",
    toString: () => "0",
  },
  orderCancelledEmailTemplateId: {
    toHexString: () => "0",
    toString: () => "0",
  },
  orderUpdatedEmailTemplateId: {
    toHexString: () => "0",
    toString: () => "0",
  },
  reminderEmailTemplateId: {
    toHexString: () => "0",
    toString: () => "0",
  },
  archivedAt: null,
  createdAt: new Date(2021, 1, 1),
  customOrderDetails: {
    formType: OrderDetailsFormType.None,
    formTitle: "Additional Details",
    formDescription: "Add some details.",
    fields: [],
  },
  description: "Hike mount storm king.",
  handle: "handle",
  images: [],
  languageCode: LanguageCode.EnglishUS,
  maxLimit: 5,
  minLimit: 0,
  name: "Conquer Mount Storm King",
  paymentType: PaymentType.Free,
  publishedAt: new Date(2021, 1, 2),
  shopId: {
    toHexString: () => "0",
    toString: () => "0",
  },
  shopifyProductId: 0,
  shopifyShopId: 0,
  summary: "Climb mount storm king.",
  tags: [],
  taxStatus: TaxStatus.NoTax,
  updatedAt: new Date(2021, 1, 2),
  variants: [
    {
      name: "Child",
      price: 50,
    },
  ],
  ticketedEvent: true,
  ticketTemplateId: null,
};

export const defaultLabels: Partial<AppDictionary> = {
  firstNameLabel: "First",
  emailLabel: "Email",
  lastNameLabel: "Last",
  optionalFieldLabel: "Optional",
  confirmReservationButtonLabel: "Confirm & Reserve",
};

export const defaultOrderLineItemData: OrderLineItemInputData = {
  customOrderDetailsValues: [],
  endsAt: new Date(2021, 1, 13, 13),
  eventVariantName: "Conquer Mount Storm King",
  quantity: 1,
  startsAt: new Date(2021, 1, 13, 11),
  timezone: "UTC",
};

export const defaultArgs: OrderDetailsProps = {
  selectedDate: new Date(2021, 0, 13),
  selectedTimeslot: defaultTimeslot,
  event: defaultEvent,
  error: "",
  labels: defaultLabels,
};

export const defaultPerOrderCustomerDetails: CustomOrderDetailsDBO = {
  formType: OrderDetailsFormType.PerOrder,
  formTitle: "Additional Details",
  formDescription: "Add some details.",
  fields: [
    {
      label: "Snack type",
      required: true,
      type: FormFieldType.Text,
    },
  ],
};

export const defaultPerAttendeeCustomerDetails: CustomOrderDetailsDBO = {
  formType: OrderDetailsFormType.PerAttendee,
  formTitle: "Additional Details",
  formDescription: "Add some details.",
  fields: [
    {
      label: "Snack type",
      required: true,
      type: FormFieldType.Text,
    },
  ],
};
