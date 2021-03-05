/** @jsx h */
import { h } from "preact";
import { TestButton } from "./TestButton";

export default {
  title: "Full Page/Button",
  component: TestButton,
};

const Template = (args: any) => <TestButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: "Button",
};
