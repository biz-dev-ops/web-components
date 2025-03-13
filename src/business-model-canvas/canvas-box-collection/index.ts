import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";

import styles from "../../shared/styles/reset.css";
import { Collection, Text, Head, ModelItem } from "../models";

export class CanvasBoxCollection extends LitElement {
  @property({ type: Array })
  items!: ModelItem[];

  @property({ attribute: "model-json" })
  itemsJson!: string;

  override render() {
    return html`
      ${this.items?.map((item) => {
        if ((item as Collection).items) {
          return html`<ul>
            ${(item as Collection).items.map((i) => html`<li>${i}</li>`)}
          </ul>`;
        }
        if (Array.isArray(item)) {
          return html`<ul>
            ${item.map((i) => html`<li>${i}</li>`)}
          </ul>`;
        }
        if ((item as Text).text) {
          return html`<p>${(item as Text).text}</p>`;
        }
        if ((item as Head).head) {
          return html`<h4>${(item as Head).head}</h4>`;
        }
        return html`<p>${item}</p>`;
      })}
    `;
  }

  static override get styles() {
    return [
      styles,
      css`
        p,
        li,
        h4 {
          font-weight: 300;
          font-size: 0.8em;
        }

        p,
        h4,
        ul {
          margin-block-start: 0.5rem;
          margin-block-end: 0.5rem;
        }

        h4 {
          font-weight: 600;
        }
      `,
    ];
  }
}

window.customElements.define("canvas-box-collection", CanvasBoxCollection);
