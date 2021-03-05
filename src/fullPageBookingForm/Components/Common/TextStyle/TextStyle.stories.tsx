/** @jsx h */
import { h } from "preact";
import { TextStyle, TextStyleProps } from "./TextStyle";

export default {
  title: "Full Page Booking Form/Common/Text Style",
  component: TextStyle,
  argTypes: {
    variant: {
      control: {
        type: "select",
        options: ["display1", "display2", "body1"],
      },
    },
  },
};

const Template = (args: TextStyleProps) => <TextStyle {...args} />;

export const Display1 = Template.bind({});
Display1.storyName = "Display 1";
Display1.args = {
  variant: "display1",
  text: "Display 1",
};

export const Display2 = Template.bind({});
Display2.storyName = "Display 2";
Display2.args = {
  variant: "display2",
  text: "Display 2",
};

export const Body1 = Template.bind({});
Body1.storyName = "Body 1";
Body1.args = {
  variant: "body1",
  text: "Body 1",
};

export const Body2 = Template.bind({});
Body2.storyName = "Body 2";
Body2.args = {
  variant: "body2",
  text: "Body 2",
};

export const Body3 = Template.bind({});
Body3.storyName = "Body 3";
Body3.args = {
  variant: "body3",
  text: "Body 3",
};
