/** @jsx h */
import { parseISO } from "date-fns/fp";
import { format } from "date-fns";
import { h, FunctionComponent } from "preact";
import { useState } from "preact/hooks";
import { Availability } from "../../../../typings/Availability";
import { CustomerInputData } from "../../../../typings/CustomerInput";
import {
  EventDBO,
  EventVariantDBO,
  FormFieldType,
  OrderDetailsFormType,
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
import { CustomForm } from "../../Common/CustomForm";

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
  /**Whether this view is being tested in storybook or not. Inject state for testing purposes. */
  isStorybookTest?: {
    isSaveContinueDisabled: boolean;
  };
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
  lineItems,
  onConfirmOrder,
  onAddCustomFormValues,
}) => {
  /** Assembles an array of variants used in the creation of line items */
  const getVariants = () => {
    let variants: (EventVariantDBO & { quantity: number })[] = [];

    Object.keys(quantitySelectionProps.variants).forEach(function (k) {
      const variant = parseInt(k);
      for (
        let i = 0;
        i < Object.values(quantitySelectionProps.variants).length;
        i++
      ) {
        variants.push({
          ...event.variants.find(function (v) {
            return v.shopifyVariantId === variant;
          }),
          quantity: quantitySelectionProps.variants[variant].currentQty,
        });
      }
    });
    return variants;
  };

  /**
   * State tracking in component.
   */
  const [customerData, setCustomerInfo] = useState<CustomerInputData>({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [variants, _] = useState(getVariants);

  const [currentLineItemIndex, setCurrentLineItemIndex] = useState(0);
  const [isSaveContinueDisabled, setIsSaveContinueDisabled] = useState(
    isStorybookTest ? isStorybookTest.isSaveContinueDisabled : false,
  );
  console.log(isSaveContinueDisabled);
  const [currentCustomFormValues, setCustomFormValues] = useState([]);

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

        <CustomerInfoForm
          {...customerFormProps}
          isCustomerInfoFormDisabled={saveButtonState === "hidden"}
        />
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

  //Update state of form when clicking back in custom form order.
  const onPreviousClick = async () => {
    // decrement lineItem index
    const newLineItemIndex =
      currentLineItemIndex > 0
        ? currentLineItemIndex - 1
        : currentLineItemIndex;

    // switch to a previous line item
    const storedLineItem = lineItems[newLineItemIndex];

    setCurrentLineItemIndex(newLineItemIndex);
    setCustomFormValues(storedLineItem.customOrderDetailsValues);
  };

  /** Passed down to the custom form and triggered on changes to store the values in state */
  const handleCustomFormChange = (
    fieldLabelIndex: string,
    fieldValue: string,
  ) => {
    const newCurrentCustomFormValues: FormFieldValueInput[] = event.customOrderDetails.fields.map(
      (field) => ({ ...field, value: field.defaultValue }),
    );

    //Copy the current values to a new array
    currentCustomFormValues.forEach((v, i) => {
      newCurrentCustomFormValues[i] = v;
    });
    //fieldLabelIndex is the field label/name and its index position joined by a hyphen
    //Split the values apart here
    // Changed this to split on %%% since a dash causes problems if the customer inputs a field name with a dash i.e. T-Shirt
    const [label, index] = fieldLabelIndex.split("%%%");

    //Create a new custom form value of type FormFieldValueInput
    const oldVal = newCurrentCustomFormValues[parseInt(index)] || {};

    //Index into the form values array using the index from the field ID
    newCurrentCustomFormValues[parseInt(index)] = {
      ...oldVal,
      label,
      value: fieldValue,
    };

    //Set state with the updated value
    setCustomFormValues(newCurrentCustomFormValues);
  };

  /** Passes current custom form values up to main level to be stored as a line item */
  const onAddLineItem = async () => {
    // Establishes the current values stored in state
    let newCustomFormValues: FormFieldValueInput[] = [
      ...currentCustomFormValues,
    ];
    if (
      event.customOrderDetails.formType === OrderDetailsFormType.PerAttendee
    ) {
      // Use the current line item index to determine the correct variant
      const currentVariant = variants[currentLineItemIndex];

      // Pass the variant and the form values up to the top level
      await onAddCustomFormValues(
        currentVariant,
        newCustomFormValues,
        currentLineItemIndex,
      );

      // Increment the current line item index in stateR
      const newLineItemIndex = currentLineItemIndex + 1;

      // Reset the form values in state
      setCustomFormValues([]);
      setCurrentLineItemIndex(newLineItemIndex);
    } else {
      let lineItemPromises: Promise<any>[] = [];
      let newCustomFormValues: FormFieldValueInput[] = [
        ...currentCustomFormValues,
      ];
      // loop over each variant
      variants.forEach((v, i) => {
        lineItemPromises.push(onAddCustomFormValues(v, newCustomFormValues, i));
      });

      await Promise.all(lineItemPromises);
    }
  };

  /** Triggered on submission of a custom form */
  const handleSubmitCustomForm = async (ev: Event) => {
    ev.preventDefault();
    //Pass the values up to create a new line item
    await onAddLineItem();

    //If the form is only per order, or if this is the final attendee, call onConfirmOrder
    if (
      event.customOrderDetails.formType === OrderDetailsFormType.PerOrder ||
      currentLineItemIndex >= variants.length
    ) {
      onConfirmOrder();
    }
  };

  /** Renders a custom order form as set up by the merchant
   * This form is either per attendee or per order
   */
  const renderCustomOrderDetails = (variant?: EventVariantDBO) => {
    const { customOrderDetails } = event;

    const currentLineItem = lineItems[currentLineItemIndex];
    //If the custom form is per attendee, add name/email fields and render attendee-specific info per form (ex. Attendee 1 of 3)
    if (customOrderDetails.formType === OrderDetailsFormType.PerAttendee) {
      //Adds first, last, and email to any custom form by default
      let fields = customOrderDetails.fields.concat([
        {
          type: FormFieldType.Text,
          label: labels.firstNameLabel,
          required: true,
        },
        {
          type: FormFieldType.Text,
          label: labels.lastNameLabel,
          required: true,
        },
        { type: FormFieldType.Email, label: labels.emailLabel, required: true },
      ]);

      if (currentLineItem && currentLineItem.customOrderDetailsValues) {
        fields = fields.map((f) => {
          // if there is a value stored from the previous step, use it
          const existingFieldData = currentLineItem.customOrderDetailsValues.filter(
            (l) => l.label === f.label,
          )[0];
          return {
            ...f,
            value: !!existingFieldData ? existingFieldData.value : undefined,
          };
        });
      }

      //Render the form
      //The custom form for per attendee, renders on how many tickets are bought
      return (
        <div>
          <TextStyle
            variant="display2"
            text={event.customOrderDetails.formTitle}
          />
          <h4 className="CustomOrderDetails-Description">
            {event.customOrderDetails.formDescription}
          </h4>
          <div>
            <p>
              <span className="CustomOrderDetails-Ticket">
                {labels.getPerAttendeeStepLabel(
                  currentLineItemIndex + 1,
                  variants.length,
                )}
              </span>
              <span className="CustomOrderDetails-VariantName">
                {variant.name}
              </span>
            </p>
          </div>
          <form id="CustomOrder-Details" onSubmit={handleSubmitCustomForm}>
            <CustomForm
              labels={labels}
              key={currentLineItemIndex}
              fields={fields}
              formDescription={customOrderDetails.formDescription}
              formTitle={customOrderDetails.formTitle || "Custom Form"}
              handleChange={handleCustomFormChange}
            />
            <span className="CustomOrderDetails-SubmitBtn">
              <button
                type="button"
                onClick={onPreviousClick}
                disabled={!currentLineItemIndex}
              >
                {labels.previousLabel}
              </button>
              <button type="submit">
                {currentLineItemIndex + 1 === variants.length
                  ? labels.confirmReservationButtonLabel
                  : labels.nextLabel}
              </button>
            </span>
          </form>
        </div>
      );
    } else {
      //The custom form is per order, render only once
      return (
        <div className="CustomOrder">
          <TextStyle
            variant="display2"
            text={event.customOrderDetails.formTitle}
          />
          {event.customOrderDetails.formDescription && (
            <div className="CustomOrder__Description">
              <TextStyle
                variant="body1"
                text={event.customOrderDetails.formDescription}
              />
            </div>
          )}

          <form id="CustomOrder-Details" onSubmit={handleSubmitCustomForm}>
            <CustomForm
              labels={labels}
              key={currentLineItemIndex}
              fields={customOrderDetails.fields}
              formDescription={customOrderDetails.formDescription}
              formTitle={customOrderDetails.formTitle}
              handleChange={handleCustomFormChange}
            />
            <span className="CustomOrderDetails-SubmitBtn centered">
              <button type="submit">
                {labels.confirmReservationButtonLabel}
              </button>
            </span>
          </form>
        </div>
      );
    }
  };

  //Whether a custom form should be rendered in the view.
  const shouldRenderCustomForm =
    isSaveContinueDisabled &&
    event.customOrderDetails.fields &&
    Array.isArray(event.customOrderDetails.fields) &&
    currentLineItemIndex < variants.length;

  /** Main render method. */
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
        <TextStyle variant="display2" text={"Monday, January 13th"} />
        <div>
          <div className="OrderDetails__Summary__Time-Slot">
            <TextStyle
              variant="body1"
              text={`${format(
                parseISO(selectedTimeslot.startsAt.toISOString()),
                "h:mm",
              )} - ${format(
                parseISO(selectedTimeslot.endsAt.toISOString()),
                "h:mm",
              )}`}
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

        {/**
         * Render customer info if customer info has been provided and
         * event is not a prepaid one.
         */}
        {event.paymentType !== PaymentType.Prepay && renderCustomerForm()}
        {/**
         * Allow edits of customer form when populated
         */}
        {shouldRenderCustomForm && (
          <div className="OrderDetails__Edit-Button">
            <Button text="Edit" variant="outlined" fullWidth color="primary" />
          </div>
        )}
        {/**
         * Render custom info form if custom info has been provided and customer
         * form has been completed.
         */}
        {shouldRenderCustomForm &&
          renderCustomOrderDetails(variants[currentLineItemIndex])}
      </div>
    </div>
  );
};
