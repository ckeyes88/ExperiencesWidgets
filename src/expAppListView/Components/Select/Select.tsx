import { h, Component } from "preact";

export type OptionDefinition = {
  /** The label displayed to screen */
  label: string;
  /** The underlying value of the option */
  value: string;
};

export type SelectProps = {
  /** Optional class name */
  className?: string;
  /** Optional label */
  label?: string;
  /** The options of the dropdown */
  options: OptionDefinition[];
  /** The currently selected value */
  value: string;
  /** The select handler */
  onSelectOption(event: unknown): void;
};

/**
 * A re-usable select dropdown component.
 */
export class Select extends Component<SelectProps> {
  /**
   * Render each option with its appropriate value & label.
   */
  private renderOption({ label, value }: OptionDefinition) {
    return (
      <option key={value} value={value}>
        {label}
      </option>
    );
  }

  /**
   * Render the select dropdown component.
   */
  public render() {
    const { 
      className, 
      label, 
      options, 
      onSelectOption, 
      value, 
    } = this.props;
    let componentClasses = "Select";
    let selectClasses = "Select-Select";

    if (className) { componentClasses += className; }
    if (label) { selectClasses += " withLabel"; }

    return (
      <div className={componentClasses}>
        {label && (
          <span className="Select-Label">
            {label}
          </span>
        )}
        <select
          className={selectClasses}
          onChange={onSelectOption}
          value={value}
        >
          {options.map(this.renderOption)}
        </select>
      </div>
    );
  }
}