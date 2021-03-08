/** @jsx h */
import { h, FunctionComponent } from "preact";
import "./InputLabel.scss";

export type InputLabelProps = {
  name: string;
  label: string;
  required?: boolean;
};

export const InputLabel: FunctionComponent<InputLabelProps> = ({
  name,
  label,
  required,
}) => (
  <label className="input-label" for={name}>
    <span className="input-label__text">{label}</span>
    {!required && <span className="input-label__marker">opt</span>}
  </label>
);
