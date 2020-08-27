import './TimeSlot.scss';

import moment from 'moment-timezone';
import { Component, h } from 'preact';

import { Availability } from '../../typings/Availability';

export interface ITimeSlotProps {
  /** the currently selected date */
  timeslot: Availability;
  /** hold details of the selected availabitiy */
  onSelectTimeSlot(timeslot: Availability): void;
}

/** exports a single component with time and spots avaiables */
export class TimeSlot extends Component<ITimeSlotProps> {
  /** holds details of selected availabity props */
  onSelectTimeSlot = () => {
    this.props.onSelectTimeSlot(this.props.timeslot);
  };
  /**rendering */
  render() {
    const { timeslot } = this.props;
    const { unitsLeft, startsAt, timezone } = timeslot;
    const adjustedStartTimes = moment(startsAt).tz(timezone).format("h:mma");
    return (
      <div className="TimeSlot-Container">
        <div className="TimeSlot-AvailableGrid">
          <p className="TimeSlot-Details">
            <span className="TimeSlot-TimeAvailable">{adjustedStartTimes}</span>
            <div className="TimeSlot-SpotAvailable">
              {unitsLeft} spot{unitsLeft !== 1 && "s"} left
            </div>
          </p>
          <div className="TimeSlot-Action">
            <button
              onClick={this.onSelectTimeSlot}
              className="TimeSlot-SelectBtn"
            >
              Select
            </button>
          </div>
        </div>
      </div>
    );
  }
}
