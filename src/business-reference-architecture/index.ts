import { html, LitElement } from "lit";
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
        const hasSideSection = this.model.some(section => section.sectionType === "side");

        let gridCss = '';

        if(hasSideSection) {
            gridCss = `
                display: grid;
                grid-template-columns: 1fr 244px;
                column-gap: var(--space-md);
                row-gap: var(--space-lg);
            `;
        } else {
            gridCss = `
                display: flex;
                flex-direction: column;
                gap: var(--space-lg);
            `;
        }

        return html`
            <div class="architecture-section-grid" style="${gridCss}">
                ${this.model.map(section => html`<architecture-section .section=${section} .arrow=${section.arrow} .sectionType=${section.sectionType} .buttonType=${section.buttonType}></architecture-section>`)}
            </div>
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
        return [resetStyles];
    }
}
