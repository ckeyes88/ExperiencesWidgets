/** @jsx h */
import { parseISO } from "date-fns/fp";
import { format } from "date-fns";
import { h, FunctionComponent, Fragment } from "preact";
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
import {
  CustomForm,
  PerAttendeeTypeProps,
  PerOrderTypeProps,
} from "../../Common/CustomForm";
import { FormFieldDBO } from "../../../../types";

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
  /**Sets the save button state in parent component. */
  setSaveButtonState: (state: "visible" | "hidden" | "disabled") => void;
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
  setSaveButtonState,
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
  const [currentCustomFormValues, setCustomFormValues] = useState<
    FormFieldValueInput[]
  >([]);

  //Define set page function, with stub if testing.
  let setPage = isStorybookTest
    ? (temp: number) => {}
    : useWizardModalAction().setPage;

  //Calculate minimum cost of the event.
  const minCost = Math.min(...event.variants.map((variant) => variant.price));

  /**Handles the removal of a variant from a custom form. */
  const handleRemoveVariant = (variantName: string, variantIdx: number) => {};

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

  /** Renders a custom order form as set up by the merchant
   * This form is either per attendee or per order
   */
  const renderCustomOrderDetails = (variant?: EventVariantDBO) => {
    const { customOrderDetails } = event;

    const currentLineItem = lineItems[currentLineItemIndex];

    //If the custom form is per attendee,
    //add name/email fields and render attendee-specific
    //info per form (ex. Attendee 1 of 3)
    if (customOrderDetails.formType === OrderDetailsFormType.PerAttendee) {
      //Adds first, last, and email to any custom form by default
      let fields: FormFieldDBO[] = [
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
      ].concat(customOrderDetails.fields);

      //Determine all variants that have been selected in view (where ticket quantity is > 0)
      const selectedVariants = Object.values(
        quantitySelectionProps.variants,
      ).filter((variant) => variant.currentQty > 0);

      //Create per attendee form details object, used to populate
      //all fields for a per attendee custom form.
      const perAttendeeFormType: PerAttendeeTypeProps = {
        //Fields for each variant selected in custom form.
        fields,
        //Create 1D string array of variant names, one name
        //per one quantity selected in view.
        variantNames: [].concat(
          ...selectedVariants.map((variant) =>
            Array(variant.currentQty).fill(variant.name),
          ),
        ),
        //Total fields per variant selected, to be separated by header rule
        //in form.
        removeVariant: handleRemoveVariant,
      };

      //Whether the user is allowed to confirm order by populating
      //all required custom form fields.
      const canConfirm = fields.every(
        (field) => !field.required || (field.required && field.value),
      );

      //Render the custom form for per attendee,
      //renders on how many tickets are bought
      return (
        <div className="CustomOrder">
          <form id="CustomOrder-Details" onSubmit={handleSubmitCustomForm}>
            <CustomForm
              labels={labels}
              key={currentLineItemIndex}
              formType={perAttendeeFormType}
              handleChange={handleCustomFormChange}
            />
            <div className="OrderDetails__Button">
              <Button
                fullWidth
                color="primary"
                text={labels.confirmReservationButtonLabel}
                type="submit"
                disabled={!canConfirm}
              />
            </div>
          </form>
        </div>
      );
    } else {
      //Whether the user is allowed to confirm order by populating
      //all required custom form fields.
      const canConfirm = (customOrderDetails.fields as FormFieldDBO[]).every(
        (field) => !field.required || (field.required && field.value),
      );

      //Create data structure for per order form.
      const perOrderFormType: PerOrderTypeProps = {
        fields: customOrderDetails.fields,
        formDescription: customOrderDetails.formDescription,
        formTitle: customOrderDetails.formTitle,
      };

      //The custom form is per order, render only once
      return (
        <div className="CustomOrder">
          <form id="CustomOrder-Details" onSubmit={handleSubmitCustomForm}>
            <CustomForm
              labels={labels}
              key={currentLineItemIndex}
              formType={perOrderFormType}
              handleChange={handleCustomFormChange}
            />
            <div className="OrderDetails__Button">
              <Button
                fullWidth
                color="primary"
                text={labels.confirmReservationButtonLabel}
                type="submit"
                disabled={!canConfirm}
              />
            </div>
          </form>
        </div>
      );
    }
  };

  //Whether the merchant has provided a custom form for this experience.
  const hasCustomForm =
    event.customOrderDetails.fields &&
    Array.isArray(event.customOrderDetails.fields) &&
    currentLineItemIndex < variants.length;

  //Custom form provided is per attendee.
  const hasPerAttendeeCustomForm =
    hasCustomForm &&
    event.customOrderDetails.formType === OrderDetailsFormType.PerAttendee;

  //Custom form provided is per order.
  const hasPerOrderCustomForm =
    hasCustomForm &&
    event.customOrderDetails.formType === OrderDetailsFormType.PerOrder;

  //Whether a custom form should be rendered in the view.
  const shouldRenderCustomForm = isSaveContinueDisabled && hasCustomForm;

  //Calculate current total of order.
  const variantTotal = Object.values(quantitySelectionProps.variants)
    .filter((variant) => variant.currentQty > 0)
    .map((variant) => variant.price * variant.currentQty)
    .reduce((total, value) => total + value, 0);

  /**Renders the quantity selection component in the view. */
  const renderQtySelection = () => (
    <div className="OrderDetails__Input__Quantity-Selection">
      <QuantitySelection {...quantitySelectionProps} />
    </div>
  );

  //Renders confirm button in view.
  const renderConfirmButton = () => (
    <Button
      text={labels.confirmReservationButtonLabel}
      variant="outlined"
      fullWidth
      color="primary"
      //TODO: Update this to move to next page in modal.
      onClick={() => {
        setIsSaveContinueDisabled(true);
        setSaveButtonState("visible");
      }}
    />
  );

  //Renders confirm button in view.
  const renderSaveButton = () => (
    <Button
      text={"Save & continue"}
      variant="outlined"
      fullWidth
      color="primary"
      onClick={() => {
        setPage(BookingFormPage.CONFIRMATION);
      }}
    />
  );

  const renderEditButton = () => (
    <div className="OrderDetails__Button">
      <Button
        text="Edit"
        variant="outlined"
        fullWidth
        color="primary"
        onClick={() => {
          setIsSaveContinueDisabled(true);
          setSaveButtonState("visible");
        }}
      />
    </div>
  );

  //Renders pre-pay flow.
  const renderPrePayFlow = () => {
    return (
      <Fragment>
        {/**Always render the quantity selection component. */}
        {renderQtySelection()}
        {/** If no custom form is provided, render confirm button
         * to go to checkout after variants are selected.
         */}
        {!hasCustomForm && renderConfirmButton()}
        {/** If per order custom form is provided, render it
         * directly beneath quantity selection to go to checkout afterwards.
         */}
        {hasPerOrderCustomForm && renderCustomOrderDetails()}

        {/* If custom per attendee form, render save button to capture variant quantities,
        then render custom per attendee form.
         */}
        {hasPerAttendeeCustomForm &&
          !shouldRenderCustomForm &&
          renderSaveButton()}
        {hasPerAttendeeCustomForm && shouldRenderCustomForm && (
          <Fragment>
            {renderEditButton()}
            {renderCustomOrderDetails()}
          </Fragment>
        )}
      </Fragment>
    );
  };

  //Renders pre-pay flow.
  const renderNonPrePayFlow = () => {
    return (
      <Fragment>
        {/**Always render the quantity selection component
         * and customer form.
         */}
        {renderQtySelection()}
        {renderCustomerForm()}

        {/* If custom form is provided, render custom form
        after variant quantities and customer details are provided.
         */}
        {hasPerAttendeeCustomForm &&
          shouldRenderCustomForm &&
          renderCustomOrderDetails()}
      </Fragment>
    );
  };

  /** Main render method. */
  return (
    <div className="OrderDetails">
      <div className="OrderDetails__Summary">
        {/* Render first image of event, if it exists. */}
        {event.images.length > 0 && (
          <img
            className="OrderDetails__Summary__Image"
            href={event.images[0].id.toString()}
            alt="Experience image"
          />
        )}
        <div className="OrderDetails__Summary__Title">
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
        {isSaveContinueDisabled && (
          <div className="OrderDetails__Overview">
            {Object.values(quantitySelectionProps.variants)
              .filter((variant) => variant.currentQty > 0)
              .map((variant) => (
                <div
                  className="OrderDetails__Overview__Values"
                  key={`VariantTotal_${variant.name}_${variant.price}`}
                >
                  <TextStyle variant="body1" text={variant.name} />
                  <TextStyle variant="body1" text={`${variant.currentQty}x`} />
                  <div className="OrderDetails__Overview__Values__Total">
                    <TextStyle
                      variant="body1"
                      text={`$${variant.currentQty * variant.price}`}
                    />
                  </div>
                </div>
              ))}
            <div className="OrderDetails__Overview__Total">
              <TextStyle variant="body2" text="Total" />
              <TextStyle variant="body2" text={`$${variantTotal}`} />
            </div>
          </div>
        )}
      </div>

      <div className="OrderDetails__Input">
        {/**
         * Flow for rendering forms on page by default.
         * Review .png file in directory for state diagram of flow.
         */}
        {event.paymentType === PaymentType.Prepay
          ? renderPrePayFlow()
          : renderNonPrePayFlow()}
      </div>
    </div>
  );
};
