/** @jsx h */
import { h, FunctionComponent, Fragment } from "preact";
import { BookingFormPage } from "../../../Typings/BookingFormPage";
import { Button } from "../../Common/Button";
import { TextStyle } from "../../Common/TextStyle";
import { useWizardModalAction } from "../../Common/WizardModal";

export const OrderDetails: FunctionComponent = () => {
  const { setPage } = useWizardModalAction();

  return (
    <Fragment>
      <h1>
        <TextStyle variant="display1" text="Order details" />
      </h1>
      <Button
        variant="contained"
        color="primary"
        text="Next"
        onClick={() => setPage(BookingFormPage.SUBMISSION_LOADER)}
      />
    </Fragment>
  );
};
