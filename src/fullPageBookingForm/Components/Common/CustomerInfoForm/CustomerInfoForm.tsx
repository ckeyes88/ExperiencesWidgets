/** @jsx h */
import { h, FunctionComponent } from "preact";
import { FormField } from "../../../../SharedComponents/Forms/FormField";
import { AppDictionary } from "../../../../typings/Languages";

export type CustomerInfoFormProps = {
  /** this function gets called everytime one of the form values changes */
  handleChange(fieldName: string, value: string): void;
  /** Event custom labels set in admin experience interface */
  labels: Partial<AppDictionary>;
};

export const CustomerInfoForm: FunctionComponent<CustomerInfoFormProps> = ({
  labels,
  handleChange,
}) => {
  return (
    <div className="CustomerInfo-Grid">
      <div className="CustomerInfo-Name">
        <FormField
          optionalLabel={labels.optionalFieldLabel}
          onFieldChange={handleChange}
          type="Text"
          label={labels.firstNameLabel}
          id="firstName"
          required
        />
        <FormField
          optionalLabel={labels.optionalFieldLabel}
          onFieldChange={handleChange}
          type="Text"
          label={labels.lastNameLabel}
          id="lastName"
          required
        />
      </div>
      <div className="CustomerInfo-Email">
        <FormField
          optionalLabel={labels.optionalFieldLabel}
          onFieldChange={handleChange}
          type="Email"
          label={labels.emailLabel}
          id="email"
          required
        />
      </div>
    </div>
  );
};
