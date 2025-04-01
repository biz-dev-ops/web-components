import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";

import resetCss from "../../shared/styles/reset.css";
import typographyCss from "../../shared/styles/typography.css";
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
      resetCss,
      typographyCss,
      css`
        :host {
          --font-size-base: var(--font-size-sm);
        }

        :where(p, ul, h4):not(:last-child) {
            margin-block-end: calc(var(--line-height-base) * .5rem);
        }
      `,
    ];
  }
}

window.customElements.define("canvas-box-collection", CanvasBoxCollection);
