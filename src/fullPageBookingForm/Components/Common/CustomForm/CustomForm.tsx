/** @jsx h */
import { h, FunctionComponent, Fragment } from "preact";
import { FormFieldDBO } from "../../../../types";
import { AppDictionary } from "../../../../typings/Languages";
import { FormField } from "../FormField";
import { TextStyle } from "../TextStyle";

export type PerOrderTypeProps = {
  /** Array of fields that the form will display */
  fields: FormFieldDBO[];
  /** A string to display that descibe the purpose of the form */
  formDescription?: string;
  /** A string to display the title of this form */
  formTitle?: string;
};

export type PerAttendeeTypeProps = {
  /** Array of fields that the form will display */
  fields: FormFieldDBO[];
  /**Number of fields per variant, to be separated by header rule. */
  fieldsPerVariant: number;
};

export type CustomFormProps = {
  /**Type of custom form rendered in checkout flow. */
  formType: PerAttendeeTypeProps | PerOrderTypeProps;
  /** Method passed in to handle changes to the value of a field */
  handleChange(fieldName: string, value: string): void;
  /** Event custom labels set in admin experience interface */
  labels: Partial<AppDictionary>;
};

/** This is the component that renders a custom form with merchant-defined fields */
export const CustomForm: FunctionComponent<CustomFormProps> = ({
  formType,
  handleChange,
  labels,
}) => {
  /** Renders a single field */
  const renderFormField = (field: FormFieldDBO, i: number) => {
    const type =
      field.type === "Select"
        ? {
            options: field.options,
          }
        : field.type;

    //Only supply optional label if field is not required.
    const optionalLabel = !field.required && labels.optionalFieldLabel;

    return (
      <div className="FormField-Container">
        <FormField
          optionalLabel={optionalLabel}
          key={`${field.label}%%%${i}`}
          type={type}
          label={field.label}
          placeholder={field.placeholder}
          defaultValue={field.defaultValue}
          value={field.value}
          id={`${field.label}%%%${i}`}
          onFieldChange={handleChange}
        />
      </div>
    );
  };

  /**Renders each individual field in the form for a per order form. */
  const renderPerOrderForm = (formValues: PerOrderTypeProps) => {
    return (
      <Fragment>
        {formValues.formTitle && <TextStyle variant="display2" text={"Test"} />}
        {formValues.formDescription && (
          <div className="CustomOrder__Description">
            <TextStyle variant="body1" text={formValues.formDescription} />
          </div>
        )}
        {formValues.fields.map(renderFormField)}
      </Fragment>
    );
  };

  /**Renders each individual field in the form, for each
   * individual attendee.
   */
  const renderPerAttendeeForm = (formValues: PerAttendeeTypeProps) => {
    return <Fragment>{formValues.fields.map(renderFormField)}</Fragment>;
  };

  /** Main render method */
  return (
    <div className="CustomForm-Container">
      {formType.hasOwnProperty("fieldsPerVariant")
        ? renderPerAttendeeForm(formType as PerAttendeeTypeProps)
        : renderPerOrderForm(formType as PerOrderTypeProps)}
    </div>
  );
};
