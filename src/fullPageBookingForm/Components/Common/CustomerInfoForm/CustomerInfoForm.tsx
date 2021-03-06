/** @jsx h */
import { h, FunctionComponent } from "preact";
import { CustomerInputData } from "../../../../typings/CustomerInput";
import { AppDictionary } from "../../../../typings/Languages";
import { FormField } from "../FormField";

export type CustomerInfoFormProps = {
  /**Whether customer info form should be disabled. */
  isCustomerInfoFormDisabled?: boolean;
  /**Value of first name. */
  customerData: CustomerInputData;
  /** this function gets called everytime one of the form values changes */
  handleChange(fieldName: string, value: string): void;
  /** Event custom labels set in admin experience interface */
  labels: Partial<AppDictionary>;
};

export const CustomerInfoForm: FunctionComponent<CustomerInfoFormProps> = ({
  customerData,
  labels,
  handleChange,
  isCustomerInfoFormDisabled,
}) => {
  return (
    <div className="CustomerInfo-Grid">
      <div className="CustomerInfo-Name">
        <FormField
          value={customerData.firstName}
          onFieldChange={handleChange}
          type="Text"
          label={labels.firstNameLabel}
          id="firstName"
          disabled={isCustomerInfoFormDisabled}
        />
        <FormField
          value={customerData.lastName}
          onFieldChange={handleChange}
          type="Text"
          label={labels.lastNameLabel}
          id="lastName"
          disabled={isCustomerInfoFormDisabled}
        />
      </div>
      <div className="CustomerInfo-Email">
        <FormField
          value={customerData.email}
          onFieldChange={handleChange}
          type="Email"
          label={labels.emailLabel}
          id="email"
          disabled={isCustomerInfoFormDisabled}
        />
      </div>
    </div>
  );
};
