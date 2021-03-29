/** @jsx h */
import { h, FunctionComponent } from "preact";
import { useState } from "preact/hooks";
import { Button } from "../Button";
import { Modal, ModalProps } from "./Modal";

export const ModalExample: FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const args: ModalProps = {
    isOpen,
    title: "Remove attendee",
    content:
      'Are you sure you want to remove "Adult"? You will lose all additional information you have entered.',
    confirmButtonText: "Yes, remove",
    cancelButtonText: "Cancel",
    onClickCancelButton: () => {
      setIsOpen(false);
    },
    onClickConfirmButton: () => {},
  };

  return (
    <div>
      <Button
        text="Open Modal"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      />
      <Modal {...args} />
    </div>
  );
};
