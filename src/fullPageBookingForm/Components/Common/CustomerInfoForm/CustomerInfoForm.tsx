/** @jsx h */
import { h, FunctionComponent } from "preact";
import { AppDictionary } from "../../../../typings/Languages";
import { FormField } from "../FormField";

export type CustomerInfoFormProps = {
  /**Value of first name. */
  firstNameValue: string;
  /**Value of last name. */
  lastNameValue: string;
  /**Value of email.*/
  emailValue: string;
  /** this function gets called everytime one of the form values changes */
  handleChange(fieldName: string, value: string): void;
  /** Event custom labels set in admin experience interface */
  labels: Partial<AppDictionary>;
};

export const CustomerInfoForm: FunctionComponent<CustomerInfoFormProps> = ({
  firstNameValue,
  lastNameValue,
  emailValue,
  labels,
  handleChange,
}) => {
  return (
    <div className="CustomerInfo-Grid">
      <div className="CustomerInfo-Name">
        <FormField
          value={firstNameValue}
          onFieldChange={handleChange}
          type="Text"
          label={labels.firstNameLabel}
          id="firstName"
        />
        <FormField
          value={lastNameValue}
          onFieldChange={handleChange}
          type="Text"
          label={labels.lastNameLabel}
          id="lastName"
        />
      </div>
      <div className="CustomerInfo-Email">
        <FormField
          value={emailValue}
          onFieldChange={handleChange}
          type="Email"
          label={labels.emailLabel}
          id="email"
        />
      </div>
    </div>
  );
};
