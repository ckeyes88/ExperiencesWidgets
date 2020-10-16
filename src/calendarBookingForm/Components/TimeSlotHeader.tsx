import { h, Component } from "preact";
import { format } from "date-fns";
import { localeMap } from "../../typings/Languages";
import "./TimeSlotHeader.scss";

export interface ITimeSlotHeaderProps {
    /** will either display the date details when selected or return null */
    selectedDate: Date | null;
    /** Indicate which language you want the calendar to display in */
    locale: string;
}

/** exports the header with selected date format and details */
export class TimeSlotHeader extends Component<ITimeSlotHeaderProps> {
    /** renders */
    render() {
        const { selectedDate, locale } = this.props;
        return (
            <div className="TimeSlotsHeader">
                <span>{format(selectedDate, "EEEE MMMM d, yyyy", { locale: localeMap[locale] })}</span>
            </div>
        );
    }
}
