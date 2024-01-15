import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ButtonType } from "../models";

import "@phosphor-icons/webcomponents";

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

    @property()
    buttonType!: ButtonType;

    override async connectedCallback() {
        super.connectedCallback();
    }

    override render() {
        if(!this.icon) {
            return html``;
        }

        if(this.icon.startsWith("ph-")) {
            const IconTag = customElements.get(this.icon);
            if (IconTag) {
                const iconElement = new IconTag();
                if (this.buttonType === "default") {
                    iconElement.setAttribute("color", "var(--color-brand-base)");
                } else {
                    iconElement.setAttribute("color", "white");
                }
                iconElement.setAttribute("weight", "bold");
                iconElement.setAttribute("size", "100%");
                iconElement.setAttribute("style", "display: grid; place-content: center;");
                return html`${iconElement}`;
            }
        }

        if(this.icon.startsWith("fa-")) {
            return html`<i class="fa-regular ${this.icon}"></i>`;
        }

        if(this.icon.startsWith("mat-")) {
            return html`<span class="material-symbols-outlined">${this.icon.substring(4)}</span>`;
        }

        return html`<img .src=${this.icon} />` // This will always have the SVG color
    }

    static override get styles() {
        return [
            css`
                :host {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--color-white);
                    overflow: hidden;
                }
            `,
        ];
    }
}
