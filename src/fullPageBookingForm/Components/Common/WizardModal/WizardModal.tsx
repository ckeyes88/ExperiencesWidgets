/** @jsx h */
import { h, FunctionComponent } from "preact";
import { useEffect, useRef } from "preact/hooks";
import ReactModal from "react-modal";
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
  hideCloseButton?: (page: number) => boolean;
  onClose: () => void;
};

const Modal: FunctionComponent<Pick<
  WizardModalProps,
  "open" | "hideCloseButton"
>> = ({ children, open, hideCloseButton }) => {
  const modalContentRef = useRef<HTMLDivElement>();
  const { currentPage } = useWizardModalState();
  const { close } = useWizardModalAction();

  useEffect(() => {
    modalContentRef.current?.scrollTo?.({
      top: 0,
    });
  }, [currentPage]);

  const handleCloseButtonClick = () => close();

  const setModalContentRef = (ref: HTMLDivElement) => {
    modalContentRef.current = ref;
  };

  return (
    <ReactModal
      contentRef={setModalContentRef}
      isOpen={open}
      contentLabel="Minimal Modal Example"
      className="wizard-modal__root"
      overlayClassName="wizard-modal"
      closeTimeoutMS={400}
    >
      <div className="wizard-modal__title-bar" />
      <div className="wizard-modal__body">
        {!hideCloseButton?.(currentPage) && (
          <div
            data-testid="wizard-modal-close-button"
            className="wizard-modal__close-button"
            onClick={handleCloseButtonClick}
          >
            <CloseIcon color="#666" width={32} height={32} strokeSize={2} />
          </div>
        )}
        {children}
      </div>
    </ReactModal>
  );
};

export const WizardModal: FunctionComponent<WizardModalProps> & {
  Page: typeof WizardModalPage;
} = ({ open, initialPage, children, hideCloseButton, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return (
    <WizardModalProvider
      open={open}
      initialPage={initialPage}
      onClose={onClose}
    >
      <Modal open={open} hideCloseButton={hideCloseButton}>
        {children}
      </Modal>
    </WizardModalProvider>
  );
};

WizardModal.Page = WizardModalPage;
