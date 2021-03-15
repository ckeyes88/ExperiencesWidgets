/** @jsx h */
import { h, createContext, FunctionComponent } from "preact";
import { useContext } from "preact/hooks";
import { AppProps } from "./App";

const WidgetDataContext = createContext<AppProps | undefined>(undefined);

export type WidgetDataProviderProps = {
  data: AppProps;
};

export const WidgetDataProvider: FunctionComponent<WidgetDataProviderProps> = ({
  children,
  data,
}) => (
  <WidgetDataContext.Provider value={data}>
    {children}
  </WidgetDataContext.Provider>
);

export const useWidgetData = () => {
  const widgetDataContext = useContext(WidgetDataContext);

  if (!widgetDataContext) {
    throw new Error("useWidgetData must be used within WidgetDataProvider");
  }

  return widgetDataContext;
};
