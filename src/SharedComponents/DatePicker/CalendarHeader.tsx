import { h, Component } from "preact";
import { AppDictionary, monthNames } from "../../typings/Languages";

type CalendarHeaderProps = {
  /** Function to fire when the user clicks/selects the back button */
  onBack(): void;
  /** Function to fire when the user clicks/selects the forward button */
  onForward(): void;
  /** the currently selected month */
  month: number;
  /** flag to disable the entire form */
  disabled: boolean;
  /** the currently selected year */
  year: number;
  /** Event custom labels set in admin experience interface */
  labels: Partial<AppDictionary>;
};

/**
 * Component to display the currently selected month and year along with back and forward
 * buttons to change the month
 */
export class CalendarHeader extends Component<CalendarHeaderProps> {

  /** render */
  render({ disabled, month, year, onBack, onForward, labels }: CalendarHeaderProps) {
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
          {labels[monthNames[month - 1]].split("::")[0]} {year}
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