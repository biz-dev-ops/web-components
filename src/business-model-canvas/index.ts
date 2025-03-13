import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

import resetCss from "../shared/styles/reset.css";
import themeCss from "../shared/styles/theme.css";

import { Model } from "./models";
import "./canvas-box";
import { data } from "./data";
import { FetchError, fetchYamlAndBundleAs } from "../shared/fetch";

@customElement("business-model-canvas")
export class BusinessModelCanvasComponent extends LitElement {
  @property({ type: Object })
  model!: Model | FetchError;

  @property({ attribute: "src" })
  src!: string

  @property({ attribute: "data-json" })
  json!: string;

  override render() {
    if (this.model instanceof FetchError) {
      return html`<div class="error">${this.model.message}</div>`;
    }

    return html` <div class="canvas-grid">
      <div class="canvas-grid__item">
        <canvas-box
          data-test-id="keyPartnerships"
          .items=${this.model?.keyPartnerships?.items || data.keyPartnerships.items}
          .icon=${this.model?.keyPartnerships?.icon || data.keyPartnerships.icon}
          .title=${this.model?.keyPartnerships?.title || data.keyPartnerships.title}
        ></canvas-box>
      </div>
      <div class="canvas-grid__item">
        <canvas-box
          data-test-id="keyActivities"
          .items=${this.model?.keyActivities?.items || data.keyActivities.items}
          .icon=${this.model?.keyActivities?.icon || data.keyActivities.icon}
          .title=${this.model?.keyActivities?.title || data.keyActivities.title}
        ></canvas-box>
      </div>
      <div class="canvas-grid__item">
        <canvas-box
          data-test-id="keyResources"
          .items=${this.model?.keyResources?.items || data.keyResources.items}
          .icon=${this.model?.keyResources?.icon || data.keyResources.icon}
          .title=${this.model?.keyResources?.title || data.keyResources.title}
        ></canvas-box>
      </div>
      <div class="canvas-grid__item">
        <canvas-box
          data-test-id="valuePropositions"
          .items=${this.model?.valuePropositions?.items || data.valuePropositions.items}
          .icon=${this.model?.valuePropositions?.icon || data.valuePropositions.icon}
          .title=${this.model?.valuePropositions?.title || data.valuePropositions.title}
        ></canvas-box>
      </div>
      <div class="canvas-grid__item">
        <canvas-box
          data-test-id="customerRelationships"
          .items=${this.model?.customerRelationships?.items || data.customerRelationships.items}
          .icon=${this.model?.customerRelationships?.icon || data.customerRelationships.icon}
          .title=${this.model?.customerRelationships?.title || data.customerRelationships.title}
        ></canvas-box>
      </div>
      <div class="canvas-grid__item">
        <canvas-box
          data-test-id="customerSegments"
          .items=${this.model?.customerSegments?.items || data.customerSegments.items}
          .icon=${this.model?.customerSegments?.icon || data.customerSegments.icon}
          .title=${this.model?.customerSegments?.title || data.customerSegments.title}
        ></canvas-box>
      </div>
      <div class="canvas-grid__item">
        <canvas-box
          data-test-id="channels"
          .items=${this.model?.channels?.items || data.channels.items}
          .icon=${this.model?.channels?.icon || data.channels.icon}
          .title=${this.model?.channels?.title || data.channels.title}
        ></canvas-box>
      </div>
      <div class="canvas-grid__item">
        <canvas-box
          data-test-id="costStructure"
          .items=${this.model?.costStructure?.items || data.costStructure.items}
          .icon=${this.model?.costStructure?.icon || data.costStructure.icon}
          .title=${this.model?.costStructure?.title || data.costStructure.title}
        ></canvas-box>
      </div>
      <div class="canvas-grid__item">
        <canvas-box
          data-test-id="revenueStreams"
          .items=${this.model?.revenueStreams?.items || data.revenueStreams.items}
          .icon=${this.model?.revenueStreams?.icon || data.revenueStreams.icon}
          .title=${this.model?.revenueStreams?.title || data.revenueStreams.title}
        ></canvas-box>
      </div>
    </div>`;
  }

  override async update(changedProperties: Map<string, unknown>) {
    if (changedProperties.has("src")) {
      if(!this.src) {
        this.model = data;
      }
      else {
        try {
          this.model = await fetchYamlAndBundleAs<Model>(this.src);
        }
        catch (error: any) {
          this.model = error;
        }
      }
    }

    if (changedProperties.has("json")) {
      console.log(this.json);
      this.model = JSON.parse(this.json);
    }

    super.update(changedProperties);
  }

  static override get styles() {
    return [
      resetCss,
      themeCss,
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
