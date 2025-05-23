import { LitElement, html } from 'lit';
import { customElement, eventOptions, property } from 'lit/decorators.js';
import resetCss from '../styles/reset.css';
import truncateCss from './truncate.css';

@customElement('bdo-truncate')
export class BdoTruncate extends LitElement {
    @property({ type: Boolean })
    open: boolean = false;

    @property({ type: Boolean })
    disabled: boolean = false;

    constructor() {
        super();
    }

    override render() {
        return html`
            <div class="truncate ${this.open && !this.disabled ? '' : 'truncate--active'}">
                <div class="truncate__content">
                    <slot></slot>
                </div>
                <button aria-expanded="${this.open}" @click="${this._onClick}" class="truncate__toggle" ?disabled="${this.disabled}">
                    ${this.open ? 'Toon minder' : 'Toon meer'}
                </button>
            </div>
        `;
    }


    override firstUpdated(): void {
        const content = this.renderRoot.querySelector('.truncate__content');

        if (!content) return;

        new ResizeObserver(e => {
            if (!this.open) {
                if (this.disabled === _isTextClamped(e[0].target)) {
                    this.disabled = !this.disabled;
                }
            }
        }).observe(content);
    }

    @eventOptions({ passive: true })
    private _onClick() {
        this.open = !this.open;
    }

    static override get styles() {
        return [resetCss, truncateCss];
    }
}

const  _isTextClamped = (elm: Element) => elm.scrollHeight > elm.clientHeight || elm.scrollWidth > elm.clientWidth