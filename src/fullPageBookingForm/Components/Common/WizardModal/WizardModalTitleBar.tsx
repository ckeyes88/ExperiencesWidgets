/** @jsx h */
import { h, Fragment, FunctionComponent } from "preact";
import { createPortal } from "preact/compat";
// import Portal from "preact-portal";
import { useEffect, useState } from "preact/hooks";
import { Button } from "../Button";
import { TextStyle } from "../TextStyle";
import { BackIcon } from "./BackIcon";

export type WizardModalTitleBarProps = {
  title?: string;
  onBack: () => void;
};

export const WizardModalTitleBar: FunctionComponent<WizardModalTitleBarProps> = ({
  title,
  onBack,
}) => {
  const [container, setContainer] = useState<Element>(null);

  useEffect(() => {
    setContainer(document.querySelector(".wizard-modal__title-bar"));
  }, []);

  if (!container) {
    return null;
  }

  return createPortal(
    <Fragment>
      <div className="wizard-modal__title-bar__back-button">
        <Button variant="text" text={<BackIcon />} onClick={onBack} />
      </div>
      {title && (
        <div className="wizard-modal__title-bar__title">
          <TextStyle variant="display3" text={title} />
        </div>
      )}
    </Fragment>,
    container,
  );
};
