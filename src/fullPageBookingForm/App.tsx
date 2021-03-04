import { useEffect } from "react";
import { FunctionComponent } from "preact";

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

export const App: FunctionComponent = () => {
  useConnectActivators();

  return null;
};
