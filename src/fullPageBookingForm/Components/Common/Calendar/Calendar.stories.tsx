/** @jsx h */
import { h } from "preact";
import { Calendar, CalendarProps } from "./Calendar";

export default {
  title: "Full Page Booking Form/Common/Calendar",
  component: Calendar,
  argTypes: {
    date: {
      control: {
        type: "date",
      },
    },
  },
};

const Template = (args: CalendarProps) => (
  <div style={{ width: 300 }}>
    <Calendar {...args} date={new Date(args.date)} />
  </div>
);

const defaultProps: CalendarProps = {
  month: 2,
  year: 2021,
  date: new Date(),
  loading: false,
};

export const Basic = Template.bind({});
Basic.args = {
  ...defaultProps,
};

export const Loading = Template.bind({});
Loading.args = {
  ...defaultProps,
  loading: true,
};
