/** @jsx h */
import { h, FunctionComponent } from "preact";
import { useEffect, useState } from "preact/hooks";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";
import { BookingFormPage } from "./Typings/BookingFormPage";
import { WizardModal } from "./Components/Common/WizardModal";
import { TimeslotSelection } from "./Components/Views/TimeslotSelection";
import { OrderDetails } from "./Components/Views/OrderDetails";
import { SubmissionLoader } from "./Components/Views/SubmissionLoader";
import { Confirmation } from "./Components/Views/Confirmation";

const useConnectActivators = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  useEffect(() => {
    const seeDatesButtons = document.querySelectorAll(
      ".expapp-booking-form-activator",
    );

    seeDatesButtons.forEach((button) => {
      button.addEventListener("click", handleClick);
    });

    return () => {
      seeDatesButtons.forEach((button) => {
        button.removeEventListener("click", handleClick);
      });
    };
  }, []);

  return {
    open,
    setOpen,
  };
};

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
    <WizardModal
      open={open}
      initialPage={BookingFormPage.TIMESLOT_SELECTION}
      onClose={handleClose}
    >
      <WizardModal.Page page={BookingFormPage.TIMESLOT_SELECTION}>
        <TimeslotSelection />
      </WizardModal.Page>
      <WizardModal.Page page={BookingFormPage.ORDER_DETAILS}>
        <OrderDetails />
      </WizardModal.Page>
      <WizardModal.Page page={BookingFormPage.SUBMISSION_LOADER}>
        <SubmissionLoader />
      </WizardModal.Page>
      <WizardModal.Page page={BookingFormPage.CONFIRMATION}>
        <Confirmation />
      </WizardModal.Page>
    </WizardModal>
  );
};
