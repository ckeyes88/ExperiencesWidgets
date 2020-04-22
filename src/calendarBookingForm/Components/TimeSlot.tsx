import { h, Component } from "preact";
import moment from "moment-timezone";
import "./TimeSlot.scss";
import { Availability } from "../../typings/Availability";


export interface ITimeSlotProps {
  /** the currently selected date */
  timeslot: Availability;
  /** hold details of the selected availabitiy */
  onSelectTimeSlot(timeslot: Availability): void;
}

export interface ITimeSlotState { }

/** exports a single component with time and spots avaiables */
export class TimeSlot extends Component<ITimeSlotProps, ITimeSlotState> {
  /** holds details of selected availabity props */
  onSelectTimeSlot = () => {
    this.props.onSelectTimeSlot(this.props.timeslot);
  }
  /**rendering */
  render() {
    const { timeslot } = this.props;
    const { unitsLeft, startsAt, timezone } = timeslot;
    const adjustedStartTimes = moment(startsAt).tz(timezone).format("h:mma");
    return (
      <div className="Timeslot-Container">
        <div className="TimeSlot-AvailableGrid">
          <p><span className="TimeSlot-TimeAvailable">{adjustedStartTimes}</span>
            <span className="TimeSlot-SpotAvailable">{unitsLeft} spots left</span></p>
          <button onClick={this.onSelectTimeSlot} className="TimeSlot-SelectBtn">Select</button>
        </div>
      </div>
    );
  }
}