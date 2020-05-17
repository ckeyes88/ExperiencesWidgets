import { h, Component } from "preact";
import { format } from "date-fns";
import "./TimeSlotHeader.scss";

export interface ITimeSlotHeaderProps {
    /** will either display the date details when selected or return null */
    selectedDate: Date | null;
}

/** exports the header with selected date format and details */
export class TimeSlotHeader extends Component<ITimeSlotHeaderProps> {
    /** renders */
    render() {
        const { selectedDate } = this.props;
        return (
            <div className="TimeSlotsHeader">
                <span>{format(selectedDate, "EEEE MMMM d, yyyy")}</span>
            </div>
        );
    }
}
