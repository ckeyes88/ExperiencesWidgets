/** @jsx h */
import { h } from "preact";
import { fireEvent, render, screen } from "@testing-library/preact";
import { Modal, ModalProps } from "./Modal";

const props: ModalProps = {
  cancelButtonText: "Cancel",
  confirmButtonText: "Confirm",
  content: "Modal content",
  isOpen: true,
  onClickCancelButton: jest.fn(),
  onClickConfirmButton: jest.fn(),
  title: "Modal title",
};

test("Renders modal correctly.", () => {
  render(<Modal {...props} />);

  expect(screen.getByText(/cancel/i)).toBeInTheDocument();
  expect(screen.getByText(/confirm/i)).toBeInTheDocument();
  expect(screen.getByText(/modal content/i)).toBeInTheDocument();
  expect(screen.getByText(/modal title/i)).toBeInTheDocument();

  const modal = screen.getByRole("FullPage__Modal");

  expect(modal).toHaveClass("FullPage__Modal__Container--Open");
});

test("Closes modal correctly.", () => {
  const handleCancel = jest.fn();
  render(<Modal {...props} onClickCancelButton={handleCancel} />);

  fireEvent.click(screen.getByRole("cancel"));

  expect(handleCancel).toHaveBeenCalledTimes(1);
});

test("Confirm is clicked correctly in modal.", () => {
  const handleConfirm = jest.fn();
  render(<Modal {...props} onClickConfirmButton={handleConfirm} />);

  fireEvent.click(screen.getByText("Confirm"));

  expect(handleConfirm).toHaveBeenCalledTimes(1);
});

test("Modal is hidden correctly.", () => {
  render(<Modal {...props} isOpen={false} />);

  const modal = screen.getByRole("FullPage__Modal");

  expect(modal).not.toHaveClass("FullPage__Modal__Container--Open");
});
