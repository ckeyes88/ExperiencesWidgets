import { h, Component } from "preact";
import "./Loading.scss";

type LoadingProps = {
  customStyles?: any;
};

/** This component displays when the app is loading/fetching */
export class Loading extends Component<LoadingProps> {

  /** Main render method, displays the loading message */
  public render() {
    return (
      <div style={this.props.customStyles}>
        {this.props.children}
        <div class="Loading-Spinner">
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    );
  }
}
