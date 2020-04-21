import { h, Component } from "preact";

export type OptionDefinition = {
  label: string;
  value: string;
};

export type SelectProps = {
  className?: string;
  label?: string;
  options: OptionDefinition[];
  onSelectOption(event: MouseEvent): void;
  value: string;
};

export class Select extends Component<SelectProps> {
  /**
   * 
   */
  private renderOption({ label, value }: OptionDefinition) {
    return (
      <option value={value}>
        {label}
      </option>
    );
  }

  /**
   * 
   */
  public render() {
    const { 
      className, 
      label, 
      options, 
      onSelectOption, 
      value, 
    } = this.props;
    let classes = "Select";

    if (className) { classes += className; }

    return (
      <div className={classes}>
        {label && (
          <span className="Select-Label">
            {label}
          </span>
        )}
        <select
          className="Select-Select"
          onChange={onSelectOption}
          value={value}
        >
          {options.map(this.renderOption)}
        </select>
      </div>
    );
  }
}