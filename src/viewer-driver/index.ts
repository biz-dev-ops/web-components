import { LitElement, html } from 'lit';
import { customElement, eventOptions } from 'lit/decorators.js';
import resetCss from '../shared/styles/reset.css';
import viewerDriverCss from './viewer-driver.css';

import "../shared/icon";
import "../shared/driver";

@customElement('viewer-driver')
export class ViewerDriverComponent extends LitElement {

    override render() {
        return html`
            <bdo-driver>
                <button slot="driver" id="toggle-fullscreen" data-action="toggle-fullscreen" @click=${this._toggleFullscreen}>
                    <bdo-icon icon="mat-fullscreen"></bdo-icon>
                    <span>Fullscreen</span>
                </button>
                <button slot="driver" data-action="zoom-in">
                    <bdo-icon icon="mat-zoom_in"></bdo-icon>
                    <span>Zoom in</span>
                </button>
                <button slot="driver" data-action="zoom-out">
                    <bdo-icon icon="mat-zoom_out"></bdo-icon>
                    <span>Zoom out</span>
                </button>
                <button slot="driver" data-action="zoom-reset">
                    <bdo-icon icon="mat-reset_focus"></bdo-icon>
                    <span>Zoom reset</span>
                </button>
                <slot></slot>
            </bdo-driver>
            <slot name="driver" @slotchange=${this._handleSlotChange}></slot>
        `;
    }

    @eventOptions({ passive: true })
    _toggleFullscreen() {
        const button = this.renderRoot.querySelector('#toggle-fullscreen') as HTMLButtonElement;
        const icon = button.querySelector('bdo-icon') as HTMLElement;
        const span = button.querySelector('span') as HTMLElement;

        const fullscreen = (this.getAttribute('data-fullscreen') || 'false') === 'true' ? 'false' : 'true';

        this.setAttribute('data-fullscreen', fullscreen);
        button.setAttribute('data-action', fullscreen === 'true' ? 'fullscreen' : 'exit-fullscreen');
        icon.setAttribute('icon', fullscreen === 'true' ? 'mat-fullscreen_exit' : 'mat-fullscreen');
        span.textContent = fullscreen === 'true' ? 'Exit fullscreen' : 'Fullscreen';
    }

    @eventOptions({ passive: true })
    _handleSlotChange(event: Event) {
        const slottedElements = (event.target as HTMLSlotElement).assignedElements({ flatten: true });
        const driver = this.renderRoot.querySelector('bdo-driver')!;
        slottedElements.forEach(node => {
            driver.appendChild(node);
        });
    }

    static override get styles() {
        return [resetCss, viewerDriverCss];
    }
}