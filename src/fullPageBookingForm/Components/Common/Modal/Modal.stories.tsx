/** @jsx h */
import { h } from "preact";
import { Modal, ModalProps } from "./Modal";

export default {
  title: "Full Page Booking Form/Common/Modal",
  component: Modal,
};

const defaultArgs: ModalProps = {
  title: "Remove attendee",
  content:
    'Are you sure you want to remove "Adult"? You will lose all additional information you have entered.',
  confirmButtonText: "Yes, remove",
  cancelButtonText: "Cancel",
};

const Template = (args: ModalProps) => <Modal {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  ...defaultArgs,
};
