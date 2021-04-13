/** @jsx h */
import { h } from "preact";
import { EventTitle, EventTitleProps } from "./EventTitle";

export default {
  title: "Full Page Booking Form/App/Event Title",
  component: EventTitle,
};

const Template = (args: EventTitleProps) => (
  <EventTitle
    {...args}
    title="Conquer Mount Storm King"
    thumbnailSrc="https://f6d3w8j9.rocketcdn.me/wp-content/uploads/2019/09/Hiking-Packing-List.sq.jpg"
  />
);

const defaultProps: EventTitleProps = {
  title: "Conquer Mount Storm King",
  thumbnailSrc:
    "https://f6d3w8j9.rocketcdn.me/wp-content/uploads/2019/09/Hiking-Packing-List.sq.jpg",
  inlineWithThumbnail: false,
};

export const Basic = Template.bind({});
Basic.args = {
  ...defaultProps,
};
