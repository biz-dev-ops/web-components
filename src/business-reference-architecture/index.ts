import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

import resetStyles from "../shared/styles/reset";
import { Section } from "./models";

import "@biz-dev-ops/md-docs/assets/style/page/style.css";
import "../../assets/style/custom-theme.css";

import "./architecture-section";

@customElement("business-reference-architecture")
export class BusinessReferenceArchitectureComponent extends LitElement {
  @property({ type: Array })
  model!: Section[];

  @property({ attribute: "model-json" })
  modelJson!: string;

  override render() {
    return html`
      <div class="architecture-section-grid" data-has-side="${this.hasSide()}">
        ${this.model.map(
          (section) =>
            html`<architecture-section
              .section=${section}
              .arrow=${section.arrow}
              .sectionType=${section.sectionType}
              .buttonType=${section.buttonType}
            ></architecture-section>`
        )}
      </div>
    `;
  }

  hasSide() {
    return this.model.some((section) => section.sectionType === "side");
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
    return [
      resetStyles,
      css`
        :host {
          margin-top: var(--space-sm);
          display: block;
        }

        .architecture-section-grid[data-has-side="true"] {
          display: grid;
          grid-template-columns: 1fr 244px;
          column-gap: var(--space-md);
          row-gap: var(--space-lg);
        }

        .architecture-section-grid[data-has-side="false"] {
          display: flex;
          flex-direction: column;
          gap: var(--space-lg);
        }
      `,
    ];
  }
}
