/** @jsx h */
import { h, createContext, FunctionComponent } from "preact";
import { useContext, useState } from "preact/hooks";

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
  onClose: () => void;
};

export const WizardModalProvider: FunctionComponent<WizardModalProviderProps> = ({
  initialPage,
  children,
  onClose,
}) => {
  const initialStateValue: WizardModalStateContextValue = {
    currentPage: initialPage,
  };
  const [stateValue, setStateValue] = useState(initialStateValue);

  const actionValue: WizardModalActionContextValue = {
    setPage: (pageNumber) => setStateValue({ currentPage: pageNumber }),
    close: () => {
      setStateValue(initialStateValue);
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
