import { h, Component } from "preact";
import { ModalStateEnum } from "../../types";

export interface INotFoundProps {
  navigateTo(state: ModalStateEnum): void;
}

export default class NotFound extends Component<INotFoundProps> {
  onClick = () => {
    this.props.navigateTo(ModalStateEnum.Availability);
  }

  public render() {
    return (
      <div>
        You must be lost.
        <button onClick={this.onClick}>Start over</button>
      </div>
    );
  }
}
