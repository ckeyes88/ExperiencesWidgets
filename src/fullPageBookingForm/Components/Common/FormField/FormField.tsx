/** @jsx h */
import { h, FunctionComponent, JSX } from "preact";
import { TextStyle } from "../TextStyle";
import "./FormField.scss";

export type FormFieldProps = {
  /** Designate what type of an input this is */
  type: "Text" | "Select" | "Email" | "Phone";
  /** The label for this input field must be unique as it's used for the id */
  label: string;
  /** Indicate whether the form field is required */
  required: boolean;
  /** (optional) sublabel, by default is taken from Languages.ts */
  optionalLabel: string;
  /** Optional placeholder */
  placeholder?: string;
  /** options in the event that this is select field */
  options?: string[];
  /** default value given to this field */
  defaultValue?: string;
  /** the value that is currently set in this field */
  value: string;
  /** Optional id for the field */
  id?: string;
  /** Method to trigger when the value of the field changes */
  onFieldChange(fieldName: string, fieldValue: string): void;
};

export const FormField: FunctionComponent<FormFieldProps> = ({
  id,
  label,
  value,
  options,
  optionalLabel,
  required,
  type,
  placeholder,
  onFieldChange,
}) => {
  /**Handles change in input fields, passing values to top level component. */
  const handleChange = (event: any) => {
    const target = event.target as HTMLInputElement;
    onFieldChange(target.id, target.value);
  };

  /** This renders a single option within a select */
  const renderOption = (option: string, i: number): JSX.Element => {
    return (
      <option key={`${option}-${i}`} selected={value === option} value={option}>
        {option}
      </option>
    );
  };

  /** If the field is a select, this method renders it */
  const renderSelect = (): JSX.Element => {
    return (
      <div className="FullPage__FormField__RenderSelect">
        <label className="FullPage__FormField__SelectLabel" for={id}>
          <TextStyle variant="body3" text={label} />
          {!required ? (
            <TextStyle variant="body3" text={`(${optionalLabel})`} />
          ) : (
            <TextStyle
              variant="body3"
              text={<span className="FullPage__FormField__Required"> * </span>}
            />
          )}
        </label>
        <select id={id} onChange={handleChange}>
          {options.map(renderOption)}
        </select>
      </div>
    );
  };

  /** If the field is a text, email, or phone input, this renders it */
  const renderInput = (): JSX.Element => {
    return (
      <div className="FullPage__FormField__RenderInput">
        <label className="FullPage__FormField__Label" for={id}>
          <TextStyle variant="body3" text={label} />
          {!required ? (
            <TextStyle variant="body3" text={`(${optionalLabel})`} />
          ) : (
            <TextStyle
              variant="body3"
              text={<span className="FullPage__FormField__Required"> * </span>}
            />
          )}
        </label>
        <input
          className="FullPage__FormField__Input"
          required={required}
          placeholder={placeholder}
          onChange={handleChange}
          id={id}
          type={type.toLowerCase()}
          value={value}
        />
      </div>
    );
  };

  /** Main render method, returns a select or an input. */
  if (type === "Select") {
    return renderSelect();
  } else {
    return renderInput();
  }
};
