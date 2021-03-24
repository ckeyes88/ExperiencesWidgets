/** @jsx h */
import { h } from "preact";
import { QuantitySelectionProps } from "../../Common/QuantitySelection";
import { OrderDetails, OrderDetailsProps } from "../OrderDetails";
import { Availability } from "../../../../typings/Availability";
import { FormFieldValueInput } from "../../../../typings/FormFieldValueInput";
import { CustomerInputData } from "../../../../typings/CustomerInput";
import { AppDictionary } from "../../../../typings/Languages";
import { OrderLineItemInputData } from "../../../../typings/OrderLineItemInput";
import {
  EventDBO,
  TaxStatus,
  PaymentType,
  OrderDetailsFormType,
  LanguageCode,
  FormFieldType,
} from "../../../../typings/Event";

export default {
  title: "Full Page Booking Form/Views/Order Details",
  component: OrderDetails,
  argTypes: {},
};

const Template = (args: OrderDetailsProps) => <OrderDetails {...args} />;

const defaultQuantitySelections: QuantitySelectionProps = {
  variants: [
    {
      name: "Adult",
      price: 150,
      currentQty: 0,
      qtyMaximum: 5,
      onDecreaseClick: () => {},
      onIncreaseClick: () => {},
      onChange: () => {},
      isDisabled: false,
    },
  ],
};

const defaultTimeslot: Availability = {
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

const defaultEvent: EventDBO = {
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

const defaultLabels: Partial<AppDictionary> = {
  firstNameLabel: "First",
  emailLabel: "Email",
  lastNameLabel: "Last",
  optionalFieldLabel: "Optional",
  confirmReservationButtonLabel: "Confirm & Reserve",
};

const defaultOrderLineItemData: OrderLineItemInputData = {
  customOrderDetailsValues: [],
  endsAt: new Date(2021, 1, 13, 13),
  eventVariantName: "Conquer Mount Storm King",
  quantity: 1,
  startsAt: new Date(2021, 1, 13, 11),
  timezone: "UTC",
};

const defaultArgs: OrderDetailsProps = {
  selectedDate: new Date(2021, 0, 13),
  selectedTimeslot: defaultTimeslot,
  event: defaultEvent,
  error: "",
  onAddCustomFormValues: async (
    variant,
    newCustomFormFieldValues: FormFieldValueInput[],
    index: number,
  ) => {
    return {};
  },
  onAddCustomerInfo: async (customerInfo: CustomerInputData) => {},
  onConfirmOrder: () => {},
  onClickBack: () => {},
  closeModal: () => {},
  lineItems: [defaultOrderLineItemData],
  labels: defaultLabels,
  isStorybookTest: {
    isSaveContinueDisabled: false,
  },
  quantitySelectionProps: defaultQuantitySelections,
  saveButtonState: "disabled",
  setSaveButtonState: () => {},
};

const disabledQuantitySelection: QuantitySelectionProps = {
  variants: {
    0: {
      name: "Adult",
      price: 150,
      currentQty: 0,
      qtyMaximum: 5,
      onDecreaseClick: () => {},
      onIncreaseClick: () => {},
      onChange: () => {},
      isDisabled: true,
    },
  },
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
  isStorybookTest: {
    isSaveContinueDisabled: false,
  },
};

export const CustomFormPerOrder = Template.bind({});
CustomFormPerOrder.args = {
  ...defaultArgs,
  quantitySelectionProps: disabledQuantitySelection,
  isStorybookTest: {
    isSaveContinueDisabled: true,
  },
  saveButtonState: "hidden",
};

export const CustomFormPerCustomer = Template.bind({});
CustomFormPerCustomer.args = {
  ...defaultArgs,
  quantitySelectionProps: disabledQuantitySelection,
  isStorybookTest: {
    isSaveContinueDisabled: true,
  },
  saveButtonState: "hidden",
  event: {
    ...defaultEvent,
    customOrderDetails: {
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
    },
  },
};
