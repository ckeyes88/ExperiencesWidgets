/** @jsx h */
import { h, FunctionComponent } from "preact";
import "./TextStyle.scss";

export type TextStyleProps = {
  variant: "display1" | "display2" | "body1" | "body2" | "body3";
  text: string;
};
export const TextStyle: FunctionComponent<TextStyleProps> = ({
  variant,
  text,
}) => <span className={`text-style text-style--${variant}`}>{text}</span>;
