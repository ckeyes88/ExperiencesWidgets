/** @jsx h */
import { h, FunctionComponent } from "preact";
import { useConnectActivators } from "../Hooks/useConnectActivators";
import { BookingFormPage } from "../Typings/BookingFormPage";
import { WizardModal } from "./Common/WizardModal";
import { TimeslotSelection } from "./Views/TimeslotSelection";
import { OrderDetails } from "./Views/OrderDetails";
import { SubmissionLoader } from "./Views/SubmissionLoader";
import { Confirmation } from "./Views/Confirmation";
import { WidgetDataProvider } from "./WidgetDataProvider";

//Use mock data for now.
import { defaultArgs } from "../__mocks__/Event";
export type AppProps = {
  baseUrl: string;
  languageCode: string;
  shopUrl: string;
  shopifyProductId: number;
};

export const App: FunctionComponent<AppProps> = (props) => {
  const { open, setOpen } = useConnectActivators();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <WidgetDataProvider data={props}>
      <WizardModal
        open={open}
        initialPage={BookingFormPage.TIMESLOT_SELECTION}
        onClose={handleClose}
      >
        <WizardModal.Page page={BookingFormPage.TIMESLOT_SELECTION}>
          <TimeslotSelection />
        </WizardModal.Page>
        <WizardModal.Page page={BookingFormPage.ORDER_DETAILS}>
          <OrderDetails {...defaultArgs} />
        </WizardModal.Page>
        <WizardModal.Page page={BookingFormPage.SUBMISSION_LOADER}>
          <SubmissionLoader />
        </WizardModal.Page>
        <WizardModal.Page page={BookingFormPage.CONFIRMATION}>
          <Confirmation />
        </WizardModal.Page>
      </WizardModal>
    </WidgetDataProvider>
  );
};
