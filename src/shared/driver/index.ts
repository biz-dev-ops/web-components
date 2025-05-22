import { LitElement, html } from 'lit';
import { customElement, eventOptions, state } from 'lit/decorators.js';
import resetCss from '../styles/reset.css';
import driverCss from './driver.css';
import "../alert";
import { DrivenByAction, isDrivenByAction } from './types';

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
        this._hideDriversWhichActionCanNotBeHandled();
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
    private _handleSlotChange() {
        this._hideDriversWhichActionCanNotBeHandled();
    }

    @eventOptions({ passive: true })
    private _handleDriverClicked(event: CustomEvent) {
        const action = this._determineAction(event);
        if (!action) {
            return;
        }

        this._handleAction(action);
    }

    private _toggleFullscreen(): void {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
        else {
            this.requestFullscreen();
        }
    }

    private _setFullscreenState(): void {
        if (document.fullscreenElement) {
            this.classList.add('fullscreen');
        } else {
            this.classList.remove('fullscreen');
        }
    }

    private _handleAction(action: string) {
        if (action === 'toggle-fullscreen') {
            this._toggleFullscreen();
        }

        this._getDrivenElements()
            .forEach(el => el.handleDriverAction(action));
    }

    private _hideDriversWhichActionCanNotBeHandled() {
        const drivers = this._getDriverElements();
        const driven = this._getDrivenElements();

        for (const driver of drivers) {
            const action = driver.getAttribute('data-action');
            if (!action) {
                continue;
            }

            driver.hidden = driven.some(el => el.canHandleDriverAction(action)) === false;
        }
    }

    private _determineAction(event: CustomEvent<any>) {
        const clickedEl = event.target as HTMLElement;
        const action = clickedEl.getAttribute('data-action') || clickedEl.closest('[data-action]')?.getAttribute('data-action');
        return action;
    }

    private _getDriverElements() : any[] {
        return (this.renderRoot.querySelector('slot[name="driver"]') as HTMLSlotElement)
            .assignedElements({ flatten: true })
            .map(el => el as any);
    }

    private _getDrivenElements() : DrivenByAction[] {
        return (this.renderRoot.querySelector('slot:not([name])') as HTMLSlotElement)
            .assignedElements({ flatten: true })
            .filter(isDrivenByAction)
            .map(el => (el as unknown) as DrivenByAction);
    }

    static override get styles() {
        return [resetCss, driverCss];
    }
}