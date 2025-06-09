import { LitElement, html } from "lit";
import { customElement, eventOptions, query } from "lit/decorators.js";
import resetCss from '../styles/reset.css';
import popoverCss from "./popover.css";

@customElement("bdo-popover")
export class BdoPopover extends LitElement {
    @query("[popover]")
    _popoverElement!: HTMLElement;

    @query("[popovertarget]")
    _buttonElement!: HTMLElement;

    override render() {
        return html`
            <button popovertarget="popover-target" class="popover-control popover-control--info" @click=${this._onClick.bind(this)}>
                <abbr title="info">i</abbr>
            </button>
            <div id="popover-target" popover>
                <slot></slot>
            </div>
        `;
    }

    override firstUpdated(): void {
        if (_supportsPopover()) {
            (this._popoverElement as any).popover = "auto";
            (this._buttonElement as any).popoverTarget = this._popoverElement.id;
            (this._buttonElement as any).popoverTargetAction = "toggle";
            this._buttonElement.setAttribute('aria-haspopup', 'true');
            this._buttonElement.setAttribute('aria-expanded', 'false');
        }
    }

    @eventOptions({ passive: true })
    private _onClick(event: Event): void {
        event.stopPropagation();

        if (this._buttonElement.getAttribute('aria-expanded') === 'true') {
            this._buttonElement.setAttribute('aria-expanded', 'false');

            if (!_supportsPopover()) {
                this._popoverElement.style.display = 'none';
            }
        } else {
            this._buttonElement.setAttribute('aria-expanded', 'true');

            if (!_supportsPopover()) {
                this._popoverElement.style.display = 'block';
                this._popoverElement.style.position = 'fixed';
                this._popoverElement.style.zIndex = '999';
            }

            _position(this._buttonElement, this._popoverElement, this.parentElement);
        }
    };

    static override get styles() {
        return [resetCss, popoverCss];
    }
}

const _position = (button: HTMLElement, popover: HTMLElement, context: HTMLElement | null) => {
    if (!parent) {
        return;
    }

    const buttonPosition = button.getBoundingClientRect();
    const contextPosition = context?.getBoundingClientRect();
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

    if (contextPosition) {
        popover.style.left = `${buttonPosition.left - 32}px`;
        popover.style.top = `${buttonPosition.bottom + scrollTop}px`;
    }
}

const _supportsPopover = (): boolean => {
    return HTMLElement.prototype.hasOwnProperty("popover");
}