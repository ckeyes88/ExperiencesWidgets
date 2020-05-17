import { h, Component } from "preact";

import {
    getClassName,
} from "./Utils";

type CalendarDayProps = {
    /** Date for this calendar day */
    date: Date;
    /** The formated date to be displayed on */
    dateLabel: string;
    /** any custom styles that have been passed down from on high*/
    // tslint:disable-next-line: no-any
    style: { [key: string]: any }; // explicitly set to any to allow any styles to be passed in
    /** The function to fire when a date has been selected */
    onSelect(date: Date): void;
    /** the function to fire when a date has been hovered */
    onHover(date: Date): void;
    /** the function to fire when a date has been unhovered */
    onUnHover(): void;
    /** the function to fire when a date has been focused */
    onFocus(date: Date): void;
    /** determine if a date is selected */
    isSelected: boolean;
    /** determine if a date is disabled */
    isDisabled: boolean;
    /** determine if a date is today */
    isToday: boolean;
    /** determine if a date is hovered */
    isHovered: boolean;
    /** determine if a date is focused */
    isFocused: boolean;
    /** determine if a date is in range */
    isInRange: boolean;
    /** determine if a date is highlighted */
    isHighlighted: boolean;
};

/** Represents a single day in the calendar grid */
export class CalendarDay extends Component<CalendarDayProps> {

    private element: null | HTMLButtonElement;

    /**
     * Handles click event passing the date information upwards.
     */
    private handleClick = (ev: MouseEvent) => {
        if (!this.props.isDisabled) {
            this.props.onSelect(this.props.date);
        }
    }

    /**
     * Handles the mouse over event for the calendar day.
     */
    private handleMouseOver = (ev: MouseEvent) => {
        if (!this.props.isDisabled) {
            this.props.onHover(this.props.date);
        }
    }

    /**
     * Handles the mouse over event for the calendar day.
     */
    // private handleMouseLeave = (ev: MouseEvent) => {
    //     if (!this.props.isDisabled) {
    //         this.props.onUnHover();
    //     }
    // }

    /**
     * Handles the focus event for the calendar day.
     */
    private handleOnFocus = (ev: FocusEvent) => {

        if (!this.props.isDisabled) {
            this.props.onFocus(this.props.date);
        }
    }

    /**
     * Binds a reference to this component's button element
     */
    private bindRef = (c: null | HTMLButtonElement) => {
        this.element = c;
    }

    /**
     * Checks to see if selected state has changed and focuses
     * the related element if the component is selected
     */
    public componentWillReceiveProps(nextProps: CalendarDayProps) {
        if (nextProps.isSelected && (nextProps.isSelected !== this.props.isSelected)) {
            if (this.element) {
                this.element.focus();
            }
        }
    }

    /**
     * Renders the component.
     */
    public render({ date, dateLabel, isSelected, style }: CalendarDayProps) {
        return (
            <button
                ref={this.bindRef}
                role="gridcell"
                title={dateLabel}
                aria-label={dateLabel}
                aria-selected={isSelected ? "true" : "false"}
                tabIndex={isSelected ? 0 : -1}
                className={`CalendarDay ${getClassName(this.props)}`}
                style={style}
                onClick={this.handleClick}
                onMouseEnter={this.handleMouseOver}
                onMouseLeave={this.props.onUnHover}
                onFocus={this.handleOnFocus}
            >
                {date.getDate()}
            </button>
        );
    }

}