/** @jsx h */
import { h, FunctionComponent } from "preact";
import { useState } from "preact/hooks";
import { Availability } from "../../../../typings/Availability";
import { CustomerInputData } from "../../../../typings/CustomerInput";
import {
  EventDBO,
  EventVariantDBO,
  PaymentType,
} from "../../../../typings/Event";
import { FormFieldValueInput } from "../../../../typings/FormFieldValueInput";
import { AppDictionary } from "../../../../typings/Languages";
import { OrderLineItemInputData } from "../../../../typings/OrderLineItemInput";
import { BookingFormPage } from "../../../Typings/BookingFormPage";
import { Button } from "../../Common/Button";
import { Form, FormProps } from "../../Common/Form";
import {
  QuantitySelection,
  QuantitySelectionProps,
} from "../../Common/QuantitySelection";
import { TextStyle } from "../../Common/TextStyle";
import { useWizardModalAction } from "../../Common/WizardModal";
import "./OrderDetails.scss";

export type OrderDetailsProps = {
  /** This is the date that the user has selected for the order */
  selectedDate: Date;
  /** This is the timeslot that the user has selected for the order */
  selectedTimeslot: Availability;
  /** This is the event for which the order is being created */
  event: EventDBO;
  /** Any errors that should be displayed on the form */
  error: string;
  /** This is the customer info, if it is needed and has been inputted */
  customerInfo?: CustomerInputData;
  /** Method passed in and triggered upon submission of a custom form, passes values up to the top level */
  onAddCustomFormValues(
    variant: EventVariantDBO,
    newCustomFormFieldValues?: FormFieldValueInput[],
    index?: number,
  ): Promise<any>;
  /** Method passed in and triggered upon submission of customer info, passes values up to the top level */
  onAddCustomerInfo(customerInfo: CustomerInputData): Promise<any>;
  /** Method passed in to trigger upon confirmation of order */
  onConfirmOrder(): void;
  /** Method passed in to trigger a click back */
  onClickBack(): void;
  /** Method passed in to trigger a close modal */
  closeModal(): void;
  /** Array of line item objects, used to create the order upon confirmation */
  lineItems: OrderLineItemInputData[];
  /** Event custom labels set in admin experience interface */
  labels: Partial<AppDictionary>;
  /**Whether this view is being tested in storybook or not. */
  isStorybookTest?: boolean;
  /**Quantity selection props. */
  quantitySelectionProps: QuantitySelectionProps;
};

export const OrderDetails: FunctionComponent<OrderDetailsProps> = ({
  event,
  selectedTimeslot,
  selectedDate,
  isStorybookTest,
  quantitySelectionProps,
  customerInfo,
  onAddCustomerInfo,
}) => {
  const [isSaveContinueDisabled, setIsSaveContinueDisabled] = useState(true);

  //Define set page function, with stub if testing.
  let setPage = isStorybookTest
    ? (temp: number) => {}
    : useWizardModalAction().setPage;

  //Calculate minimum cost of the event.
  const minCost = Math.min(...event.variants.map((variant) => variant.price));

  //If required by event type, render customer form.
  const renderCustomerForm: FunctionComponent<typeof customerInfo> = (
    customerInfo,
  ) => {
    const formProps: FormProps = {
      title: "Customer Info",
      fields: [
        {
          label: "Email",
          value: customerInfo.email,
          type: "Email",
        },
        {
          label: "First",
          value: customerInfo.firstName,
          type: "Text",
        },
        {
          label: "Last",
          type: "Text",
          value: customerInfo.lastName,
        },
      ],
      disabled: isSaveContinueDisabled,
      onSubmit: () => {},
    };

    if (customerInfo.phone) {
      formProps.fields.push({
        label: "Phone",
        value: customerInfo.phone,
        type: "Phone",
      });
    }
    return (
      <div className="OrderDetails__Input__Customer-Form">
        <Form {...formProps} />
      </div>
    );
  };

  return (
    <div className="OrderDetails">
      <div className="OrderDetails__Summary">
        <div className="OrderDetails__Summary__Title">
          {/* Render first image of event, if it exists. */}
          {event.images.length > 0 && (
            <img
              className="OrderDetails__Summary__Image"
              href={event.images[0].id.toString()}
              alt="Experience image"
            />
          )}

          <TextStyle text={event.name} variant="display1" />
        </div>
        <TextStyle variant="display2" text={selectedDate.toISOString()} />
        <div>
          <div className="OrderDetails__Summary__Time-Slot">
            <TextStyle
              variant="body1"
              text={`${selectedTimeslot.startsAt.toISOString()} - ${selectedTimeslot.endsAt.toISOString()}`}
            />
            <TextStyle variant="body1" text="|" />
            <TextStyle
              variant="body3"
              text={
                selectedTimeslot.unitsLeft > 1
                  ? `${selectedTimeslot.unitsLeft} spots left`
                  : `${selectedTimeslot.unitsLeft} spot left`
              }
            />
          </div>
        </div>
        <div>
          <TextStyle variant="body2" text={`From $${minCost} `} />
          <TextStyle variant="body1" text={"/ person"} />
        </div>
      </div>

      <div className="OrderDetails__Input">
        <div className="OrderDetails__Input__Quantity-Selection">
          <QuantitySelection {...quantitySelectionProps} />
        </div>

        {/** Render customer info if customer info has been provided and
         * event is not a prepaid one.
         */}
        {customerInfo &&
          event.paymentType !== PaymentType.Prepay &&
          renderCustomerForm(customerInfo)}

        <div className="OrderDetails__Input__Save">
          <Button
            variant="contained"
            color="primary"
            text="Save & continue"
            fullWidth
            disabled={isSaveContinueDisabled}
            onClick={() => {
              setPage(BookingFormPage.SUBMISSION_LOADER);
            }}
          />
        </div>
      </div>
    </div>
  );
};
