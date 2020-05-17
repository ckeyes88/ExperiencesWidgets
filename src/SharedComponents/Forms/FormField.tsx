import { h, Component, JSX } from "preact";
import "./Forms.scss";

export interface IFormFieldProps {
  /** Designate what type of an input this is */
  type: "Text" | "Select" | "Email" | "Phone";
  /** The label for this input field must be unique as it's used for the id */
  label: string;
  /** Indicate whether the form field is required */
  required: boolean;
  /** Optional placeholder */
  placeholder?: string;
  /** options in the event that this is select field */
  options?: string[];
  /** default value given to this field */
  defaultValue?: string;
  /** the value that is currently set in this field */
  value?: string;
  /** Optional id for the field */
  id?: string;
  /** Method to trigger when the value of the field changes */
  onFieldChange(fieldName: string, fieldValue: string): void;
}
export interface IFormFieldState {
  /** the value that is currently set in this field */
  value: string;
}

/** This component renders a single form field */
export class FormField extends Component<IFormFieldProps, IFormFieldState> {
  constructor(props: IFormFieldProps) {
    super(props);
    this.state = {
      value: props.value || "",
    };
  }

  /** Sets the value state slice to the first available option, if applicable
   * Calls setDefaultSelect to pass the value up, this is in case the user never changes the value
   */
  componentWillMount() {
    const { options } = this.props;

    if (options && options[0] && options[0] !== this.state.value) {
      this.setState({
        value: options[0],
      }, this.setDefaultSelect);
    }
  }

  /** If the field is a select, this passes up the first available option as the selected value
   * This is in case the user never changes the value manually
   */
  setDefaultSelect = () => {
    const { id, options } = this.props;
    if (options && options[0]) {
      this.props.onFieldChange(id, options[0]);
    }
  }

  /** Sets the local state to current value of the field
   * Passes the value and the field's id into the designated method passed in as a prop
   */
  // tslint:disable-next-line: no-any
  onChange = (ev: any) => {
    this.setState({
      value: (ev.target as HTMLInputElement).value,
    });
    this.props.onFieldChange((ev.target as HTMLInputElement).id, this.state.value);
  }

  /** If the field is a select, this method renders it */
  renderSelect() {
    const { id, label, options } = this.props;
    return (
      <div className="FormField-RenderSelect">
        <label className="FormField-SelectLabel" for={id}>{label}</label>
        <select
          id={id}
          onChange={this.onChange}
        >
          {options.map(this.renderOption)}
        </select>
      </div>
    );
  }

  /** This renders a single option within a select */
  renderOption = (option: string, i: number): JSX.Element => {
    return <option key={`${option}-${i}`} selected={this.state.value === option} value={option}>{option}</option>;
  }

  /** If the field is a text, email, or phone input, this renders it */
  renderInput() {
    const { id, label, required, placeholder, type } = this.props;

    return (
      <div className="FormField-RenderInput">
        <input
          className="FormField-Input"
          required={required}
          placeholder={placeholder}
          onChange={this.onChange}
          id={id}
          type={type.toLowerCase()}
          value={this.state.value}
        />
        <label className="FormField-Label" for={id}>{label}</label>
      </div>
    );
  }

  /** Main render method, returns a select or an input */
  public render() {
    if (this.props.type === "Select") {
      return this.renderSelect();
    } else {
      return this.renderInput();
    }
  }
}
