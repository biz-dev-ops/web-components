import { LitElement, html } from 'lit';
import { customElement, eventOptions, state } from 'lit/decorators.js';
import resetCss from '../styles/reset.css';
import driverCss from './driver.css';
import "../alert";

@customElement('bdo-driver')
export class BdoDriver extends LitElement {

    @state()
    error: Error | null = null;

    override render() {
        if (this.error) {
            return html`
                <bdo-alert type="error">${this.error.message}</bdo-alert>
            `;
        }

        return html`
            <div class="driver" @click=${this._handleDriverClicked}>
                <slot @slotchange=${this._handleSlotChange} name="driver"></slot>
            </div>
            <div class="driven">
                <slot></slot>
            </div>
        `;
    }

    override firstUpdated() {
        this._configureDriver();
    }

    override connectedCallback(): void {
        super.connectedCallback();
        this.addEventListener('fullscreenchange', this._setFullscreenState);
    }

    override disconnectedCallback(): void {
        this.removeEventListener('fullscreenchange', this._setFullscreenState);
        super.disconnectedCallback();
    }

    @eventOptions({ passive: true })
    _handleSlotChange() {
        this._configureDriver();
    }

    @eventOptions({ passive: true })
    _handleDriverClicked(event: CustomEvent) {
        const clickedEl = event.target as HTMLElement;
        const action = clickedEl.getAttribute('data-action') || clickedEl.closest('[data-action]')?.getAttribute('data-action');
        if (!action) {
            return;
        }

        // Handle toggle-fullscreen action
        if (action === 'toggle-fullscreen') {
            this._toggleFullscreen(event);
            return;
        }

        const driven = (this.renderRoot.querySelector('slot:not([name])') as HTMLSlotElement).assignedElements({ flatten: true });
        for (const drivenEl of driven) {
            if (typeof (drivenEl as any).handleDriverAction === 'function') {
                (drivenEl as any).handleDriverAction(action);
            }
        }
    }

    _configureDriver() {
        const drivers = (this.renderRoot.querySelector('slot[name="driver"]') as HTMLSlotElement)?.assignedElements({ flatten: true });

        for (const driver of drivers) {
            const action = driver.getAttribute('data-action');
            if (action) {
                const canHandle = this._canHandleDriverAction(action);

                if(canHandle === false) {
                    (driver as HTMLElement).hidden = true;
                }
                else {
                    (driver as HTMLElement).hidden = false;
                }
            }
        }
    }

    _canHandleDriverAction(action: string) : boolean | undefined {
        const driven = (this.renderRoot.querySelector('slot:not([name])') as HTMLSlotElement).assignedElements({ flatten: true });

        return driven.some(drivenEl => {
            if (typeof (drivenEl as any).canHandleDriverAction !== 'function') {
                return false;
            }

            return (drivenEl as any).canHandleDriverAction(action);
        });
    }

    _toggleFullscreen(): void {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            this.requestFullscreen();
        }
    }

    _setFullscreenState(): void {
        if (document.fullscreenElement) {
            this.classList.add('fullscreen');
        } else {
            this.classList.remove('fullscreen');
        }
    }

    static override get styles() {
        return [resetCss, driverCss];
    }
}