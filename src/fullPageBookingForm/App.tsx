/** @jsx h */
import { h, FunctionComponent } from "preact";
import { useEffect } from "preact/hooks";

const useConnectActivators = () => {
  const handleClick = () => {
    alert("This is where the booking modal appears.");
  };

  useEffect(() => {
    const seeDatesButtons = document.querySelectorAll(
      ".expapp-booking-form-activator",
    );

    seeDatesButtons.forEach((button) => {
      button.addEventListener("click", handleClick);
    });

    return () => {
      seeDatesButtons.forEach((button) => {
        button.removeEventListener("click", handleClick);
      });
    };
  }, []);
};

export type AppProps = {
  baseUrl: string;
  languageCode: string;
  shopUrl: string;
  shopifyProductId: number;
};

export const App: FunctionComponent<AppProps> = (props) => {
  useConnectActivators();

  return (
    <div>
      <h1>Full page booking form</h1>
      <code>{JSON.stringify(props, null, 2)}</code>
    </div>
  );
};
