/** @jsx h */
import { h, FunctionComponent, JSX } from "preact";
import "./TextStyle.scss";

export type TextStyleProps = {
  variant: "display1" | "display2" | "display3" | "body1" | "body2" | "body3";
  text: string | JSX.Element;
};

export const TextStyle: FunctionComponent<TextStyleProps> = ({
  variant,
  text,
}) => <span className={`text-style text-style--${variant}`}>{text}</span>;
