import './_modal.scss';

import { Component, createRef, h } from 'preact';

import { Portal } from '../../calendarBookingForm/Components/Portal';

type ModalProps = {
  /** sets the prop if the mobal should be visiable or not */
  showModal: boolean;
  /** sets the prop if the mobal is at the order details portion */
  orderDetails: string;
  /** method to will trigger when to close the modal view */
  closeModal(): void;
};

type ModalState = {};
/** this componet renders the modal view  */
export class Modal extends Component<ModalProps, ModalState> {
  constructor(props: ModalProps) {
    super(props);
  }

  /** Ref to the modal element */
  modal = createRef();

  /** Add event listener for page scroll to fix modal to center of screen */
  componentDidMount() {
    window.addEventListener("scroll", this.handleCenterModal);
  }

  /** Add event listener to the document for clicks */
  componentWillMount() {
    document.addEventListener("mousedown", this.handleClickOutsideModal, false);
  }

  /** Remove event listener for page scroll */
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleCenterModal);
  }

  /** On page scroll, move modal to stay fixed to the center of the screen */
  handleCenterModal = () => {
    if (!this.modal.current) {
      return;
    }

    this.modal.current.css("position", "absolute");
    this.modal.current.css("top", document.body.scrollHeight + "px");
  };

  /** On click, check if click was outside modal and close if so */
  handleClickOutsideModal = (e: Event) => {
    if (!!this.modal.current) {
      if (this.modal.current.contains(e.target as Node)) {
        return;
      }
    }
    this.props.closeModal();
  };

  /** rendering the modal container */
  render() {
    if (this.props.showModal) {
      const { children, orderDetails } = this.props;
      let orderModal = orderDetails === "OrderDetails" ? true : false;

      return (
        <Portal>
          <div>
            <div class="Exp__App_Modal">
              <div
                ref={this.modal}
                class={`Exp__App_Modal__ModalContentBox${
                  !!orderModal ? "OrderDetails" : ""
                }`}
              >
                <div class="Modal-ModalMainContentBox">{children}</div>
              </div>
            </div>
          </div>
        </Portal>
      );
    } else {
      return null;
    }
  }
}
