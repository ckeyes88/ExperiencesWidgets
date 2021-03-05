/** @jsx h */
import { h } from "preact";
import { Button, ButtonProps } from "./Button";

export default {
  title: "Full Page Booking Form/Common/Button",
  component: Button,
  argTypes: {
    color: {
      control: {
        type: "select",
        options: ["primary", "danger", "default"],
      },
    },
    variant: {
      control: {
        type: "select",
        options: ["contained", "outlined", "text"],
      },
    },
  },
};

const Template = (args: ButtonProps) => <Button {...args} />;

const defaultArgs: ButtonProps = {
  color: "primary",
  variant: "contained",
  fullWidth: false,
  disabled: false,
  text: "Button",
};

export const Primary = Template.bind({});
Primary.args = {
  ...defaultArgs,
  color: "primary",
};

export const Danger = Template.bind({});
Danger.args = {
  ...defaultArgs,
  color: "danger",
};

export const Text = Template.bind({});
Text.args = {
  ...defaultArgs,
  color: "default",
  variant: "text",
};

export const Outlined = Template.bind({});
Outlined.args = {
  ...defaultArgs,
  variant: "outlined",
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...defaultArgs,
  disabled: true,
};

export const FullWidth = Template.bind({});
FullWidth.storyName = "Full Width";
FullWidth.args = {
  ...defaultArgs,
  fullWidth: true,
};
