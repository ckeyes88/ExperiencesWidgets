/** @jsx h */
import { h, FunctionComponent, Fragment } from "preact";
import { Person } from "../../../../SharedComponents/Icons/Person";
import { FormFieldDBO } from "../../../../types";
import { AppDictionary } from "../../../../typings/Languages";
import { FormField } from "../FormField";
import { CloseIcon } from "../Icon/CloseIcon";
import { TextStyle } from "../TextStyle";
import "./CustomForm.scss";

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
  /**Name of each variant selected in view, to be separated by header rule.
   * If multiple of the same variants are selected (e.g. 2x "Parent"),
   * this array will contain ["Parent", "Parent", etc.]
   */
  variantNames: string[];
  /**Callback passed by parent to remove a variant from per attendee list on click. */
  removeVariant: (variantName: string, variantNumber: number) => void;
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
    const { formTitle, formDescription, fields } = formValues;
    return (
      <Fragment>
        {formTitle && <TextStyle variant="display2" text={"Test"} />}
        {formDescription && (
          <div className="CustomOrder__Description">
            <TextStyle variant="body1" text={formDescription} />
          </div>
        )}
        {fields.map(renderFormField)}
        <div className="CustomForm__Header-Rule" />
      </Fragment>
    );
  };

  /**Renders each individual field in the form, for each
   * individual attendee.
   */
  const renderPerAttendeeForm = (formValues: PerAttendeeTypeProps) => {
    const { fields, variantNames, removeVariant } = formValues;
    return (
      <Fragment>
        {variantNames.map((variantName, idx) => (
          <div
            className="CustomForm__Attendee"
            key={`CustomForm_${variantName}_${idx}`}
          >
            <div className="CustomForm__Attendee__Variant">
              <div className="CustomForm__Attendee__Icon">
                <Person />
              </div>

              <TextStyle variant="display2" text={variantName} />
              {/**Disable ability to remove variant if this variant
               * is the only selected variant in the form.
               */}
              {variantNames.length > 1 && (
                <button
                  className="CustomForm__Attendee__Remove"
                  onClick={() => {
                    removeVariant(variantName, idx);
                  }}
                >
                  <CloseIcon height={30} color="#888888" />
                </button>
              )}
            </div>

            {fields.map(renderFormField)}
            <div className="CustomForm__Header-Rule" />
          </div>
        ))}
      </Fragment>
    );
  };

  /** Main render method */
  return (
    <div className="CustomForm-Container">
      {formType.hasOwnProperty("variantNames")
        ? renderPerAttendeeForm(formType as PerAttendeeTypeProps)
        : renderPerOrderForm(formType as PerOrderTypeProps)}
    </div>
  );
};
