import { LitElement, html } from 'lit';
import { customElement, eventOptions, property } from 'lit/decorators.js';
import resetCss from '../styles/reset.css';
import buttonCss from './button.css';

@customElement('bdo-button')
export class BdoButton extends LitElement {
    @property({ type: String })
    type: 'button' | 'submit' | 'reset' | 'menu' = 'button';

    @property({ type: String })
    direction!: 'up' | 'right' | 'down' | 'left';

    @property({ type: Boolean })
    disabled = false;

    @property({ type: String, attribute: 'title', reflect: true })
    label?: string;

    override render() {
        return html`
            <button type="${this.type}" .disabled='${this.disabled}' @click="${this._onClick}" .ariaLabel="${this.label ? this.label : null}">
                <span class="content">
                    <slot></slot>
                </span>
            </button>
        `;
    }

    @eventOptions({ passive: true })
    private _onClick() {
        this.dispatchEvent(new CustomEvent('clicked'));
    }

    static override get styles() {
        return [resetCss, buttonCss];
    }
}