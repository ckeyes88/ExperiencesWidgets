/* @jsx h */
import { h, FunctionComponent, Fragment } from "preact";
import { FormFieldDBO } from "../../../../types";
import { Button } from "../Button";
import { TextStyle } from "../TextStyle";
import "./Form.scss";

export type FormProps = {
  /**Title of form. */
  title?: string;
  /**Fields shown in form. */
  fields: {
    label: FormFieldDBO["label"];
    type: FormFieldDBO["type"];
    value: string | number;
    min?: number;
    max?: number;
    maxLength?: number;
    minLength?: number;
    placeholder?: string;
    options?: string[];
    defaultValue?: string;
    disabled?: boolean;
    required?: boolean;
  }[];
  /**Whether entire form is disabled. */
  disabled?: boolean;
  /**Whether the parent of the form is disabling the submit button of the form. */
  isSubmitDisabled: boolean;
  /**Whether submit button should be shown on form per parent logic, if applicable. */
  showSubmitButton: boolean;
  /**Callback to handle submission of form. */
  onSubmit: () => void;
};

export const Form: FunctionComponent<FormProps> = ({
  title,
  fields,
  onSubmit,
  disabled,
  isSubmitDisabled,
  showSubmitButton,
}) => {
  const formClassNames = ["FullPage__form"];
  const titleClassNames = ["FullPage__form__title"];

  if (disabled) {
    formClassNames.push("FullPage__form--disabled");
    titleClassNames.push("FullPage__form--disabled");
  }

  return (
    <Fragment>
      {title && (
        <div className={titleClassNames.join(" ")}>
          <TextStyle variant="display2" text={title} />
        </div>
      )}
      <form className={formClassNames.join(" ")} onSubmit={onSubmit}>
        {fields.map((field, idx) => {
          const inputClassNames = ["FullPage__form__input"];

          // Add disabled styling to disabled form.
          if (field.disabled) {
            inputClassNames.push("FullPage__form__input--disabled");
          }

          return (
            <div
              key={`FullPage__form__${field.label}__${idx}`}
              className="FullPage__form-fields"
            >
              <label for={field.label}>
                <TextStyle variant="body3" text={field.label} />
              </label>
              <input
                className={inputClassNames.join(" ")}
                name={field.label}
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
        <div className="FullPage__form__header-rule" />
        {showSubmitButton && (
          <div className="FullPage__form__submit">
            <Button
              variant="contained"
              color="primary"
              text="Save & continue"
              fullWidth
              type="submit"
              disabled={isSubmitDisabled}
              onClick={onSubmit}
            />
          </div>
        )}
      </form>
    </Fragment>
  );
};
