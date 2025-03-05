import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import resetCss from '../styles/reset.css';
import badgeCss from './badge.css';
import "../icon";

@customElement('bdo-badge')
export class BdoBadge extends LitElement {
    @property({ type: String })
    type!: 'command' | 'query' | 'task' | 'event' | string;

    @property({ type: String })
    icon!: string;

    override render() {
        return html`
            <div class="badge ${this.type ? `badge-${this.type}` : ``}">
                ${this.icon ? html`<bdo-icon icon="${this.icon}"></bdo-icon>` : ``}
                <slot></slot>
            </div>
        `;
    }

    static override get styles() {
        return [resetCss, badgeCss];
    }
}