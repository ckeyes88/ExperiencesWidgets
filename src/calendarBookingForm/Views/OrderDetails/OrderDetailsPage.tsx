import './OrderDetailsPage.scss';

import { format } from 'date-fns';
import { Component, h } from 'preact';

import { CustomForm } from '../../../SharedComponents/Forms/CustomForm';
import { Availability } from '../../../typings/Availability';
import { CustomerInputData } from '../../../typings/CustomerInput';
import {
  EventDBO,
  EventVariantDBO,
  FormFieldType,
  OrderDetailsFormType,
  PaymentType
} from '../../../typings/Event';
import { FormFieldValueInput } from '../../../typings/FormFieldValueInput';
import { plural } from '../../../Utils/helpers';
import { CustomerInfoForm } from '../../Components/CustomerInfoForm';
import { OrderLineItemInputData } from '../../../typings/OrderLineItemInput';

export interface IOrderDetailsPageProps {
  /** Quantities by event variant */
  quantities: { [variantId: number]: number };
  /** This is the date that the user has selected for the order */
  selectedDate: Date;
  /** This is the timeslot that the user has selected for the order */
  selectedTimeslot: Availability;
  /** This is the event for which the order is being created */
  event: EventDBO;
  /** This is the customer info, if it is needed and has been inputted */
  customerInfo: CustomerInputData;
  /** Items for this order */
  lineItems:  OrderLineItemInputData[];
  /** Method passed in and triggered upon submission of a custom form, passes values up to the top level */
  onAddCustomFormValues(
    variant: EventVariantDBO,
    newCustomFormFieldValues?: FormFieldValueInput[]
  ): void;
  /** Method passed in and triggered upon submission of customer info, passes values up to the top level */
  onAddCustomerInfo(customerInfo: CustomerInputData): void;
  /** Method passed in to trigger upon confirmation of order */
  onConfirmOrder(): void;
  /** Method passed in to trigger a click back */
  onClickBack(): void;
  /** Method passed in to trigger a close modal */
  closeModal(): void;
}

export interface IOrderDetailsPageState {
  /** Holds customer info while the form is being completed to ultimately be passed up to the main state */
  customerInfo: {
    /** Customer's first name */
    firstName: string;
    /** Customer's last name */
    lastName: string;
    /** Customer's email, a confirmation email will be sent here */
    email: string;
  };
  /** Holds custom form data while the form is being completed */
  currentCustomFormValues: FormFieldValueInput[];
  /** If a custom form is required per attendee, this number tracks which attendee is currently being addressed */
  currentLineItemIndex: number;
}

/**
 * This componenent is the higher order top level component that collects all
 * the additional order details as set up by the merchant for the event and either
 * redirects to the cart page for prepay, or creates the free/reservation order.
 *
 * Includes
 * Order details (name, email)
 * per attendee details (meaning display the custom form for each ticket)
 * - or -
 * per order details (meaning display the custom form once for the order)
 *
 */
export class OrderDetailsPage extends Component<
  IOrderDetailsPageProps,
  IOrderDetailsPageState
> {
  constructor(props: IOrderDetailsPageProps) {
    super(props);

    this.state = {
      customerInfo: {
        firstName: "",
        lastName: "",
        email: "",
      },
      currentCustomFormValues: [],
      currentLineItemIndex: 0,
    };
  }

  /** Assembles an array of variants used in the creation of line items */
  get variants() {
    const { quantities, event } = this.props;
    let variants: EventVariantDBO[] = [];
    Object.keys(quantities).forEach(function (k) {
      const variant = parseInt(k);
      for (let i = 0; i < quantities[variant]; i++) {
        variants.push(
          event.variants.find(function (v) {
            return v.shopifyVariantId === variant;
          })
        );
      }
    });
    return variants;
  }

  componentDidUpdate = (prevProps: IOrderDetailsPageProps, prevState: IOrderDetailsPageState) => {
    if (prevProps.lineItems !== this.props.lineItems && prevState.currentCustomFormValues !== this.state.currentCustomFormValues) {
      //If the form is only per order, or if this is the final attendee, call onConfirmOrder
      if (
        this.props.event.customOrderDetails.formType ===
          OrderDetailsFormType.PerOrder ||
        this.state.currentLineItemIndex >= this.variants.length
      ) {
        this.props.onConfirmOrder();
      }
    }
    if (prevProps.customerInfo !== this.props.customerInfo) {
      //If the merchant has required custom forms, return
      if (
        this.props.event.customOrderDetails.fields &&
        Array.isArray(this.props.event.customOrderDetails.fields) &&
        this.props.event.customOrderDetails.fields.length &&
        this.state.currentLineItemIndex < this.variants.length
      ) {
        return;
      //Otherwise, create a line item for each attendee, then trigger method to confirm the order
      } else {
        this.variants.forEach((v) => {
          this.props.onAddCustomFormValues(v);
        });
        this.props.onConfirmOrder();
      }
    }
  }

  /** Triggered when the customer info is submitted as passes the info up to the main level */
  onAddCustomerInfo = () => {
    // might want to do some validation here and render an error if it doesn't work
    let newCustomer: CustomerInputData = {
      ...this.state.customerInfo,
    };
    this.props.onAddCustomerInfo(newCustomer);
  };

  /** Passes current custom form values up to main level to be stored as a line item */
  onAddLineItem = () => {
    // Establishes the current values stored in state
    let newCustomFormValues: FormFieldValueInput[] = [
      ...this.state.currentCustomFormValues,
    ];

    // Use the current line item index to determine the correct variant
    const currentVariant = this.variants[this.state.currentLineItemIndex];

    // Pass the variant and the form values up to the top level
    this.props.onAddCustomFormValues(currentVariant, newCustomFormValues);

    // Increment the current line item index in state
    const newLineItemIndex = this.state.currentLineItemIndex + 1;

    // Reset the form values in state
    this.setState({
      currentCustomFormValues: [],
      currentLineItemIndex: newLineItemIndex,
    });
  };

  /** Passed down to the customer form and triggered on changes to store the values in state */
  handleCustomerFormChange = (fieldName: string, fieldValue: string) => {
    this.setState({
      customerInfo: {
        ...this.state.customerInfo,
        [fieldName]: fieldValue,
      },
    });
  };

  /** Passed down to the custom form and triggered on changes to store the values in state */
  handleCustomFormChange = (fieldLabelIndex: string, fieldValue: string) => {
    //Copy the current values to a new array
    let currentCustomFormValues = [].concat(this.state.currentCustomFormValues);
    //fieldLabelIndex is the field label/name and its index position joined by a hyphen
    //Split the values apart here
    const [label, index] = fieldLabelIndex.split("-");
    //Create a new custom form value of type FormFieldValueInput
    const newCustomFormValue = { label, value: fieldValue };
    //Index into the form values array using the index from the field ID
    currentCustomFormValues[parseInt(index)] = newCustomFormValue;
    //Set state with the updated value
    this.setState({
      currentCustomFormValues,
    });
  };

  /** Triggered on submission of a custom form */
  handleSubmitCustomForm = (ev: Event) => {
    ev.preventDefault();

    //Pass the values up to create a new line item
    this.onAddLineItem();
  };

  /** Triggered on submission of a customer info form */
  handleSubmitCustomerInfoForm = (ev: Event) => {
    ev.preventDefault();

    //Pass the values up to store on the main level
    this.onAddCustomerInfo();
  };

  /** Renders a customer info form if the event is not prepay */
  renderCustomerInfoForm = () => {
    return (
      <form
        className="CustomerInfo"
        id="CustomerInfo"
        onSubmit={this.handleSubmitCustomerInfoForm}
      >
        <p className="CustomerInfo-FinalizeOrder">
          <button onClick={this.props.onClickBack} id="CustomerInfo-BackBtn">
            &#8592;
          </button>
          <span className="CustomerInfo-Header">Finalize your reservation</span>
          <button onClick={this.props.closeModal} id="CustomerInfo-CloseBtn">
            &#215;
          </button>
        </p>
        <div className="CustomerInfo-EventDetails">
          <span>
            <span className="CustomerInfo-EventName">
              {this.props.event.name}
            </span>
            <br />
            <span className="CustomerInfo-DeteSelected">
              {format(
                new Date(this.props.selectedTimeslot.startsAt),
                "EEEE MMMM d, yyyy"
              )}
            </span>
            <p className="CustomerInfo-VariantDetails">
              <span className="CustomerInfo-StartTime">
                {format(
                  new Date(this.props.selectedTimeslot.startsAt),
                  "h:mma"
                ).toLowerCase()}
              </span>
              {this.renderVariantDetails()}
            </p>
          </span>
        </div>
        <CustomerInfoForm
          key="CustomerInfo"
          handleChange={this.handleCustomerFormChange}
        />
        <button className="CustomerInfo-SubmitBtn" type="submit">
          Submit
        </button>
      </form>
    );
  };

  /** Renders a custom order form as set up by the merchant
   * This form is either per attendee or per order
   */
  renderCustomOrderDetails = (variant?: EventVariantDBO) => {
    const { customOrderDetails } = this.props.event;
    const { currentLineItemIndex } = this.state;

    //If the custom form is per attendee, add name/email fields and render attendee-specific info per form (ex. Attendee 1 of 3)
    if (customOrderDetails.formType === OrderDetailsFormType.PerAttendee) {
      //Adds first, last, and email to any custom form by default
      const fields = customOrderDetails.fields.concat([
        { type: FormFieldType.Text, label: "First Name", required: true },
        { type: FormFieldType.Text, label: "Last Name", required: true },
        { type: FormFieldType.Email, label: "Email", required: true },
      ]);
      //Render the form
      //The custom form for per attendee, renders on how many tickets are bought
      return (
        <div className="CustomOrderDetials">
          <div className="CustomOrderDetails-Header">
            <p>
              <span className="CustomOrderDetails-Ticket">
                Ticket {currentLineItemIndex + 1} of {this.variants.length}
              </span>
              <span className="CustomOrderDetails-VariantName">
                {variant.name}
              </span>
            </p>
            <button
              id="MobileView-OrderDetails-CloseBtn"
              onClick={this.props.closeModal}
            >
              &times;
            </button>
          </div>
          <form id="CustomOrder-Details" onSubmit={this.handleSubmitCustomForm}>
            <CustomForm
              key={currentLineItemIndex}
              fields={fields}
              formDescription={customOrderDetails.formDescription}
              formTitle={customOrderDetails.formTitle}
              handleChange={this.handleCustomFormChange}
            />
            <span className="CustomOrderDetails-SubmitBtn">
              <button type="submit">Submit</button>
            </span>
          </form>
        </div>
      );
    } else {
      //The custom form is per order, render only once
      return (
        <div className="CustomOrderDetails">
          <div className="CustomOrderDetails-Header">
            <span className="CustomOrderDetails-VariantName">
              {variant.name}
            </span>
          </div>
          <form id="CustomOrder-Details" onSubmit={this.handleSubmitCustomForm}>
            <CustomForm
              key={currentLineItemIndex}
              fields={customOrderDetails.fields}
              formDescription={customOrderDetails.formDescription}
              formTitle={customOrderDetails.formTitle}
              handleChange={this.handleCustomFormChange}
            />
            <span className="CustomOrderDetails-SubmitBtn">
              <button type="submit">Submit</button>
            </span>
          </form>
        </div>
      );
    }
  };
  /**renders the differnt variant name and quanity depeanding on what has be selected by the user */
  renderVariantDetails = () => {
    let variantsByName: { [name: string]: number } = {};
    const { quantities } = this.props;
    const quantityKeys = Object.keys(quantities);

    for (let k of quantityKeys) {
      const id = parseInt(k);
      if (quantities[id] < 1) {
        continue;
      }
      let variantName = "";
      if (this.variants.find((variant) => variant.shopifyVariantId === id)) {
        variantName = this.variants.find(
          (variant) => variant.shopifyVariantId === id
        ).name;
      }
      variantName = plural(variantName, quantities[id]);
      variantsByName[variantName] = quantities[id];
    }

    const names = Object.keys(variantsByName);
    return names.map(function (name, index: number) {
      return (
        <span className="OrderDetails-EventDetails" key={name}>
          {variantsByName[name]} {name}
        </span>
      );
    });
  };
  /** rendering */
  public render() {
    if (
      !this.props.customerInfo &&
      this.props.event.paymentType !== PaymentType.Prepay
    ) {
      return this.renderCustomerInfoForm();
    }

    if (
      this.props.event.customOrderDetails.fields &&
      Array.isArray(this.props.event.customOrderDetails.fields) &&
      this.props.event.customOrderDetails.fields.length &&
      this.state.currentLineItemIndex < this.variants.length
    ) {
      return this.renderCustomOrderDetails(
        this.variants[this.state.currentLineItemIndex]
      );
    }
  }
}
