
import { FormFieldDBO } from "../../types";
import { h, Component } from "preact";
import { FormField } from "./FormField";
import { AppDictionary } from "../../typings/Languages";

export interface ICustomFormProps {
  /** Array of fields that the form will display */
  fields: FormFieldDBO[];
  /** A string to display that descibe the purpose of the form */
  formDescription: string;
  /** A string to display the title of this form */
  formTitle: string;
  /** Method passed in to handle changes to the value of a field */
  handleChange(fieldName: string, value: string): void;
  /** Event custom labels set in admin experience interface */
  labels: Partial<AppDictionary>;
}

/** This is the component that renders a custom form with merchant-defined fields */
export class CustomForm extends Component<ICustomFormProps> {

  /** Renders a single field */
  renderFormField = (field: FormFieldDBO, i: number) => {
    const { labels } = this.props;

    return (
      <div className="FormField-Container">
        <FormField
          optionalLabel={labels.optionalFieldLabel}
          key={`${field.label}-${i}`}
          type={field.type}
          label={field.label}
          required={field.required}
          options={field.options}
          placeholder={field.placeholder}
          defaultValue={field.defaultValue}
          value={field.value}
          id={`${field.label}-${i}`}
          onFieldChange={this.props.handleChange}
        />
      </div>
    );
  }

  /** Renders each indivual field in the fields prop */
  renderFormFields = () => {
    //null 
    return this.props.fields.map(this.renderFormField);
  }

  /** Main render method */
  public render() {
    return (
      <div className="CustomForm-Container">
        {/** custom detail email, name etc */}
        {this.renderFormFields()}
      </div>
    );
  }
}
