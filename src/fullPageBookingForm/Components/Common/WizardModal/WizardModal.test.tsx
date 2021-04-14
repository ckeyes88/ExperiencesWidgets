// tslint:disable
/** @jsx h */
import { h, FunctionComponent } from "preact";
import { fireEvent, render, screen } from "@testing-library/preact";
import { WizardModal, WizardModalProps } from "./WizardModal";
import { useWizardModalAction } from "./WizardModalProvider";

const TestPage0: FunctionComponent = () => {
  const { setPage } = useWizardModalAction();

  return (
    <div>
      <p>This is page 0</p>
      <button onClick={() => setPage(1)}>go to page 1</button>
    </div>
  );
};

const TestPage1: FunctionComponent = () => {
  const { setPage, close } = useWizardModalAction();

  return (
    <div>
      <p>This is page 1</p>
      <button onClick={() => setPage(0)}>go to page 0</button>
      <button onClick={() => close()}>close modal</button>
    </div>
  );
};

const TestComponent: FunctionComponent<WizardModalProps> = (props) => (
  <WizardModal {...props}>
    <WizardModal.Page page={0}>
      <TestPage0 />
    </WizardModal.Page>
    <WizardModal.Page page={1}>
      <TestPage1 />
    </WizardModal.Page>
  </WizardModal>
);

test("Toggles correctly", () => {
  const { rerender } = render(
    <TestComponent open={false} initialPage={0} onClose={jest.fn()} />,
  );

  expect(screen.queryByText(/this is page 0/i)).not.toBeInTheDocument();

  rerender(<TestComponent open initialPage={0} onClose={jest.fn()} />);

  expect(screen.getByText(/this is page 0/i)).toBeInTheDocument();
});

test("Changes page and displays data correctly", () => {
  render(<TestComponent open initialPage={0} onClose={jest.fn()} />);

  expect(screen.getByText(/this is page 0/i)).toBeInTheDocument();
  expect(screen.queryByText(/this is page 1/i)).not.toBeInTheDocument();

  fireEvent.click(screen.getByText(/go to page 1/i));

  expect(screen.getByText(/this is page 1/i)).toBeInTheDocument();
  expect(screen.queryByText(/this is page 0/i)).not.toBeInTheDocument();
});

test("Displays the right initial page", () => {
  render(<TestComponent open initialPage={1} onClose={jest.fn()} />);

  expect(screen.getByText(/this is page 1/i)).toBeInTheDocument();
  expect(screen.queryByText(/this is page 0/i)).not.toBeInTheDocument();
});

test("Can be closed with a custom close button", () => {
  const handleClose = jest.fn();

  render(<TestComponent open initialPage={1} onClose={handleClose} />);

  fireEvent.click(screen.getByText(/close modal/i));

  expect(handleClose).toHaveBeenCalled();
});
