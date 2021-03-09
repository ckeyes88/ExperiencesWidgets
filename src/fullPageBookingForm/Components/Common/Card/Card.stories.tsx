/** @jsx h */
import { h } from "preact";
import { Card } from "./Card";
import { TextStyle } from "../TextStyle";

export default {
  title: "Full Page Booking Form/Common/Card",
  component: Card,
};

const Template = () => (
  <Card>
    <TextStyle text="Some text" variant="body1" />{" "}
  </Card>
);

export const Default = Template.bind({});
