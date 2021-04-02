// tslint:disable
/** @jsx h */
import { h, Fragment, FunctionComponent } from "preact";
import { useState } from "preact/hooks";
import { Button } from "../Button";
import { TextStyle } from "../TextStyle";
import { WizardModal } from "./WizardModal";
import { useWizardModalAction } from "./WizardModalProvider";
import { WizardModalTitleBar } from "./WizardModalTitleBar";

enum Page {
  PAGE_A,
  PAGE_B,
}

const PageA: FunctionComponent = () => {
  const { setPage, close } = useWizardModalAction();

  return (
    <Fragment>
      <WizardModalTitleBar title="Page A" onBack={() => close()} />
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
      <WizardModalTitleBar title="Page B" onBack={() => setPage(Page.PAGE_A)} />
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
          text={<Fragment>Create another close button:</Fragment>}
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
        <WizardModal.Page page={Page.PAGE_B}>
          <PageB />
        </WizardModal.Page>
      </WizardModal>
    </Fragment>
  );
};
