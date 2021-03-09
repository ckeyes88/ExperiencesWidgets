// tslint:disable
/** @jsx h */
import { h, Fragment, FunctionComponent } from "preact";
import { useState } from "preact/hooks";
import { Button } from "../Button/Button";
import { TextStyle } from "../TextStyle/TextStyle";
import { WizardModal } from "./WizardModal";
import { useWizardModalAction } from "./WizardModalProvider";

enum Page {
  PAGE_A,
  PAGE_B,
}

const PageA: FunctionComponent = () => {
  const { setPage } = useWizardModalAction();

  return (
    <Fragment>
      <h1>
        <TextStyle variant="display1" text="Page A" />
      </h1>
      <p>
        <TextStyle variant="body1" text="You are in page a!" />
      </p>
      <Button
        color="primary"
        onClick={() => setPage(Page.PAGE_B)}
        text="Go to page b"
      />
    </Fragment>
  );
};

const PageB: FunctionComponent = () => {
  const { setPage, close } = useWizardModalAction();

  return (
    <Fragment>
      <h1>
        <TextStyle variant="display1" text="Page B" />
      </h1>
      <p>
        <TextStyle variant="body1" text="You are in page b!" />
      </p>
      <Button
        color="primary"
        onClick={() => setPage(Page.PAGE_A)}
        text="Go to page a"
      />
      <p>
        <TextStyle
          variant="body1"
          text={
            <Fragment>
              You can hide the close button in a specific page
              <br />
              and create a custom one:
            </Fragment>
          }
        />
      </p>
      <Button variant="outlined" text="Close" onClick={() => close()} />
    </Fragment>
  );
};

export const WizardModalExample: FunctionComponent = () => {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <Button onClick={() => setOpen(true)} text="Open modal" />
      <WizardModal
        open={open}
        initialPage={Page.PAGE_A}
        onClose={() => setOpen(false)}
      >
        <WizardModal.Page page={Page.PAGE_A}>
          <PageA />
        </WizardModal.Page>
        <WizardModal.Page hideCloseButton page={Page.PAGE_B}>
          <PageB />
        </WizardModal.Page>
      </WizardModal>
    </Fragment>
  );
};
