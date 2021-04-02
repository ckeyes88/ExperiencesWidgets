/** @jsx h */
import { h, FunctionComponent, Fragment } from "preact";
import { Button } from "../../Common/Button";
import { ThumbsUp } from "../../Common/Icon/ThumbsUp";
import { TextStyle } from "../../Common/TextStyle";
import "./Confirmation.scss";

export type ConfirmationProps = {
  /**Email associated with customer's order. */
  email: string;
  /**Function to close wizard modal when confirmed. */
  onClose: () => void;
};

export const Confirmation: FunctionComponent<ConfirmationProps> = ({
  email,
  onClose,
}) => {
  const renderCloseButton = () => {
    return (
      <div className="FullPage__Confirmation__Close">
        <TextStyle variant="body1" text="close" />
      </div>
    );
  };
  const renderConfirmText = () => {
    const emailText = () => (
      <span className="FullPage__Confirmation__Email-Text">
        <TextStyle variant="body1" text={email} />
      </span>
    );
    return (
      <div className="FullPage__Confirmation__Subtitle">
        <TextStyle variant="body1" text="A confirmation will be sent to " />
        {emailText()}
      </div>
    );
  };
  return (
    <div className="FullPage__Confirmation">
      <ThumbsUp />
      <div className="FullPage__Confirmation__Title">
        <TextStyle variant="display1" text="We've saved you a spot!" />
      </div>

      {renderConfirmText()}
      <div className="FullPage__Confirmation__Email">
        <TextStyle
          variant="body1"
          text="You will receive an email reminder the day before your scheduled time."
        />
      </div>

      <Button
        variant="contained"
        color="transparent"
        text={renderCloseButton()}
        onClick={onClose}
      />
    </div>
  );
};
