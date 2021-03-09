/** @jsx h */
import { h, Fragment, FunctionComponent } from "preact";
import { useState } from "preact/hooks";
import { Button } from "../Button/Button";
import { Dialog } from "./Dialog";

export const DialogExample: FunctionComponent = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Button text="Open dialog" onClick={handleClick} />
      <Dialog
        open={open}
        title="Dialog Title"
        message="This is the dialog message. Ask a question like, do you wish to proceed?"
        actions={[
          {
            color: "default",
            variant: "text",
            text: "Cancel",
            onClick: handleClose,
          },
          {
            color: "primary",
            variant: "contained",
            text: "Yes, proceed",
            onClick: handleClose,
          },
        ]}
        onClose={handleClose}
      />
    </Fragment>
  );
};
