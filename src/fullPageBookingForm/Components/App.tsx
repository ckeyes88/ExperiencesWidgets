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
import { useEventStore } from "../Hooks/useEventStore";
import { useTimeslotStore } from "../Hooks/useTimeslotStore";
import { getEventCustomLabels } from "../../Utils/api";
import { useEffect, useState } from "preact/hooks";
import {
  AppDictionary,
  defineLanguageDictionary,
  LanguageCodes,
} from "../../typings/Languages";
import { useCustomerFormStore } from "../Hooks/useCustomerFormStore";
export type AppProps = {
  baseUrl: string;
  languageCode: string;
  shopUrl: string;
  shopifyProductId: number;
};

export const App: FunctionComponent<AppProps> = ({
  baseUrl,
  shopUrl,
  shopifyProductId,
  languageCode,
}) => {
  const { open, setOpen } = useConnectActivators();
  const event = useEventStore((state) => state.event);
  const selectedTimeslot = useTimeslotStore((state) => state.selectedTimeslot);
  const [labels, setLabels] = useState<Partial<AppDictionary>>({});

  //Fetch labels associated with event on mount.
  useEffect(() => {
    async function fetchLabels() {
      const labelResponse = await getEventCustomLabels({
        baseUrl,
        shopId: shopUrl,
        shopifyProductId,
      });

      const labelsResolved =
        labelResponse && labelResponse.data
          ? {
              ...defineLanguageDictionary(languageCode as LanguageCodes),
              ...labelResponse.data,
            }
          : defineLanguageDictionary(languageCode as LanguageCodes);

      setLabels(labelsResolved);
    }

    fetchLabels();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const customerEmail = useCustomerFormStore(
    (state) => state.customerData.email,
  );

  return (
    <WidgetDataProvider
      data={{ baseUrl, shopUrl, shopifyProductId, languageCode }}
    >
      <WizardModal
        open={open}
        initialPage={BookingFormPage.TIMESLOT_SELECTION}
        onClose={handleClose}
      >
        <WizardModal.Page page={BookingFormPage.TIMESLOT_SELECTION}>
          <TimeslotSelection />
        </WizardModal.Page>
        <WizardModal.Page page={BookingFormPage.ORDER_DETAILS}>
          <OrderDetails
            error=""
            event={event}
            labels={labels}
            selectedTimeslot={selectedTimeslot}
          />
        </WizardModal.Page>
        <WizardModal.Page page={BookingFormPage.SUBMISSION_LOADER}>
          <SubmissionLoader />
        </WizardModal.Page>
        <WizardModal.Page page={BookingFormPage.CONFIRMATION}>
          <Confirmation email={customerEmail} onClose={handleClose} />
        </WizardModal.Page>
      </WizardModal>
    </WidgetDataProvider>
  );
};
