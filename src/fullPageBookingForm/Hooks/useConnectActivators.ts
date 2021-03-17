import { useEffect, useState } from "preact/hooks";

export const useConnectActivators = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
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

  return {
    open,
    setOpen,
  };
};
