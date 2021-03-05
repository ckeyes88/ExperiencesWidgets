/** @jsx h */
import { h, FunctionComponent } from "preact";

export type TestButtonProps = {
  text: string;
  subText?: string;
};

export const TestButton: FunctionComponent<TestButtonProps> = ({ text }) => (
  <button>{text}</button>
);
