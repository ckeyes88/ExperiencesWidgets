/** @jsx h */
import { h, Fragment, FunctionComponent } from "preact";
import { useState } from "preact/hooks";
import { Button } from "../Button";
import { TextStyle } from "../TextStyle";
import { BottomDrawer } from "./BottomDrawer";

export const BottomDrawerExample: FunctionComponent = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Button text="Open drawer" onClick={handleClick} />
      <BottomDrawer open={open} onClose={handleClose}>
        <TextStyle variant="body1" text="This is a sample content" />
        <Button color="primary" text="Submit" onClick={handleClose} />
      </BottomDrawer>
    </Fragment>
  );
};
