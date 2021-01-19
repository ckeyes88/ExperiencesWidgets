import './VariantHeader.scss';

import { parseISO } from 'date-fns/fp'
import { format } from 'date-fns';
import { Component, h } from 'preact';

import { Availability } from '../../typings/Availability';
import { AppDictionary, localeMap } from '../../typings/Languages';

export interface IVariantHeaderProps {
  /** creating the variant selected date to date formant when selected or null when not */
  variantSelectedDate: Date | null;
  /** creating variant time slot to hold the availabilty details of selected date */
  variantTimeSlot: Availability;
  /** function will allow the page to go back when the button is clicked */
  onClickBack(): void;
  /** creating the currently selected todal to a number so it can be added up */
  currentlySelectedTotal: number;
  /** Indicate which language you want the calendar to display in */
  locale: string;
  /** Event custom labels set in admin experience interface */
  labels: Partial<AppDictionary>;
}

/** export the variant header to show the selected date time and remaining spots */
export class VariantHeader extends Component<IVariantHeaderProps> {
  /** renders */
  render() {
    const { variantSelectedDate, labels, locale } = this.props;
    const isoWithoutTZ = this.props.variantTimeSlot.formattedTimeslot.isoWithoutTZ;
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
              {format(new Date(variantSelectedDate), "EEEE MMMM d, yyyy", { locale: localeMap[locale] })}
            </span>
            <p>
              <span id="VariantHeader-StartTime">
                {format(parseISO(isoWithoutTZ), "h:mma").toLowerCase()}
              </span>
              {!!labels.showSlotsRemainingLabel && <span id="VariantHeader-SpotsAvailable">
                {this.props.labels.getSlotsRemainingLabel(spaceLeft)}
              </span>}
            </p>
          </div>
        </div>
      </div>
    );
  }
}
