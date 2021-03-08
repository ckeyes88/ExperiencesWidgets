/** @jsx h */
import { h, Fragment, FunctionComponent } from "preact";
import { JSXInternal } from "preact/src/jsx";
import { TextFieldProps } from "./TextField";
import "./Input.scss";

export type SelectOption = {
  value: string;
  text: string;
};

export type SelectFieldProps = Omit<TextFieldProps, "textCentered"> & {
  options: SelectOption[];
};

export const SelectField: FunctionComponent<SelectFieldProps> = ({
  name,
  label,
  placeholder,
  required,
  disabled,
  fullWidth,
  value,
  options,
  onChange,
}) => {
  const handleChange: JSXInternal.DOMAttributes<
    HTMLSelectElement
  >["onChange"] = (event) => {
    if (onChange) {
      onChange(event.currentTarget.value);
    }
  };

  const inputFieldClassNames = ["input__field"];

  if (disabled) {
    inputFieldClassNames.push("input__field--disabled");
  }

  const inputClassNames = ["input"];

  if (fullWidth) {
    inputClassNames.push("input--full-width");
  }

  return (
    <Fragment>
      <div className={inputClassNames.join(" ")}>
        <label className="input__label" for={name}>
          <span className="input__label__text">{label}</span>
          {!required && <span className="input__label__marker">opt</span>}
        </label>
        <select
          className={inputFieldClassNames.join(" ")}
          id={name}
          name={name}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          value={value}
          onChange={handleChange}
        >
          <option disabled={required} value="" selected>
            {placeholder || "Make selection"}
          </option>
          {options.map(({ value, text }) => (
            <option key={value} value={value}>
              {text}
            </option>
          ))}
        </select>
      </div>
    </Fragment>
  );
};
