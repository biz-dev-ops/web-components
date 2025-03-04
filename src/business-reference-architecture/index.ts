import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import resetStyles from "../shared/styles/reset";
import { Section } from "./models";
import "./architecture-section";
import { FetchError, fetchYamlAndBundleAs } from "../shared/fetch";

@customElement("business-reference-architecture")
export class BusinessReferenceArchitectureComponent extends LitElement {
  @property({ type: Array })
  model!: Section[];

  @property({ attribute: "src" })
  src!: string;

  @property({ attribute: "data-json" })
  json!: string;

  override render() {
    if (this.model instanceof FetchError) {
      return html`<div class="error">${this.model.message}</div>`;
    }

    return html`
      <div class="architecture-section-grid" data-has-side="${this.hasSide()}">
        ${this.model.map((section) => html`<architecture-section
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

  override async update(changedProperties: Map<string, unknown>) {
    if (changedProperties.has("src")) {
      try {
        this.model = await fetchYamlAndBundleAs<Section[]>(this.src);
      }
      catch (error: any) {
        this.model = error;
      }
    }

    if (changedProperties.has("json")) {
      this.model = JSON.parse(this.json);
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
