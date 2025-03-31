import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

import resetCss from "../../shared/styles/reset.css";
import typographyCss from "../../shared/styles/typography.css";
import { ModelItem } from "../models";

import "../canvas-box-collection";
import "../../shared/icon";

@customElement("canvas-box")
export class CanvasBox extends LitElement {
  @property({ type: String })
  override title!: string;

  @property({ type: String })
  icon!: string;

  @property({ type: Array })
  items!: ModelItem[];

  override render() {
    return html`
      <h3>
        ${this.title}
        <bdo-icon .icon=${this.icon}></bdo-icon>
      </h3>
      <canvas-box-collection .items=${this.items || []}></canvas-box-collection>
    `;
  }

  static override get styles() {
    return [
      resetCss,
      typographyCss,
      css`
        h3 {
          display: flex;
          justify-content: space-between;
          font-size: var(--font-size-base);
        }

        bdo-icon {
          font-size: var(--space-md);
          font-weight: 400;
        }
      `,
    ];
  }
}
