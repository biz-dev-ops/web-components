import { html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";

import styles from "../../shared/styles/reset";
import { ModelItem } from "../models";

import "../canvas-box-title";
import "../canvas-box-collection";
import "../../shared/icon";

export abstract class AbstractCanvasBox extends LitElement {
  protected abstract defaultItems: ModelItem[];
  
  @state()
  protected abstract icon: string;

  @property({ type: Array })
  items!: ModelItem[];
  
  override render() {
    return html`
      <canvas-box-title title=${this.title}>
        <bdo-icon .icon=${this.icon}></bdo-icon>
      </canvas-box-title>
      <canvas-box-collection .items=${this.items || this.defaultItems}></canvas-box-collection>
    `;
  }

  static override get styles() {
    return [styles];
  }
}