/** @jsx h */
import { h, FunctionComponent } from "preact";
import { FormFieldDBO } from "../../../../types";
import { AppDictionary } from "../../../../typings/Languages";
import { FormField } from "../FormField";

export type CustomFormProps = {
  /** Array of fields that the form will display */
  fields: FormFieldDBO[];
  /** A string to display that descibe the purpose of the form */
  formDescription: string;
  /** A string to display the title of this form */
  formTitle: string;
  /** Method passed in to handle changes to the value of a field */
  handleChange(fieldName: string, value: string): void;
  /** Event custom labels set in admin experience interface */
  labels: Partial<AppDictionary>;
};

/** This is the component that renders a custom form with merchant-defined fields */
export const CustomForm: FunctionComponent<CustomFormProps> = ({
  fields,
  formDescription,
  formTitle,
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
    // Changed this to combine field and value using %%% since a dash causes problems if the customer inputs a field name with a dash i.e. T-Shirt
    return (
      <div className="FormField-Container">
        <FormField
          optionalLabel={labels.optionalFieldLabel}
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

  /** Renders each indivual field in the fields prop */
  const renderFormFields = () => {
    //null
    return fields.map(renderFormField);
  };

  /** Main render method */
  return (
    <div className="CustomForm-Container">
      {/** custom detail email, name etc */}
      {renderFormFields()}
    </div>
  );
};
