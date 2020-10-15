import './TimeSlot.scss';

import moment from 'moment-timezone';
import { Component, h } from 'preact';

import { Availability } from '../../typings/Availability';
import { AppDictionary } from '../../typings/Languages';

export interface ITimeSlotProps {
  /** the currently selected date */
  timeslot: Availability;
  /** hold details of the selected availabitiy */
  onSelectTimeSlot(timeslot: Availability): void;
  /** Event custom labels set in admin experience interface */
  labels: Partial<AppDictionary>;
}

/** exports a single component with time and spots avaiables */
export class TimeSlot extends Component<ITimeSlotProps> {
  /** holds details of selected availabity props */
  onSelectTimeSlot = () => {
    this.props.onSelectTimeSlot(this.props.timeslot);
  };
  /**rendering */
  render() {
    const { timeslot, labels } = this.props;
    const { unitsLeft, startsAt, timezone } = timeslot;
    const adjustedStartTimes = moment(startsAt).tz(timezone).format("h:mma");
    return (
      <div className="TimeSlot-Container">
        <div className="TimeSlot-AvailableGrid">
          <div className="TimeSlot-Details">
            <span className="TimeSlot-TimeAvailable">{adjustedStartTimes}</span>
            {!!labels.showSlotsRemainingLabel && <div className={`TimeSlot-SpotAvailable ${unitsLeft === 0 ? "SoldOut" : ""}`}>
              {unitsLeft > 0 ? this.props.labels.getSlotsRemainingLabel(unitsLeft) : "Sold Out"}
            </div>}
          </div>
          <div className="TimeSlot-Action">
            <button onClick={this.onSelectTimeSlot} className="TimeSlot-SelectBtn" disabled={!timeslot.unitsLeft}>
              {this.props.labels.selectDateLabel}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
