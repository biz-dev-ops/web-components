import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

/*
Font icon support for:
- https://fonts.google.com/icons
- https://fontawesome.com/
- https://phosphoricons.com/

Add font files to html to enable the functionality.
*/
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

        if(this.icon.startsWith("fa-")) {
            return html`<i class="fa-regular ${this.icon}"></i>`;
        }

        if(this.icon.startsWith("mat-")) {
            return html`<span class="material-symbols-outlined">${this.icon.substring(4)}</span>`;
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
