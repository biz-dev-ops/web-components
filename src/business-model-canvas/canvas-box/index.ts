import { html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import styles from "../css";
import { ModelItem } from "../modules/models/model";

import "../canvas-box-title";
import "../canvas-box-collection";

export abstract class CanvasBox extends LitElement {
  protected abstract defaultItems: ModelItem[];
  
  //Icons from https://www.svgrepo.com/collection/solar-linear-icons/
  @state()
  protected abstract icon: string;

  @property({ type: Array })
  items!: ModelItem[];
  
  override render() {
    return html`
      <canvas-box-title title=${this.title}>
        ${unsafeHTML(this.icon)}
      </canvas-box-title>
      <canvas-box-collection .items=${this.items || this.defaultItems}></canvas-box-collection>
    `;
  }

  static override get styles() {
    return [styles];
  }
}