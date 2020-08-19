import './VariantHeader.scss';

import { format } from 'date-fns';
import { Component, h } from 'preact';

import { Availability } from '../../typings/Availability';

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

/** export the variant header to show the selected date time and remaining spots */
export class VariantHeader extends Component<IVariantHeaderProps> {
  /** renders */
  render() {
    const { variantSelectedDate } = this.props;
    const startsAt = this.props.variantTimeSlot.startsAt;
    const unitsLeft = this.props.variantTimeSlot.unitsLeft || 0;
    let spaceLeft = unitsLeft - this.props.currentlySelectedTotal;
    return (
      <div>
        <div className="VariantHeader-Container">
          <button
            onClick={this.props.onClickBack}
            className="VariantHeader-BackBtn"
          >
            Back
          </button>
          <div className="VariantHeader-MobileContainer">
            <span className="VariantHeader-DateSelected">
              {format(new Date(variantSelectedDate), "EEEE MMMM d, yyyy")}
            </span>
            <p>
              <span id="VariantHeader-StartTime">
                {format(new Date(startsAt), "h:mma")}
              </span>
            </p>
            <p>
              <span id="VariantHeader-SpotsAvaliable">
                {" "}
                {spaceLeft} spot{spaceLeft > 1 && "s"} left
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
