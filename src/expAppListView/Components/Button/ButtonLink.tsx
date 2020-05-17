import {h, Component} from "preact";
export interface IButtonLink {
    href: string;
    label: string;
    style?: object;
    className?: string;
}

export class ButtonLink extends Component<IButtonLink> {
    public render() {
        const {href, label, style, className} = this.props;
        const styles = {...style};
        const classes = className ? `Button ${className}` : "Button";
        return (
            <a
              href={href}
              className={classes}
              target="_blank"
              style={styles}
            >
              {label}
            </a>
        );
    }
}