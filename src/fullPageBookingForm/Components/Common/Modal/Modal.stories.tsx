/** @jsx h */
import { h } from "preact";
import { Modal, ModalProps } from "./Modal";

export default {
  title: "Full Page Booking Form/Common/Modal",
  component: Modal,
};

const defaultArgs: ModalProps = {};

const Template = (args: ModalProps) => <Modal {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  ...defaultArgs,
};
