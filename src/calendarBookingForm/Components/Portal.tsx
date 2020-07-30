import { VNode, Component } from "preact";
import { createPortal } from "preact/compat";

type Props = {
    /** Target element to mount the portal into. */
    target?: HTMLElement;
    /** Displays the saving/autosaved text and displays buttons. */
    children: VNode;
};

/**
 * This components provides a portal for displaying content somewhere else in the DOM.
 */
export class Portal extends Component<Props> {
    /**
     * The fallback element created for this component.
     */
    private fallbackTarget: HTMLElement;
    /**
     * Constructs the component. Creates a new element and attaches it to the
     * document's body in the event a target is not provided.
     */
    constructor(props: Props) {
        super(props);
        this.fallbackTarget = document.createElement("div");
        document.body.appendChild(this.fallbackTarget);
    }
    /**
     * Destroys the element created for this portal.
     */
    public componentWillUnmount() {
        document.body.removeChild(this.fallbackTarget);
    }
    /**
     * Renders the component in the desired target container.
     */
    public render({ target, children }: Props) {
        const el = target || this.fallbackTarget;
        return createPortal(children, el);
    }
}