/** @jsx h */
import { h, Fragment, FunctionComponent } from "preact";
import { useWizardModalState } from "./WizardModalProvider";
import "./WizardModal.scss";

export type WizardModalPageProps = {
  page: number;
};

export const WizardModalPage: FunctionComponent<WizardModalPageProps> = ({
  page,
  children,
}) => {
  const { currentPage } = useWizardModalState();

  if (currentPage !== page) {
    return null;
  }

  return <Fragment>{children}</Fragment>;
};
