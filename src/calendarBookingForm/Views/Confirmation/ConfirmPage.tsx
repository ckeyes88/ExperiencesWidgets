import { h, Component } from "preact";
import { CustomerInputData } from "../../../typings/CustomerInput";
import { AppDictionary } from "../../../typings/Languages";
import "./ConfirmPage.scss";

export interface IConfirmPageProps {
  /** Closes the modal by setting the top level state */
  closeModal(): void;
  /** Data collected from the customer that can be displayed here */
  customerInfo: CustomerInputData;
  /** Event custom labels set in admin experience interface */
  labels: Partial<AppDictionary>;
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
    const { customerInfo, closeModal, labels } = this.props;

    return (
      <div className="ConfirmPage">
        <h1>{labels.savedSpotLabel}</h1>
        <p className="ConfirmPage-Email">{labels.sentConfirmationLabel} <span>{customerInfo.email}</span>.</p>
        <p className="ConfirmPage-Email">{labels.getEmailReminderDaysLabel(1)}</p>  
        <button className="ConfirmPage-Btn" onClick={closeModal}>{labels.finalConfirmationLabel}</button>
      </div>
    );
  }
}
