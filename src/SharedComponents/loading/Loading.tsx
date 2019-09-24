import { h, Component } from "preact";
import "./Loading.scss";

/** This component displays when the app is loading/fetching */
export class Loading extends Component {

  /** Main render method, displays the loading message */
  public render() {
    return (
      <div>
        {this.props.children}
        <div class="Loading-Spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
}
