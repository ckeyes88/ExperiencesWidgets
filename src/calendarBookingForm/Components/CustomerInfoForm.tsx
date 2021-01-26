import "./CustomerInfoForm.scss";

import { Component, h } from "preact";
import { FormField } from "../../SharedComponents/Forms/FormField";
import { AppDictionary } from "../../typings/Languages";

export interface ICustomerInfoFormProps {
  /** this function gets called everytime one of the form values changes */
  handleChange(fieldName: string, value: string): void;
  /** Event custom labels set in admin experience interface */
  labels: Partial<AppDictionary>;
}

/** component that displays the first 3 form fields */
export class CustomerInfoForm extends Component<ICustomerInfoFormProps> {
  /** rendering 3 form fields for first name, last name, and email */
  public render() {
    const { labels } = this.props;

    return (
      <div className="CustomerInfo-Grid">
        <div className="CustomerInfo-Name">
          <FormField
            optionalLabel={labels.optionalFieldLabel}
            onFieldChange={this.props.handleChange}
            type="Text"
            label={labels.firstNameLabel}
            id="firstName"
            required
          />
          <FormField
            optionalLabel={labels.optionalFieldLabel}
            onFieldChange={this.props.handleChange}
            type="Text"
            label={labels.lastNameLabel}
            id="lastName"
            required
          />
        </div>
        <div className="CustomerInfo-Email">
          <FormField
            optionalLabel={labels.optionalFieldLabel}
            onFieldChange={this.props.handleChange}
            type="Email"
            label={labels.emailLabel}
            id="email"
            required
          />
        </div>
      </div>
    );
  }
}
