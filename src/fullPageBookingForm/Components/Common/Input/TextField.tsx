/** @jsx h */
import { h, Fragment, FunctionComponent } from "preact";
import { JSXInternal } from "preact/src/jsx";
import { InputLabel } from "./InputLabel";
import "./Input.scss";

export type TextFieldProps = {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  textCentered?: boolean;
  value?: string;
  onChange?: (value: string) => void;
};

export const TextField: FunctionComponent<TextFieldProps> = ({
  name,
  label,
  placeholder,
  required,
  disabled,
  fullWidth,
  textCentered,
  value,
  onChange,
}) => {
  const handleChange: JSXInternal.DOMAttributes<
    HTMLInputElement
  >["onChange"] = (event) => {
    if (onChange) {
      onChange(event.currentTarget.value);
    }
  };

  const inputFieldClassNames = ["input__field"];

  if (textCentered) {
    inputFieldClassNames.push("input__field--text-centered");
  }

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
        <InputLabel name={name} label={label} required={required} />
        <input
          className={inputFieldClassNames.join(" ")}
          id={name}
          name={name}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          value={value}
          type="text"
          onChange={handleChange}
        />
      </div>
    </Fragment>
  );
};
