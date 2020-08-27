import './TimeSlotList.scss';

import { format } from 'date-fns';
import { Component, h, JSX } from 'preact';

import { Availability } from '../../typings/Availability';
import { TimeSlot } from './TimeSlot';
import { TimeSlotHeader } from './TimeSlotHeader';

export interface ITimeSlotListMainProps {
  /** creating time slots to hold an array of needed detail for selected date availability */
  timeslots: Availability[];
  /** if a date is selected it will return that that or null if not*/
  selectedDate: Date | null;
  /** holds detail on the selected time slot */
  onSelectTimeSlot(timeslot: Availability): void;
  /** handles the first selected availability on the calendar that has an event */
  onSelectFirstAvailability(): void;
}
export interface ITimeSlotListMainState {
  /** making loading either true or false depending on its state*/
  loading: boolean;
}
/** exports time slot list and renders time slot availabitity details */
export class TimeSlotList extends Component<
  ITimeSlotListMainProps,
  ITimeSlotListMainState
> {
  constructor(props: ITimeSlotListMainProps) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  /**
   * Handles the logic for when a timeslot list is empty
   * or the user has not selected a date
   */
  renderTimeSlots = () => {
    const { timeslots, selectedDate } = this.props;
    if (!timeslots || !Array.isArray(timeslots) || !timeslots.length) {
      return (
        <div className="TimeSlots">
          <div className="TimeSlots-NotAvailable">
            <span className="TimeSlot-DateSelected">
              {format(new Date(this.props.selectedDate), "EEEE MMMM d, yyyy")}
            </span>
            <p>Nothing is available today</p>
            <button
              onClick={this.props.onSelectFirstAvailability}
              className="TimeSlots-NextAvailableBtn"
            >
              Go to next available
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="TimeSlotsHeader-Container">
          <TimeSlotHeader selectedDate={selectedDate} />
          {timeslots.map(this.renderTimeslot)}
        </div>
      );
    }
  };

  /**
   * This function is used to iterate over the list of
   * availability and return a timeslot component for
   * each one
   */
  renderTimeslot = (timeslot: Availability): JSX.Element => {
    return (
      <TimeSlot
        timeslot={timeslot}
        onSelectTimeSlot={this.props.onSelectTimeSlot}
      />
    );
  };

  /** render */
  render() {
    return (
      <div className="SelectedDateContainer">{this.renderTimeSlots()}</div>
    );
  }
}
