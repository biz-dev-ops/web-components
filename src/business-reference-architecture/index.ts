import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

import resetStyles from "../shared/styles/reset";
import { Section } from "./models";

import "./architecture-section";

@customElement("business-reference-architecture")
export class BusinessReferenceArchitectureComponent extends LitElement {
    @property({ type: Array })
    model!: Section[];

    @property({ attribute: "model-json" })
    modelJson!: string;

    override render() {
        return html`
            ${this.model.map(section => html`<architecture-section .section=${section} .arrow=${section.arrow} .sectionStyle=${section.sectionStyle} .buttonStyle=${section.buttonStyle}></architecture-section>`)}
        `;
    }

    override update(changedProperties: Map<string, unknown>) {
        if (changedProperties.has("modelJson")) {
            try {
                this.model = JSON.parse(this.modelJson);
            } catch (e) {
                console.error("Error parsing modelJson:", e);
            }
        }
        super.update(changedProperties);
    }

    static override get styles() {
        return [resetStyles, css`
            :host {
                display: grid;
                grid-template-columns: repeat(12, 1fr);
                column-gap: var(--space-md);
                row-gap: var(--space-lg);
            }
        `];
    }
}
