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
import {
  CustomerInfoForm,
  CustomerInfoFormProps,
} from "../../Common/CustomerInfoForm";
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
  /** The state of the save button per the parent component. */
  saveButtonState: "visible" | "hidden" | "disabled";
};

export const OrderDetails: FunctionComponent<OrderDetailsProps> = ({
  event,
  selectedTimeslot,
  selectedDate,
  isStorybookTest,
  quantitySelectionProps,
  onAddCustomerInfo,
  labels,
  saveButtonState,
}) => {
  const [customerData, setCustomerInfo] = useState<CustomerInputData>({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [isSaveContinueDisabled, setIsSaveContinueDisabled] = useState(true);

  //Define set page function, with stub if testing.
  let setPage = isStorybookTest
    ? (temp: number) => {}
    : useWizardModalAction().setPage;

  //Calculate minimum cost of the event.
  const minCost = Math.min(...event.variants.map((variant) => variant.price));

  /*
   * If required by event type, render customer form.
   */
  const renderCustomerForm = () => {
    //Update state of customer form on change.
    const handleCustomerFormChange = (
      fieldName: string,
      fieldValue: string,
    ) => {
      return setCustomerInfo((prevState) => ({
        ...prevState,
        [fieldName]: fieldValue,
      }));
    };

    //Handle submission of form, and pass data in form to parent component.
    const handleFormSubmit = (event: Event) => {
      event.preventDefault();

      //Pass data to parent.
      onAddCustomerInfo(customerData);
    };

    const customerFormProps: CustomerInfoFormProps = {
      customerData,
      handleChange: handleCustomerFormChange,
      labels,
    };

    const formClassNames = ["OrderDetails__Input__Customer-Form"];

    //If the save button is hidden, the customer form should be disabled.
    if (saveButtonState === "hidden") {
      formClassNames.push("OrderDetails__Input__Customer-Form--disabled");
    }

    return (
      <form className={formClassNames.join(" ")} onSubmit={handleFormSubmit}>
        <div className="OrderDetails__Input__Customer-Form__Title">
          <TextStyle variant="display2" text="Customer info" />
        </div>

        <CustomerInfoForm {...customerFormProps} />
        <div className="OrderDetails__Header-Rule" />
        {saveButtonState !== "hidden" && (
          <div className="OrderDetails__Input__Customer-Form__Submit">
            <Button
              variant="contained"
              color="primary"
              text="Save & continue"
              fullWidth
              type="submit"
              disabled={saveButtonState === "disabled"}
            />
          </div>
        )}
      </form>
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
        {customerData &&
          event.paymentType !== PaymentType.Prepay &&
          renderCustomerForm()}
      </div>
    </div>
  );
};
