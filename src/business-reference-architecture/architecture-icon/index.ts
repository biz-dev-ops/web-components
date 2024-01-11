import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("architecture-icon")
export class ArchitectureIcon extends LitElement {
    @property() 
    icon!: string | undefined;

    override async connectedCallback() {
        super.connectedCallback();
    }

    override render() {
        if(!this.icon) {
            return html``;
        }

        if(this.icon.startsWith("ph-")) {
            return html`<i .className=${this.icon}></i>`;
        }

        return html`<img .src=${this.icon} />`
    }

    static override get styles() {
        return [
            css`
                :host {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--color-white);
                }
                svg {
                    width: 100%;
                    height: 100%;
                    color: inherit;
                }
            `,
        ];
    }
}
