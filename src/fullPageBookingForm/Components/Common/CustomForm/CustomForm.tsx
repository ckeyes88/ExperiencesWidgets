/** @jsx h */
import { h, FunctionComponent, Fragment } from "preact";
import { Person } from "../../../../SharedComponents/Icons/Person";
import { AppDictionary } from "../../../../typings/Languages";
import { CustomFieldType, CustomFormValue } from "../../../Typings/CustomForm";
import { FormField } from "../FormField";
import { CloseIcon } from "../Icon/CloseIcon";
import { FormIcon } from "../Icon/FormIcon";
import { Modal } from "../Modal";
import { TextStyle } from "../TextStyle";
import "./CustomForm.scss";

export type PerOrderTypeProps = {
  /** Array of fields that the form will display */
  formValues: CustomFormValue[];
  /** A string to display that descibe the purpose of the form */
  formDescription?: string;
  /** A string to display the title of this form */
  formTitle?: string;
};

export type PerAttendeeTypeProps = {
  /** Array of fields that the form will display */
  formValues: CustomFormValue[];
  /**Attributes associated with the remove variant modal. */
  removeVariantModal: {
    /**Whether the modal is open. */
    isOpen: boolean;
    /**Setting if the variant modal is open, with the name of variant to be removed. */
    setIsRemoveVariantModalOpen: (
      isOpen: boolean,
      variantToRemove: {
        name: string;
        idx: number;
      },
    ) => void;
    /**Callback passed by parent to remove a variant from per attendee list on click. */
    removeVariant: () => void;
  };
};

export type CustomFormProps = {
  /**Type of custom form rendered in checkout flow. */
  formType: PerAttendeeTypeProps | PerOrderTypeProps;
  /** Method passed in to handle changes to the value of a field */
  handleChange(variantIdx: number, fieldName: string, value: string): void;
  /** Event custom labels set in admin experience interface */
  labels: Partial<AppDictionary>;
};

/** This is the component that renders a custom form with merchant-defined fields */
export const CustomForm: FunctionComponent<CustomFormProps> = ({
  formType,
  handleChange,
  labels,
}) => {
  /** Renders a single field */
  const renderFormField = (
    field: CustomFieldType,
    i: number,
    variantIdx: number,
  ) => {
    const type =
      field.type === "Select"
        ? {
            options: field.options,
          }
        : field.type;

    //Only supply optional label if field is not required.
    const optionalLabel = !field.isRequired ? labels.optionalFieldLabel : "";

    /**Handles changes to form fields per variant IDX in parent.*/
    const handleIdxChange = (fieldName: string, fieldValue: string) => {
      handleChange(variantIdx, fieldName, fieldValue);
    };

    return (
      <div className="FormField-Container">
        <FormField
          optionalLabel={optionalLabel}
          key={`${field.label}%%%${i}%%%${variantIdx}`}
          type={type}
          label={field.label}
          placeholder={field.placeholder}
          defaultValue={field.defaultValue}
          value={field.value}
          id={`${field.label}%%%${i}%%%${variantIdx}`}
          onFieldChange={handleIdxChange}
        />
      </div>
    );
  };
  const renderPerOrderTitle = (formTitle: string | undefined) => (
    <div className="CustomOrder__Title">
      <FormIcon />
      {formTitle ? (
        <TextStyle variant="display2" text={formTitle} />
      ) : (
        <TextStyle variant="display2" text={"Additional order details"} />
      )}
    </div>
  );

  /**Renders each individual field in the form for a per order form. */
  const renderPerOrderForm = (form: PerOrderTypeProps) => {
    const { formTitle, formDescription, formValues } = form;
    //Per order form only has one set of fields.
    const fields = formValues[0].fields;

    return (
      <Fragment>
        {renderPerOrderTitle(formTitle)}
        {formDescription && (
          <div className="CustomOrder__Description">
            <TextStyle variant="body1" text={formDescription} />
          </div>
        )}
        {fields.map((field, idx) => renderFormField(field, idx, 0))}
        <div className="CustomForm__Header-Rule" />
      </Fragment>
    );
  };

  /**Renders each individual field in the form, for each
   * individual attendee.
   */
  const renderPerAttendeeForm = (form: PerAttendeeTypeProps) => {
    const { formValues, removeVariantModal } = form;

    return (
      <Fragment>
        <Modal
          title="Remove attendee"
          cancelButtonText="Cancel"
          confirmButtonText="Yes, remove"
          content='Are you sure you want to remove "Adult"? 
          You will lose all additional information you have entered.'
          isOpen={removeVariantModal.isOpen}
          onClickCancelButton={() =>
            removeVariantModal.setIsRemoveVariantModalOpen(false, {
              name: "",
              idx: 0,
            })
          }
          onClickConfirmButton={removeVariantModal.removeVariant}
        />
        {formValues.map((value, variantIdx) => (
          <div
            className="CustomForm__Attendee"
            key={`CustomForm_${value.name}_${variantIdx}`}
          >
            <div className="CustomForm__Attendee__Variant">
              <div className="CustomForm__Attendee__Icon">
                <Person />
              </div>

              <TextStyle variant="display2" text={value.name} />
              {/**Disable ability to remove variant if this variant
               * is the only selected variant in the form.
               */}
              {formValues.length > 1 && (
                <button
                  className="CustomForm__Attendee__Remove"
                  onClick={() =>
                    removeVariantModal.setIsRemoveVariantModalOpen(true, {
                      idx: variantIdx,
                      name: value.name,
                    })
                  }
                  disabled={removeVariantModal.isOpen}
                >
                  <CloseIcon height={30} color="#888888" />
                </button>
              )}
            </div>

            {/**
             * We have the fields to be rendered, equal to variant name length *
             * number of fields per variant name. We select the fields relevant
             * to each variant name by slicing into the field array with each
             * variant name.
             */}
            {value.fields.map((field, fieldIdx) =>
              renderFormField(field, fieldIdx, variantIdx),
            )}
            <div className="CustomForm__Header-Rule" />
          </div>
        ))}
      </Fragment>
    );
  };

  /** Main render method */
  return (
    <div className="CustomForm-Container">
      {formType.hasOwnProperty("removeVariantModal")
        ? renderPerAttendeeForm(formType as PerAttendeeTypeProps)
        : renderPerOrderForm(formType as PerOrderTypeProps)}
    </div>
  );
};
