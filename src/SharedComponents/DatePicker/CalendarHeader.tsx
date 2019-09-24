import { h, Component } from "preact";

import {
  monthsOfYear,
} from "./Utils";

type CalendarHeaderProps = {
  /** Function to fire when the user clicks/selects the back button */
  onBack(): void;
  /** Function to fire when the user clicks/selects the forward button */
  onForward(): void;
  /** the currently selected month */
  month: number;
  /** the currently set language locale */
  locale: string;
  /** flag to disable the entire form */
  disabled: boolean;
  /** the currently selected year */
  year: number;
};

/**
 * Component to display the currently selected month and year along with back and forward
 * buttons to change the month
 */
export class CalendarHeader extends Component<CalendarHeaderProps> {

  /** render */
  render({ disabled, locale, month, year, onBack, onForward }: CalendarHeaderProps) {
    return (
      <div className="CalendarHeader">
        {
          //Only render the back button if not displaying the current month
          !(month - 1 === new Date().getMonth() && year === new Date().getFullYear()) &&
          <button
            className="BackButton"
            title="Previous Month"
            onClick={onBack}
            disabled={disabled || !onBack}
          >&#8592;
          </button>
        }
        <h1 className="MonthDisplay" aria-live="assertive">
          {monthsOfYear(locale)[month - 1]}
          <span className="MonthDisplay-Year"> {year}</span>
        </h1>
        <button
          className="NextButton"
          title="Next Month"
          onClick={onForward}
          disabled={disabled || !onForward}
        >
          &#8594;
        </button>
      </div>
    );
  }
}