import { h, Component } from "preact";
import { format } from "date-fns";

import "./VariantHeader.scss";
import { Availability } from "../../typings/Availability";

export interface IVariantHeaderProps {
  /** creating the variant selected date to date formant when selected or null when not */
  variantSelectedDate: Date | null;
  /** creating variant time slot to hold the availabilty details of selected date */
  variantTimeSlot: Availability;
  /** function will allow the page to go back when the button is clicked */
  onClickBack(): void;
  /** creating the currently selected todal to a number so it can be added up */
  currentlySelectedTotal: number;
}

export interface IVariantHeaderState { }

/** export the variant header to show the selected date time and remaining spots */
export class VariantHeader extends Component<IVariantHeaderProps, IVariantHeaderState> {

  /** renders */
  render() {
    const { variantSelectedDate } = this.props;
    const startsAt = this.props.variantTimeSlot.startsAt;
    const unitsLeft = this.props.variantTimeSlot.unitsLeft || 0;
    return (
      <div>
        <div className="VariantHeader-Container">
          <button onClick={this.props.onClickBack} className="VariantHeader-BackBtn">Back</button>
          <span className="VariantHeader-DateSelected">{format(new Date(variantSelectedDate), "EEEE MMMM d, yyyy")}</span>
          <p><span id="VariantHeader-StartTime">{format(new Date(startsAt), "h:mma")}</span>
            <span id="VariantHeader-SpotsAvaliable"> | {unitsLeft - this.props.currentlySelectedTotal} spots Left</span></p>
        </div>
      </div>
    );
  }
}