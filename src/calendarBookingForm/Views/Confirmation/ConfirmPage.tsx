import { h, Component } from "preact";
import { CustomerInputData } from "../../../typings/CustomerInput";
import "./ConfirmPage.scss";

export interface IConfirmPageProps {
  /** Closes the modal by setting the top level state */
  closeModal(): void;
  /** Data collected from the customer that can be displayed here */
  customerInfo: CustomerInputData;
}

/** This is the component to display a confirmation message in the modal upon completion of a non-prepay order */
export class ConfirmPage extends Component<IConfirmPageProps> {
  constructor(props: IConfirmPageProps) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  /** Main render method */
  public render() {
    const { customerInfo, closeModal } = this.props;

    return (
      <div className="ConfirmPage">
        <h1>We've saved you a spot!</h1>
        <p>A confirmation email has been sent to {customerInfo.email}.</p>
        <button className="ConfirmPage-Btn" onClick={closeModal}>Close</button>
      </div>
    );
  }
}
