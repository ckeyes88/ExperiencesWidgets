/** @jsx h */
import { h, FunctionComponent } from "preact";
import { useEffect } from "preact/hooks";
import { BookingFormPage } from "../../../Typings/BookingFormPage";
import { TextStyle } from "../../Common/TextStyle";
import { useWizardModalAction } from "../../Common/WizardModal";
import { useCreateNonPrepayOrder } from "../../../Hooks/useCreateOrder";
import "./SubmissionLoader.scss";

export const SubmissionLoader: FunctionComponent = () => {
  const { setPage } = useWizardModalAction();
  const createOrder = useCreateNonPrepayOrder();

  useEffect(() => {
    const startOrderCreation = async () => {
      await createOrder();
      setPage(BookingFormPage.CONFIRMATION);
    };

    startOrderCreation();
  }, []);

  return (
    <div className="submission-loader-page">
      <div className="submission-loader-page__loader" />
      <TextStyle variant="display2" text="Please wait..." />
    </div>
  );
};
