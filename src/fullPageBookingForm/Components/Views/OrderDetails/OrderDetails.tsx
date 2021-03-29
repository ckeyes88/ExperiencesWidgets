/** @jsx h */
import { parseISO } from "date-fns/fp";
import { format } from "date-fns";
import { h, FunctionComponent, Fragment } from "preact";
import { Availability } from "../../../../typings/Availability";
import {
  EventDBO,
  FormFieldType,
  OrderDetailsFormType,
  PaymentType,
} from "../../../../typings/Event";
import { AppDictionary } from "../../../../typings/Languages";
import { BookingFormPage } from "../../../Typings/BookingFormPage";
import { Button } from "../../Common/Button";
import {
  CustomerInfoForm,
  CustomerInfoFormProps,
} from "../../Common/CustomerInfoForm";
import { QuantitySelection } from "../../Common/QuantitySelection";
import { TextStyle } from "../../Common/TextStyle";
import "./OrderDetails.scss";
import {
  CustomForm,
  PerAttendeeTypeProps,
  PerOrderTypeProps,
} from "../../Common/CustomForm";
import { FormFieldDBO } from "../../../../types";
import {
  useCustomerFormStore,
  useCustomFormStore,
  useOrderDetailsStore,
  useQtySelectionStore,
} from "../../App";
import { useEffect } from "preact/hooks";

export type OrderDetailsProps = {
  /** This is the date that the user has selected for the order */
  selectedDate: Date;
  /** This is the timeslot that the user has selected for the order */
  selectedTimeslot: Availability;
  /** This is the event for which the order is being created */
  event: EventDBO;
  /** Any errors that should be displayed on the form */
  error: string;
  /** Event custom labels set in admin experience interface */
  labels: Partial<AppDictionary>;
};

export const OrderDetails: FunctionComponent<OrderDetailsProps> = ({
  event,
  selectedTimeslot,
  selectedDate,
  labels,
}) => {
  //Populate qty selection variants and custom form details on mount of component.
  useEffect(() => {
    useCustomFormStore((state) => state.setCustomFormValues)(event);
    useQtySelectionStore((state) => state.setVariants)(event);
  }, []);

  //Get variants associated with event
  const variants = useQtySelectionStore((state) => state.variants);

  /**
   * State tracking in component.
   */
  const isSaveContinueDisabled = useOrderDetailsStore(
    (state) => state.isSaveContinueDisabled,
  );

  //Define set page function, with stub if testing.

  //Calculate minimum cost of the event.
  const minCost = Math.min(...event.variants.map((variant) => variant.price));

  /** Triggered on submission of a custom form */
  const handleSubmitCustomForm = (ev: Event) => {
    ev.preventDefault();
    const onConfirmOrder = useCustomFormStore((state) => state.onConfirmOrder);
    onConfirmOrder();
  };

  /*
   * If required by event type, render customer form.
   */
  const renderCustomerForm = (hasConfirmButton: boolean) => {
    //Update state of customer form on change.
    const handleCustomerFormChange = useCustomerFormStore(
      (state) => state.handleCustomerFormChange,
    );
    const customerData = useCustomerFormStore((state) => state.customerData);

    //Handle submission of form, and pass data in form to parent component.
    const handleFormSubmit = (event: Event) => {
      event.preventDefault();
      const onAddCustomerInfo = useCustomerFormStore(
        (state) => state.onAddCustomerInfo,
      );

      //Pass data to parent.
      onAddCustomerInfo();
    };

    const customerFormProps: CustomerInfoFormProps = {
      customerData,
      handleChange: handleCustomerFormChange,
      labels,
    };

    const formClassNames = ["OrderDetails__Input__Customer-Form"];

    const saveButtonVisibility = useOrderDetailsStore(
      (state) => state.saveButtonVisibility,
    );
    //If the save button is hidden, the customer form should be disabled.
    if (saveButtonVisibility === "hidden") {
      formClassNames.push("OrderDetails__Input__Customer-Form--disabled");
    }

    //Save/Confirm button is disabled if store requires it to be disabled, if a variant qty hasn't been
    //specified, or if the customer form hasn't been populated.
    const canConfirm =
      useQtySelectionStore((state) => state.canConfirmOrder)() &&
      useCustomerFormStore((state) => state.canConfirmOrder)();

    console.log(canConfirm);

    return (
      <form className={formClassNames.join(" ")} onSubmit={handleFormSubmit}>
        <div className="OrderDetails__Input__Customer-Form__Title">
          <TextStyle variant="display2" text="Customer info" />
        </div>

        <CustomerInfoForm
          {...customerFormProps}
          isCustomerInfoFormDisabled={saveButtonVisibility === "hidden"}
        />
        <div className="OrderDetails__Header-Rule" />
        {saveButtonVisibility !== "hidden" && (
          <div className="OrderDetails__Input__Customer-Form__Submit">
            {hasConfirmButton
              ? renderConfirmButton(!canConfirm)
              : renderSaveButton(!canConfirm)}
          </div>
        )}
      </form>
    );
  };

  /** Renders a custom order form as set up by the merchant
   * This form is either per attendee or per order
   */
  const renderCustomOrderDetails = () => {
    const { customOrderDetails } = event;

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
      const selectedVariants = Object.values(variants).filter(
        (variant) => variant.currentQty > 0,
      );

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
        removeVariant: useCustomFormStore((state) => state.handleRemoveVariant),
      };

      //Whether the user is allowed to confirm order by populating
      //all required custom form fields.
      const canConfirm = useCustomFormStore(
        (state) => state.customFormValues,
      ).every(
        (field) =>
          !field.isRequired || (field.isRequired && field.value !== ""),
      );

      console.log(canConfirm);

      //Render the custom form for per attendee,
      //renders on how many tickets are bought
      return (
        <div className="CustomOrder">
          <form id="CustomOrder-Details" onSubmit={handleSubmitCustomForm}>
            <CustomForm
              labels={labels}
              key={`CustomForm`}
              formType={perAttendeeFormType}
              handleChange={useCustomFormStore(
                (state) => state.handleCustomFormChange,
              )}
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
      const canConfirm = useCustomFormStore(
        (state) => state.customFormValues,
      ).every(
        (field) =>
          !field.isRequired || (field.isRequired && field.value !== ""),
      );

      console.log(useCustomFormStore((state) => state.customFormValues));

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
              key={"CustomForm"}
              formType={perOrderFormType}
              handleChange={useCustomFormStore(
                (state) => state.handleCustomFormChange,
              )}
            />
            <div className="OrderDetails__Button">
              <Button
                fullWidth
                color="primary"
                text={labels.confirmReservationButtonLabel}
                type="submit"
                disabled={!canConfirm}
                onClick={() =>
                  useOrderDetailsStore((state) =>
                    state.setPage(BookingFormPage.CONFIRMATION),
                  )
                }
              />
            </div>
          </form>
        </div>
      );
    }
  };

  //Whether the merchant has provided a custom form for this experience.
  const hasCustomForm =
    event.customOrderDetails.formType !== OrderDetailsFormType.None &&
    event.customOrderDetails.fields &&
    Array.isArray(event.customOrderDetails.fields);

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
  const variantTotal = Object.values(variants)
    .filter((variant) => variant.currentQty > 0)
    .map((variant) => variant.price * variant.currentQty)
    .reduce((total, value) => total + value, 0);

  /**Renders the quantity selection component in the view. */
  const renderQtySelection = () => (
    <div className="OrderDetails__Input__Quantity-Selection">
      <QuantitySelection {...useQtySelectionStore()} />
    </div>
  );

  //Renders confirm button in view.
  const renderConfirmButton = (isDisabled: boolean) => (
    <Button
      text={labels.confirmReservationButtonLabel}
      variant="outlined"
      fullWidth
      color="primary"
      //TODO: Update this to move to next page in modal.
      onClick={() => {
        useOrderDetailsStore((state) => state.setPage)(
          BookingFormPage.CONFIRMATION,
        );
      }}
      disabled={isDisabled}
    />
  );

  //Renders confirm button in view.
  const renderSaveButton = (isDisabled: boolean) => (
    <Button
      text={"Save & continue"}
      variant="outlined"
      fullWidth
      color="primary"
      onClick={() => {
        useOrderDetailsStore((state) => state.setIsSaveContinueDisabled)(true);
        useOrderDetailsStore((state) => state.setSaveButtonVisibility)(
          "hidden",
        );
      }}
      disabled={isDisabled}
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
          useOrderDetailsStore((state) => state.setIsSaveContinueDisabled)(
            false,
          );
          useOrderDetailsStore((state) => state.setSaveButtonVisibility)(
            "visible",
          );
        }}
      />
    </div>
  );

  //Renders pre-pay flow.
  const renderPrePayFlow = () => {
    const canQtySelectionConfirm = useQtySelectionStore(
      (state) => state.canConfirmOrder,
    )();
    const canCustomerFormConfirm = useCustomerFormStore(
      (state) => state.canConfirmOrder,
    )();
    return (
      <Fragment>
        {/**Always render the quantity selection component. */}
        {renderQtySelection()}
        {/** If no custom form is provided, render confirm button
         * to go to checkout after variants are selected.
         */}
        {!hasCustomForm && renderConfirmButton(canQtySelectionConfirm)}
        {/** If per order custom form is provided, render it
         * directly beneath quantity selection to go to checkout afterwards.
         */}
        {hasPerOrderCustomForm && renderCustomOrderDetails()}

        {/* If custom per attendee form, render save button to capture variant quantities,
        then render custom per attendee form.
         */}
        {hasPerAttendeeCustomForm &&
          !shouldRenderCustomForm &&
          renderSaveButton(canQtySelectionConfirm && canCustomerFormConfirm)}
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
        {/**Render confirm button if no custom form is provided. */}
        {renderCustomerForm(!hasCustomForm)}

        {/* If custom form is provided, render custom form
        after variant quantities and customer details are provided.
         */}
        {shouldRenderCustomForm && (
          <Fragment>
            {renderEditButton()}
            {renderCustomOrderDetails()}
          </Fragment>
        )}
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
            {Object.values(variants)
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
