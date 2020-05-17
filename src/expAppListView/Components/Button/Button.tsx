import {h, Component} from "preact";

export interface IAvailabilityListProps {
    action: any;
    label: string;
    style?: object;
    className?: string;
}

export class Button extends Component<IAvailabilityListProps> {
    public render() {
        const {action, label, style, className} = this.props;
        const styles = {...style};
        const classes = className ? `Button ${className}` : "Button";
        return (
            <div style={styles} onClick={action} className={classes}>
                {label}
            </div>
        );
    }
}

