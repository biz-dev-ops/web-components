import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

import styles from "../../general/styles/reset";
import { Collection, Text, Head, ModelItem } from "../modules/models/model";

@customElement("canvas-box-collection")
export abstract class CanvasBoxCollection extends LitElement {
  @property({ type: Array })
  items!: ModelItem[];

  @property({ attribute: "model-json" })
  itemsJson!: string;

  override render() {
    return html`
      ${
        this.items?.map(item => {
          if((item as Collection).items) {
            return html`<ul>${(item as Collection).items.map(i => html`<li>${i}</li>`)}</ul>`;
          }
          else if (Array.isArray(item)) {
            return html`<ul>${item.map(i => html`<li>${i}</li>`)}</ul>`;
          }
          else if((item as Text).text){
            return html`<p>${(item as Text).text}</p>`;
          }
          else if((item as Head).head){
            return html`<h1>${(item as Head).head}</h1>`;
          }
          else {
            return html`<p>${item}</p>`;
          }
        })
      }
    `;
  }

  static override get styles() {
    return [styles, css`
      p,li,h1 {
        font-weight: 300;
        font-size: 0.8em;
      }

      h1 {
        font-weight: 600;
      }
    `];
  }
}