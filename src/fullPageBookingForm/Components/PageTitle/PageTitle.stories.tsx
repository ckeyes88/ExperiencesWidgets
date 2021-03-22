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
    thumbnailSrc="https://www.helpguide.org/wp-content/uploads/table-with-grains-vegetables-fruit-768.jpg"
  />
);
