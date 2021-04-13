import "@testing-library/jest-dom";
/** @jsx h */
import { h, FunctionComponent } from "preact";
import { Props as ReactModalProps } from "react-modal";

const MockReactModal: FunctionComponent<ReactModalProps> = ({
  children,
  isOpen,
}) => (!isOpen ? null : <div>{children}</div>);

jest.mock("react-modal", () => MockReactModal);
