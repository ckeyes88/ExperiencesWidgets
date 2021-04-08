/** @jsx h */
import { h, FunctionComponent, Fragment } from "preact";
import { BookingFormPage } from "../../../Typings/BookingFormPage";
import { useEventStore } from "../../../Hooks/useEventStore";
import { useTimeslotStore } from "../../../Hooks/useTimeslotStore";
import { Button } from "../../Common/Button";
import { TextStyle } from "../../Common/TextStyle";
import { useWizardModalAction } from "../../Common/WizardModal";

export const OrderDetails: FunctionComponent = () => {
  const event = useEventStore((state) => state.event);
  const timeslot = useTimeslotStore((state) => state.selectedTimeslot);
  const { setPage } = useWizardModalAction();

  return (
    <Fragment>
      <h1>
        <TextStyle variant="display1" text="Order details" />
      </h1>
      <pre>
        <code>{JSON.stringify({ event, timeslot }, null, 2)}</code>
      </pre>
      <Button
        variant="contained"
        color="primary"
        text="Next"
        onClick={() => setPage(BookingFormPage.SUBMISSION_LOADER)}
      />
    </Fragment>
  );
};
