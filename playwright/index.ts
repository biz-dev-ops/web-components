// Import styles, initialize component theme here.
// import '../src/common.css';


class DrivenStubElement extends HTMLElement {
    constructor() {
        super();
    }

    canHandleAction(action: string) {
        return this.hasAttribute(`can-${action}`);
    }

    handleAction(action: string) {
        this.classList.toggle(action);
    }
}

customElements.define("driven-stub-element", DrivenStubElement);