/** @jsx h */
import { h, FunctionComponent } from "preact";
import { useEffect } from "preact/hooks";
import { WizardModalProvider } from "./WizardModalProvider";
import { WizardModalPage } from "./WizardModalPage";
import "./WizardModal.scss";

export type WizardModalProps = {
  open: boolean;
  initialPage: number;
  onClose: () => void;
};

export const WizardModal: FunctionComponent<WizardModalProps> & {
  Page: typeof WizardModalPage;
} = ({ open, initialPage, children, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  const wizardModalClassNames = ["wizard-modal"];

  if (open) {
    wizardModalClassNames.push("wizard-modal--open");
  }

  return (
    <WizardModalProvider
      open={open}
      initialPage={initialPage}
      onClose={onClose}
    >
      <div role="dialog" className={wizardModalClassNames.join(" ")}>
        {children}
      </div>
    </WizardModalProvider>
  );
};

WizardModal.Page = WizardModalPage;
