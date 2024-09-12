import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "../shared/styles/reset";
import { Model } from "./models";
import "./canvas-box";
import { data } from "./data";

@customElement("business-model-canvas")
export class BusinessModelCanvasComponent extends LitElement {
  @property({ type: Object })
  model!: Model;

  @property({ attribute: "model-json" })
  modelJson!: string;

  override render() {
    return html` <div class="canvas-grid">
      <div class="canvas-grid__item">
        <canvas-box
          .items=${this.model.keyPartnerships || data.keyPartnerships.defaultItems}
          .icon=${data.keyPartnerships.icon}
          .title=${data.keyPartnerships.title}
        ></canvas-box>
      </div>
      <div class="canvas-grid__item">
        <canvas-box
          .items=${this.model.keyActivities || data.keyActivities.defaultItems}
          .icon=${data.keyActivities.icon}
          .title=${data.keyActivities.title}
        ></canvas-box>
      </div>
      <div class="canvas-grid__item">
        <canvas-box
          .items=${this.model.keyResources || data.keyResources.defaultItems}
          .icon=${data.keyResources.icon}
          .title=${data.keyResources.title}
        ></canvas-box>
      </div>
      <div class="canvas-grid__item">
        <canvas-box
          .items=${this.model.valuePropositions || data.valuePropositions.defaultItems}
          .icon=${data.valuePropositions.icon}
          .title=${data.valuePropositions.title}
        ></canvas-box>
      </div>
      <div class="canvas-grid__item">
        <canvas-box
          .items=${this.model.customerRelationships || data.customerRelationships.defaultItems}
          .icon=${data.customerRelationships.icon}
          .title=${data.customerRelationships.title}
        ></canvas-box>
      </div>
      <div class="canvas-grid__item">
        <canvas-box
          .items=${this.model.customerSegments || data.customerSegments.defaultItems}
          .icon=${data.customerSegments.icon}
          .title=${data.customerSegments.title}
        ></canvas-box>
      </div>
      <div class="canvas-grid__item">
        <canvas-box
          .items=${this.model.channels || data.channels.defaultItems}
          .icon=${data.channels.icon}
          .title=${data.channels.title}
        ></canvas-box>
      </div>
      <div class="canvas-grid__item">
        <canvas-box
          .items=${this.model.costStructure || data.costStructure.defaultItems}
          .icon=${data.costStructure.icon}
          .title=${data.costStructure.title}
        ></canvas-box>
      </div>
      <div class="canvas-grid__item">
        <canvas-box
          .items=${this.model.revenueStreams || data.revenueStreams.defaultItems}
          .icon=${data.revenueStreams.icon}
          .title=${data.revenueStreams.title}
        ></canvas-box>
      </div>
    </div>`;
  }

  override update(changedProperties: Map<string, unknown>) {
    if (changedProperties.has("modelJson")) {
      this.model = JSON.parse(this.modelJson);
    }

    super.update(changedProperties);
  }

  static override get styles() {
    return [
      styles,
      css`
        .canvas-grid {
          width: 100%;
          display: grid;
          grid-gap: var(--line-base);
          background-color: var(--color-brand-a40);
          grid-template-columns: repeat(1, 1fr);
          border: var(--line-base) solid var(--color-brand-a40);
          margin-top: var(--space-md);
        }

        .canvas-grid__item {
          background-color: #ffffff;
          padding: var(--space-xs);
        }

        @media (min-width: 768px) {
          .canvas-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .canvas-grid__item:nth-child(3) {
            grid-column: auto / span 2;
          }
        }

        @media (min-width: 1200px) {
          .canvas-grid {
            grid-template-columns: repeat(6, 1fr);
          }

          .canvas-grid__item {
            grid-column: auto / span 2;
          }
        }

        @media (min-width: 1400px) {
          .canvas-grid {
            grid-template-columns: repeat(10, 1fr);
          }

          .canvas-grid__item {
            grid-column: auto / span 2;
            background-color: #ffffff;
            padding: var(--space-xs);
          }

          .canvas-grid__item:nth-child(3) {
            grid-column-start: 3;
          }

          .canvas-grid__item:nth-child(4) {
            grid-row: 1 / span 2;
            grid-column-start: 5;
          }

          .canvas-grid__item:nth-child(5) {
            grid-row-start: 1;
            grid-column-start: 7;
          }

          .canvas-grid__item:nth-child(6) {
            grid-row: 1 / span 2;
            grid-column-start: 9;
          }

          .canvas-grid__item:nth-child(1) {
            grid-row: auto / span 2;
          }

          .canvas-grid__item:nth-child(8),
          .canvas-grid__item:nth-child(9) {
            grid-column: auto / span 5;
          }
        }
      `,
    ];
  }
}
