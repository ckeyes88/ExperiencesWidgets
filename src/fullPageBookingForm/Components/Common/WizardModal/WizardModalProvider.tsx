/** @jsx h */
import { h, createContext, FunctionComponent } from "preact";
import { useContext, useEffect, useState } from "preact/hooks";

type WizardModalStateContextValue = {
  currentPage: number;
};

type WizardModalActionContextValue = {
  setPage: (pageNumber: number) => void;
  close: () => void;
};

const WizardModalStateContext = createContext<
  WizardModalStateContextValue | undefined
>(undefined);

const WizardModalActionContext = createContext<
  WizardModalActionContextValue | undefined
>(undefined);

export type WizardModalProviderProps = {
  initialPage: number;
  open: boolean;
  onClose: () => void;
};

export const WizardModalProvider: FunctionComponent<WizardModalProviderProps> = ({
  initialPage,
  open,
  children,
  onClose,
}) => {
  const initialStateValue: WizardModalStateContextValue = {
    currentPage: initialPage,
  };
  const [stateValue, setStateValue] = useState(initialStateValue);

  useEffect(() => {
    if (open) {
      setStateValue({ currentPage: initialPage });
    }
  }, [open]);

  const actionValue: WizardModalActionContextValue = {
    setPage: (pageNumber) => setStateValue({ currentPage: pageNumber }),
    close: () => {
      onClose();
    },
  };

  return (
    <WizardModalStateContext.Provider value={stateValue}>
      <WizardModalActionContext.Provider value={actionValue}>
        {children}
      </WizardModalActionContext.Provider>
    </WizardModalStateContext.Provider>
  );
};

export const useWizardModalState = () => {
  const wizardModalStateContext = useContext(WizardModalStateContext);

  if (!wizardModalStateContext) {
    throw new Error(
      "useWizardModalState must be used within WizardModalProvider",
    );
  }

  return wizardModalStateContext;
};

export const useWizardModalAction = () => {
  const wizardModalActionContext = useContext(WizardModalActionContext);

  if (!wizardModalActionContext) {
    throw new Error(
      "useWizardModalAction must be used within WizardModalProvider",
    );
  }

  return wizardModalActionContext;
};
