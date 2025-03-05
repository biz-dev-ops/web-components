import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

import styles from "../../shared/styles/reset.css";
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
      styles,
      css`
        h3,
        bdo-icon {
          color: var(--text-color-heading);
        }

        h3 {
          display: flex;
          justify-content: space-between;
          font-weight: 700;
          font-size: 1em;
          margin: 0;
          font-family: var(--font-family-heading);
          line-height: var(--line-height-heading);
        }

        bdo-icon {
          font-size: 1.4rem;
          font-weight: 400;
        }
      `,
    ];
  }
}
