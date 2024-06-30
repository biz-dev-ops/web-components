import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "../shared/styles/reset";
import { Model } from "./models";

import "@biz-dev-ops/md-docs/assets/style/page/style.css";

import "./channels-canvas-box";
import "./cost-structure-canvas-box";
import "./customer-relationships-canvas-box";
import "./customer-segments-canvas-box";
import "./key-activities-canvas-box";
import "./key-partnerships-canvas-box";
import "./key-resources-canvas-box";
import "./revenue-streams-canvas-box";
import "./value-propositions-canvas-box/";

@customElement("business-model-canvas")
export class BusinessModelCanvasComponent extends LitElement {
  @property({ type: Object })
  model!: Model;

  @property({ attribute: "model-json" })
  modelJson!: string;

  override render() {
    return html` <table cellspacing="0">
      <tr>
        <td colspan="2" rowspan="3">
          <key-partnerships-canvas-box
            .items=${this.model.keyPartnerships}
          ></key-partnerships-canvas-box>
        </td>
        <td colspan="2" rowspan="1">
          <key-activities-canvas-box
            .items=${this.model.keyActivities}
          ></key-activities-canvas-box>
        </td>
        <td colspan="2" rowspan="3">
          <value-propositions-canvas-box
            .items=${this.model.valuePropositions}
          ></value-propositions-canvas-box>
        </td>
        <td colspan="2" rowspan="1">
          <customer-relationships-canvas-box
            .items=${this.model.customerRelationships}
          ></customer-relationships-canvas-box>
        </td>
        <td colspan="2" rowspan="3">
          <customer-segments-canvas-box
            .items=${this.model.customerSegments}
          ></customer-segments-canvas-box>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <key-resources-canvas-box
            .items=${this.model.keyResources}
          ></key-resources-canvas-box>
        </td>
        <td colspan="2">
          <channels-canvas-box
            .items=${this.model.keyResources}
          ></channels-canvas-box>
        </td>
      </tr>
      <tr></tr>
      <tr>
        <td colspan="5">
          <cost-structure-canvas-box
            .items=${this.model.costStructure}
          ></cost-structure-canvas-box>
        </td>
        <td colspan="5">
          <revenue-streams-canvas-box
            .items=${this.model.revenueStreams}
          ></revenue-streams-canvas-box>
        </td>
      </tr>
    </table>`;
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
        table {
          border: none;
          border: var(--line-base) solid var(--color-brand-a40);
          border-radius: var(--radius-base);
          width: 100%;
        }

        td {
          border: none;
          border-top: var(--line-base) solid var(--color-brand-a40);
          border-left: var(--line-base) solid var(--color-brand-a40);
          text-align: left;
          vertical-align: top;
          height: 200px;
          width: 200px;
          padding: var(--space-xs);
        }
      `,
    ];
  }
}
