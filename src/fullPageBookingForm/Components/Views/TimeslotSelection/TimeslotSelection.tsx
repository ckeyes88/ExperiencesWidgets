/** @jsx h */
import { h, FunctionComponent, Fragment } from "preact";
import { BookingFormPage } from "../../../Typings/BookingFormPage";
import { useWidgetData } from "../../WidgetDataProvider";
import { Button } from "../../Common/Button";
import { TextStyle } from "../../Common/TextStyle";
import { useWizardModalAction } from "../../Common/WizardModal";

export const TimeslotSelection: FunctionComponent = () => {
  const { setPage } = useWizardModalAction();
  const widgetData = useWidgetData();

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
      <pre>
        <code>{JSON.stringify(widgetData, null, 2)}</code>
      </pre>
    </Fragment>
  );
};
