import { LitElement, html } from 'lit';
import { customElement, eventOptions, property, state } from 'lit/decorators.js';
import resetCss from '../styles/reset.css';
import driverCss from './driver.css';
import "../icon";
import "../alert";

const defaultDrivers = [{
    action: 'toggle-fullscreen',
    icon: 'mat-fullscreen',
    label: 'Fullscreen'
}, {
    action: 'zoom-in',
    icon: 'mat-zoom-in',
    label: 'Zoom in'
}, {
    action: 'zoom-out',
    icon: 'mat-zoom-out',
    label: 'Zoom out'
}, {
    action: 'zoom-reset',
    icon: 'mat-reset-focus',
    label: 'Zoom reset'
}];

@customElement('bdo-driver')
export class BdoDriver extends LitElement {

    @property({ attribute: "use-default-drivers", type: Boolean, reflect: true })
    useDefaultDrivers = false;

    @state()
    error: Error | null = null;

    override render() {
        if (this.error) {
            return html`
                <bdo-alert type="error">${this.error.message}</bdo-alert>
            `;
        }

        return html`
            <div class="container">
                <div class="drivers" @click=${this._handleDriverClicked}>
                    ${this.useDefaultDrivers ? defaultDrivers.map(action => {
                        return html`
                            <button slot="drivers" data-action="${action.action}">
                                <bdo-icon icon="${action.icon}"></bdo-icon>${action.label}
                            </button>
                        `;
                    }) : ''}
                    <slot @slotchange=${this._handleSlotChange} name="drivers"></slot>
                </div>
                <div class="driven">
                    <slot @slotchange=${this._handleSlotChange}></slot>
                </div>
            </div>
        `;
    }

    override firstUpdated() {
        this._validateSlotContent();
    }

    @eventOptions({ passive: true })
    _handleDriverClicked(event: CustomEvent) {
        const clickedEl = event.target as HTMLElement;
        const action = clickedEl.getAttribute('data-action') || clickedEl.closest('[data-action]')?.getAttribute('data-action');

        if (!action) {
            return;
        }

        const driven = (this.renderRoot.querySelector('slot:not([name])') as HTMLSlotElement).assignedElements();
        for (const drivenEl of driven) {
            if (typeof (drivenEl as any).handleDriverAction === 'function') {
                (drivenEl as any).handleDriverAction(action);
            }
        }
    }

    @eventOptions({ passive: true })
    _handleSlotChange() {
        this._validateSlotContent();
    }

    _validateSlotContent() {
        const errors: unknown[] = [];
        try {
            this._validateDrivenElements();
        }
        catch (error: unknown) {
            errors.push(error);
        }

        try {
            this._validateDriverElements();
        }
        catch (error: unknown) {
            errors.push(error);
        }

        if (errors.length > 0) {
            this.error = new Error(`Invalid slot content: ${errors.join(', ')}`);
        }
        else {
            this.error = null;
        }
    }

    _validateDrivenElements() {
        const slot = (this.renderRoot.querySelector('slot:not([name])') as HTMLSlotElement);
        const children = slot?.assignedElements();
        if (!slot || children.length === 0) {
            throw new Error('Driven components are required');
        }

        for (const drivenEl of children) {
            if (typeof (drivenEl as any).handleDriverAction !== 'function') {
                throw new Error('Driven component must implement handleDriverAction');
            }
        }
    }

    _validateDriverElements() {
        const slot = (this.renderRoot.querySelector('slot[name="drivers"]') as HTMLSlotElement);
        const children = slot?.assignedElements();

        if (!this.useDefaultDrivers && (!slot || children.length === 0)) {
            throw new Error('Drivers are required');
        }

        for (const child of children) {
            if (!child.getAttribute("data-action")) {
                throw new Error('Driver action is required');
            }
        }
    }

    _canHandleDefaultDriverAction(action: string) {
        const driven = (this.renderRoot.querySelector('slot:not([name])') as HTMLSlotElement).assignedElements();
        return driven.some(drivenEl => {
            if (typeof (drivenEl as any).canHandleDriverAction !== 'function') {
                return false;
            }

            return (drivenEl as any).canHandleDriverAction(action);
        });
    }

    static override get styles() {
        return [resetCss, driverCss];
    }
}