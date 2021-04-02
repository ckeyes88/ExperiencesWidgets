/** @jsx h */
import { h, FunctionComponent } from "preact";
import { useEffect, useRef } from "preact/hooks";
import { CloseIcon } from "../Icon/CloseIcon";
import {
  WizardModalProvider,
  useWizardModalState,
  useWizardModalAction,
} from "./WizardModalProvider";
import { WizardModalPage } from "./WizardModalPage";
import "./WizardModal.scss";

export type WizardModalProps = {
  open: boolean;
  initialPage: number;
  onClose: () => void;
};

const Modal: FunctionComponent<Pick<WizardModalProps, "open">> = ({
  children,
  open,
}) => {
  const modalRef = useRef<HTMLDivElement>();
  const { currentPage } = useWizardModalState();
  const { close } = useWizardModalAction();
  const wizardModalClassNames = ["wizard-modal"];

  useEffect(() => {
    modalRef.current?.scrollTo?.({
      top: 0,
    });
  }, [currentPage]);

  if (open) {
    wizardModalClassNames.push("wizard-modal--open");
  }

  const handleCloseButtonClick = () => close();

  return (
    <div
      role="dialog"
      className={wizardModalClassNames.join(" ")}
      ref={modalRef}
    >
      <div className="wizard-modal__title-bar" />
      <div className="wizard-modal__body">
        <div
          data-testid="wizard-modal-close-button"
          className="wizard-modal__close-button"
          onClick={handleCloseButtonClick}
        >
          <CloseIcon color="#666" width={32} height={32} strokeSize={2} />
        </div>
        {children}
      </div>
    </div>
  );
};

export const WizardModal: FunctionComponent<WizardModalProps> & {
  Page: typeof WizardModalPage;
} = ({ open, initialPage, children, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return (
    <WizardModalProvider
      open={open}
      initialPage={initialPage}
      onClose={onClose}
    >
      <Modal open={open}>{children}</Modal>
    </WizardModalProvider>
  );
};

WizardModal.Page = WizardModalPage;
