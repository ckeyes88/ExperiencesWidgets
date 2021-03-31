/** @jsx h */
import { h, Fragment, FunctionComponent } from "preact";
import { CloseIcon } from "../Icon/CloseIcon";
import {
  useWizardModalState,
  useWizardModalAction,
} from "./WizardModalProvider";
import "./WizardModal.scss";

export type WizardModalPageProps = {
  page: number;
  hideCloseButton?: boolean;
};

export const WizardModalPage: FunctionComponent<WizardModalPageProps> = ({
  page,
  hideCloseButton,
  children,
}) => {
  const { currentPage } = useWizardModalState();
  const { close } = useWizardModalAction();

  if (currentPage !== page) {
    return null;
  }

  const handleCloseButtonClick = () => close();

  return (
    <Fragment>
      {!hideCloseButton && (
        <div
          data-testid="wizard-modal-close-button"
          className="wizard-modal__close-button"
          onClick={handleCloseButtonClick}
        >
          <CloseIcon color="#666" width={32} height={32} strokeSize={2} />
        </div>
      )}
      <div className="wizard-modal__title-bar" />
      <div className="wizard-modal__body">{children}</div>
    </Fragment>
  );
};
