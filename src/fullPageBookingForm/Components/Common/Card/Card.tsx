/** @jsx h */
import { h, FunctionComponent } from "preact";
import "./Card.scss";

export const Card: FunctionComponent = ({ children }) => (
  <div className="card">{children}</div>
);
