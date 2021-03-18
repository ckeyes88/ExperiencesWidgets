/* @jsx h */
import { h, FunctionComponent, Fragment } from "preact";
import { TextStyle } from "../TextStyle";
import "./Form.scss";

export type FormProps = {
  /**Title of form. */
  title?: string;
  /**Fields shown in form. */
  fields: {
    name: string;
    type: "text" | "number" | "email" | "hidden" | "password";
    value: string | number;
    min?: number;
    max?: number;
    maxLength?: number;
    minLength?: number;
    placeholder?: string;
    onChange: (value: string) => void;
    disabled?: boolean;
    required?: boolean;
  }[];
  /**Whether entire form is disabled. */
  disabled?: boolean;
  /**Callback to handle submission of form. */
  onSubmit: () => void;
};

export const Form: FunctionComponent<FormProps> = ({
  title,
  fields,
  onSubmit,
  disabled,
}) => {
  const formClassNames = ["FullPage__form"];

  if (disabled) {
    formClassNames.push("FullPage__form--disabled");
  }

  return (
    <Fragment>
      {title && <TextStyle variant="display2" text={title} />}
      <form className={formClassNames.join(" ")} onSubmit={onSubmit}>
        {fields.map((field, idx) => {
          const inputClassNames = ["FullPage__form__input"];

          // Add disabled styling to disabled form.
          if (field.disabled) {
            inputClassNames.push("FullPage__form__input--disabled");
          }

          return (
            <div
              key={`FullPage__form__${field.name}__${idx}`}
              className="FullPage__form-fields"
            >
              <label for={field.name}>
                <TextStyle variant="body3" text={field.name} />
              </label>
              <input
                className={inputClassNames.join(" ")}
                name={field.name}
                type={field.type}
                value={field.value}
                min={field.min}
                max={field.max}
                maxLength={field.maxLength}
                minLength={field.minLength}
                placeholder={field.placeholder}
                disabled={disabled || field.disabled}
                required={field.required}
              />
            </div>
          );
        })}
      </form>
    </Fragment>
  );
};
