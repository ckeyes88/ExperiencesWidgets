
import { h, Component, createRef } from "preact";
import "./_modal.scss";

type ModalProps = {
    /** sets the prop if the mobal should be visiable or not */
    showModal: boolean;
    /** method to will trigger when to close the modal view */
    closeModal(): void;
};

type ModalState = {
};
/** this componet renders the modal view  */
export class Modal extends Component<ModalProps, ModalState> {
    constructor(props: ModalProps) {
        super(props);
    }

    /** Ref to the modal element */
    modal = createRef();

    /** Add event listener to the document for clicks */
    componentWillMount() {
        document.addEventListener("mousedown", this.handleClickOutsideModal, false);
    }

    /** On click, check if click was outside modal and close if so */
    handleClickOutsideModal = (e: Event) => {
        if (!!this.modal.current) {
            if (this.modal.current.contains(e.target as Node)) {
                return;
            }
        }
        this.props.closeModal();
    }

    /** rendering the modal container */
    render() {
        if (this.props.showModal) {
            const { children } = this.props;
            return (
                <div className="Modal">
                    <div ref={this.modal} className="Modal-ModalContentBox">
                        {children}
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}