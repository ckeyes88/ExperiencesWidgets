/** @jsx h */
import { h, FunctionComponent } from "preact";
import ReactModal from "react-modal";
import { Button, ButtonProps } from "../Button";
import { Card } from "../Card";
import { TextStyle } from "../TextStyle";
import { CloseIcon } from "../Icon/CloseIcon";
import "./Dialog.scss";

export type DialogProps = {
  open: boolean;
  title: string;
  message: string | JSX.Element;
  actions: ButtonProps[];
  onClose: () => void;
};

export const Dialog: FunctionComponent<DialogProps> = ({
  open,
  title,
  message,
  actions,
  onClose,
}) => (
  <ReactModal
    isOpen={open}
    ariaHideApp={false}
    className="dialog__root"
    overlayClassName="dialog"
    closeTimeoutMS={400}
  >
    <Card>
      <div className="dialog__title">
        <TextStyle text={title} variant="display2" />
        <div
          className="dialog__title__close-button"
          onClick={onClose}
          data-testid="dialog-close-button"
        >
          <CloseIcon color="#a7a7a7" width={20} height={20} />
        </div>
      </div>
      <div className="dialog__message">
        <TextStyle text={message} variant="body1" />
      </div>
      <div className="dialog__actions">
        {actions.map((action) => (
          <Button key={action.text} {...action} />
        ))}
      </div>
    </Card>
  </ReactModal>
);
