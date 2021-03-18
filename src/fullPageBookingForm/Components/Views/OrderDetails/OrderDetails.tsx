/** @jsx h */
import { h, FunctionComponent } from "preact";
import { useState } from "preact/hooks";
import { BookingFormPage } from "../../../Typings/BookingFormPage";
import { Button } from "../../Common/Button";
import { Form, FormProps } from "../../Common/Form";
import {
  QuantitySelection,
  QuantitySelectionProps,
} from "../../Common/QuantitySelection";
import { TextStyle } from "../../Common/TextStyle";
import { useWizardModalAction } from "../../Common/WizardModal";
import "./OrderDetails.scss";

export type OrderDetailsProps = {
  /**Title of event. */
  eventTitle: string;
  /**URL associated with event. */
  eventImageUrl: string;
  /**Date of event. */
  dateOfEvent: string;
  /**Start time of event. */
  startTimeEvent: string;
  /**End time of event. */
  endTimeEvent: string;
  /**Remaining spots in event. */
  remainingSpots: number;
  /**Cost of event. */
  cost: number;
  /**Quantity associated with cost (e.g. "/ person") */
  costQuantity: string;
  /**Whether component is undergoing storybook testing.  */
  isStorybookTest?: boolean;
  /**Callback  */
  onBackClick: () => void;
  /**Quantity selection information for variant in experience.*/
  quantitySelections: QuantitySelectionProps;
  /**Default customer form fields. */
  customerFormFields: FormProps;
};

export const OrderDetails: FunctionComponent<OrderDetailsProps> = ({
  eventTitle,
  eventImageUrl,
  dateOfEvent,
  startTimeEvent,
  endTimeEvent,
  remainingSpots,
  isStorybookTest,
  cost,
  costQuantity,
  quantitySelections,
  customerFormFields,
}) => {
  const [isSaveContinueDisabled, setIsSaveContinueDisabled] = useState(true);
  //Define set page function, with stub if testing.
  let setPage = isStorybookTest
    ? (temp: number) => {}
    : useWizardModalAction().setPage;

  return (
    <div className="OrderDetails">
      <div className="OrderDetails__Summary">
        <div className="OrderDetails__Summary__Title">
          <img
            className="OrderDetails__Summary__Image"
            href={eventImageUrl}
            alt="Experience image"
          />
          <TextStyle text={eventTitle} variant="display1" />
        </div>
        <TextStyle variant="display2" text={dateOfEvent} />
        <div>
          <div className="OrderDetails__Summary__Time-Slot">
            <TextStyle
              variant="body1"
              text={`${startTimeEvent} - ${endTimeEvent}`}
            />
            <TextStyle variant="body1" text="|" />
            <TextStyle
              variant="body3"
              text={
                remainingSpots > 1
                  ? `${remainingSpots} spots left`
                  : `${remainingSpots} spot left`
              }
            />
          </div>
        </div>
        <div>
          <TextStyle variant="body2" text={`From $${cost} `} />
          <TextStyle variant="body1" text={costQuantity} />
        </div>
      </div>

      <div className="OrderDetails__Input">
        <div className="OrderDetails__Input__Quantity-Selection">
          <QuantitySelection {...quantitySelections} />
        </div>

        <div className="OrderDetails__Input__Customer-Form">
          <Form {...customerFormFields} />
        </div>
        <div className="OrderDetails__Input__Save">
          <Button
            variant="contained"
            color="primary"
            text="Save & continue"
            fullWidth
            disabled={isSaveContinueDisabled}
            onClick={() => {
              setPage(BookingFormPage.SUBMISSION_LOADER);
            }}
          />
        </div>
      </div>
    </div>
  );
};
