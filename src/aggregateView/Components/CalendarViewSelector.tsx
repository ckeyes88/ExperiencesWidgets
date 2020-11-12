import { h, Component } from "preact";
import "./CalendarViewSelector.scss";

export class CalendarViewSelector extends Component {
    render() {
        return <div className="calendar-view-selector">
            <div>
                <span>icon</span>
                <span>Month</span>
            </div>
            <div>
                <span>icon</span>
                <span>List</span>
            </div>
        </div>
    }
}