import { h, Component } from "preact";
import { FormField } from "../../SharedComponents/Forms/FormField";
import "./CustomerInfoForm.scss";

export interface ICustomerInfoFormProps {
  /** this function gets called everytime one of the form values changes */
  handleChange(fieldName: string, value: string): void;
}


export interface ICustomerInfoFormState { }
/** component that displays the first 3 form fields */
export class CustomerInfoForm extends Component<ICustomerInfoFormProps> {
  /** rendering 3 form fields for first name, last name, and email */
  public render() {
    return (
      <div className="CustomerInfo-Grid">
        <div className="CustomerInfo-Name">
          <FormField
            onFieldChange={this.props.handleChange}
            type="Text"
            label="First Name"
            id="firstName"
            required
          />
          <FormField
            onFieldChange={this.props.handleChange}
            type="Text"
            label="Last Name"
            id="lastName"
            required
          />
        </div>
        <div className="CustomerInfo-Email">
          <FormField
            onFieldChange={this.props.handleChange}
            type="Email"
            label="Email"
            id="email"
            required
          />
        </div>
      </div>
    );
  }
}