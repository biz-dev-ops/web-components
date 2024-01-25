import { html, LitElement } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { customElement, property } from "lit/decorators.js";
import "@phosphor-icons/webcomponents";

import { library, findIconDefinition, icon, IconName } from '@fortawesome/fontawesome-svg-core'
import { far } from '@fortawesome/free-regular-svg-icons'
library.add(far)

import 'material-symbols/outlined.css';

import iconCss from './icon.css';

@customElement("bdo-icon")
export class Icon extends LitElement {
    @property()
    icon!: string | undefined;

    override render() {
        if(!this.icon) {
            return html``;
        }

        if(this.icon.startsWith("ph-")) {
            const IconTag = customElements.get(this.icon);
            if (IconTag) {
                const iconElement = new IconTag();
                // if (this.inverted) {
                //     iconElement.setAttribute("color", "var(--color-brand-base)");
                // }
                // else {
                //     iconElement.setAttribute("color", "var(--color-white)");
                // }
                iconElement.setAttribute("weight", "bold");
                iconElement.setAttribute("size", "100%");
                iconElement.setAttribute("style", "display: grid; place-content: center;");
                return html`${iconElement}`;
            }
        }

        if(this.icon.startsWith("fa-")) {
            const iconName = this.icon.substring(3) as IconName; // remove the "fa-" prefix
            const iconDefinition = findIconDefinition({ prefix: 'far', iconName: iconName });
            const svgElement = icon(iconDefinition).html.join('');
            return html`${unsafeHTML(svgElement)}`;
        }

        if(this.icon.startsWith("mat-")) {
            return html`<span class="material-symbols-outlined">${this.icon.substring(4)}</span>`;
        }

        return html`<img .src=${this.icon} />` // This will always have the SVG color
    }

    static override get styles() {
        return iconCss;
    }
}
