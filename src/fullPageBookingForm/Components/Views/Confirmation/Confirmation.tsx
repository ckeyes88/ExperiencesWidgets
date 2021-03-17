/** @jsx h */
import { h, FunctionComponent, Fragment } from "preact";
import { Button } from "../../Common/Button";
import { TextStyle } from "../../Common/TextStyle";
import { useWizardModalAction } from "../../Common/WizardModal";

export const Confirmation: FunctionComponent = () => {
  const { close } = useWizardModalAction();

  return (
    <Fragment>
      <h1>
        <TextStyle variant="display1" text="Confirmation" />
      </h1>
      <Button variant="contained" text="Close" onClick={() => close()} />
    </Fragment>
  );
};
