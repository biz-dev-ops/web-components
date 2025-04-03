if (typeof window === 'undefined') {
    // Create a more complete mock of HTMLElement
    global.HTMLElement = class MockHTMLElement {
        shadowRoot: any;
        attachShadow() {
            this.shadowRoot = {
                innerHTML: '',
                getElementById: () => null
            };
            return this.shadowRoot;
        }
        getAttribute() { return null; }
        setAttribute() { return; }
    } as any;

    // Mock customElements registry
    global.customElements = {
        define: () => {},
        get: () => null
    } as any;
}

export class MockDrivenComponent extends HTMLElement {
    private lastAction: string | null = null;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot!.innerHTML = '<div>Mock Driven Content</div>';
    }

    handleDriverAction(action: string) {
        this.lastAction = action;
        return action;
    }

    canHandleDriverAction(action: string) {
        // Mock implementation that supports all default actions
        return ['toggle-fullscreen', 'zoom-in', 'zoom-out', 'zoom-reset'].includes(action);
    }

    getLastAction() {
        return this.lastAction;
    }
}