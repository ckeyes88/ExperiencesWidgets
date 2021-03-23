/** @jsx h */
import { h } from "preact";
import { PageTitle } from "./PageTitle";

export default {
  title: "Full Page Booking Form/App/Page Title",
  component: PageTitle,
};

export const Basic = () => (
  <PageTitle
    title="Conquer Mount Storm King"
    thumbnailSrc="https://f6d3w8j9.rocketcdn.me/wp-content/uploads/2019/09/Hiking-Packing-List.sq.jpg"
  />
);
