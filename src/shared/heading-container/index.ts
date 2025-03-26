import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

import resetCss from "../styles/reset.css";
import headingContainerCss from "./heading-container.css";
@customElement("bdo-heading-container")
export class BdoHeadingContainer extends LitElement {
    @property({ type: Number, attribute: "heading-level" })
    headingLevel = 1;

    override render() {
        return html`
            <div class="header">
                <slot name="header"></slot>
            </div>
            <div class="content">
                <slot></slot>
            </div>
        `;
    }

    static override get styles() {
        return [resetCss, headingContainerCss];
    }
}