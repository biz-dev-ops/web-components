// Import styles, initialize component theme here.
// import '../src/common.css';


class DrivenStubElement extends HTMLElement {
    constructor() {
        super();
    }

    canHandleDriverAction(action: string) {
        return this.hasAttribute(`can-${action}`);
    }

    handleDriverAction(action: string) {
        this.classList.toggle(action);
    }
}

customElements.define("driven-stub-element", DrivenStubElement);