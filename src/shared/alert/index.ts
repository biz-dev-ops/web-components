import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import resetCss from '../styles/reset.css';
import alertCss from './alert.css';

import "../icon";

@customElement('bdo-alert')
export class BdoAlert extends LitElement {
    @property({ type: String })
    type: 'info' | 'warning' | 'error' = 'info';

    @property({ type: String })
    icon!: string;

    override render() {
        switch (this.type) {
            case 'info':
                this.icon = 'mat-info';
                break;
            case 'warning':
                this.icon = 'mat-warning';
                break;
            case 'error':
                this.icon = 'mat-error';
                break;
        }

        return html`
            <div class="alert ${this.type ? `alert--${this.type}` : ``}" role="alert">
                ${this.icon ? html`<bdo-icon icon="${this.icon}" class="alert__icon"></bdo-icon>` : ``}
                <div class="alert__message">
                    <slot></slot>
                </div>
            </div>
        `;
    }

    static override get styles() {
        return [resetCss, alertCss];
    }
}