/** @jsx h */
import { h, FunctionComponent, Fragment } from "preact";
import { BookingFormPage } from "../../../Typings/BookingFormPage";
import { Button } from "../../Common/Button";
import { TextStyle } from "../../Common/TextStyle";
import { useWizardModalAction } from "../../Common/WizardModal";

export const TimeslotSelection: FunctionComponent = () => {
  const { setPage } = useWizardModalAction();

  return (
    <Fragment>
      <h1>
        <TextStyle variant="display1" text="Timeslot selection" />
      </h1>
      <Button
        variant="contained"
        color="primary"
        text="Next"
        onClick={() => setPage(BookingFormPage.ORDER_DETAILS)}
      />
    </Fragment>
  );
};
