/** @jsx h */
import { h } from "preact";
import { Confirmation, ConfirmationProps } from "./Confirmation";

export default {
  title: "Full Page Booking Form/Views/Confirmation",
  component: Confirmation,
  argTypes: {},
};

const defaultArgs: ConfirmationProps = {
  email: "test@test.com",
  onClose: () => {},
};

const Template = (args: ConfirmationProps) => <Confirmation {...args} />;

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};
