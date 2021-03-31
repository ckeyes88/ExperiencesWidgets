/** @jsx h */
import { h, FunctionComponent, JSX } from "preact";
import { TextStyle } from "../TextStyle";
import "./FormField.scss";

/**Generic input types for HTML Input element. */
type InputTypes = "Text" | "Email" | "Phone";

/**HTML input element options if a select type is required. */
type SelectType = {
  options: string[];
};

export type FormFieldProps = {
  /** Designate what type of an input this is */
  type: InputTypes | SelectType;
  /** The label for this input field must be unique as it's used for the id */
  label: string;
  /** the value that is currently set in this field */
  value: string;
  /** If form field is required, an optional label is not specified. */
  optionalLabel?: string;
  /** Optional placeholder */
  placeholder?: string;
  /** default value given to this field */
  defaultValue?: string;
  /**Whether form field should be disabled. */
  disabled?: boolean;
  /** Optional id for the field */
  id?: string;
  /** Method to trigger when the value of the field changes */
  onFieldChange(fieldName: string, fieldValue: string): void;
};

export const FormField: FunctionComponent<FormFieldProps> = ({
  id,
  label,
  disabled,
  value,
  optionalLabel,
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
          {optionalLabel ? (
            <TextStyle variant="body3" text={`(${optionalLabel})`} />
          ) : (
            <TextStyle
              variant="body3"
              text={<span className="FullPage__FormField__Required"> * </span>}
            />
          )}
        </label>
        <select
          id={id}
          onChange={handleChange}
          value={value}
          className="FullPage__FormField__Select"
          required={optionalLabel === ""}
        >
          {typeof type !== "string" && type.options.map(renderOption)}
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
          {optionalLabel ? (
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
          required={optionalLabel === ""}
          placeholder={placeholder}
          onChange={handleChange}
          id={id}
          type={typeof type !== "string" ? "select" : type.toLowerCase()}
          value={value}
          disabled={disabled}
        />
      </div>
    );
  };

  /** Main render method, returns a select or an input. */
  if (typeof type !== "string") {
    return renderSelect();
  } else {
    return renderInput();
  }
};
