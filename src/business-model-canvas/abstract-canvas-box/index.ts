import { css, html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";

import styles from "../../shared/styles/reset";
import { ModelItem } from "../models";

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
      <h3>
        ${this.title}
        <bdo-icon .icon=${this.icon}></bdo-icon>
      </h3>
      <canvas-box-collection .items=${this.items || this.defaultItems}></canvas-box-collection>
    `;
  }

  static override get styles() {
    return [styles, css`
      h3, bdo-icon {
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
        inline-size: var(--space-md);
        block-size: var(--space-md);
        aspect-ratio: 1;
        display: inline-flex;
        align-self: end;
      }
    `];
  }
}