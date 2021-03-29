/** @jsx h */
import { h, FunctionComponent } from "preact";
import "./Button.scss";

export type ButtonProps = {
  color?: "primary" | "danger" | "default" | "transparent";
  variant?: "contained" | "outlined" | "text";
  fullWidth?: boolean;
  disabled?: boolean;
  text: string;
  onClick?: () => void;
  type?: "button" | "submit";
};

export const Button: FunctionComponent<ButtonProps> = ({
  color = "default",
  variant = "contained",
  text,
  disabled,
  fullWidth,
  onClick,
  type,
}) => {
  const classNames = [
    "button",
    `button--color-${color}`,
    `button--variant-${variant}`,
  ];

  if (disabled) {
    classNames.push("button--disabled");
  }

  if (fullWidth) {
    classNames.push("button--full-width");
  }

  return (
    <button
      className={classNames.join(" ")}
      disabled={disabled}
      onClick={!disabled ? onClick : undefined}
      type={type ? type : "button"}
    >
      {text}
    </button>
  );
};
