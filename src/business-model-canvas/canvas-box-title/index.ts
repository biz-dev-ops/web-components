import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

import styles from "../css";

@customElement("canvas-box-title")
export abstract class CanvasBoxTitle extends LitElement {

  override render() {
    return html`
      <span class="block-title" title="${this.title}">
          ${this.title}
          <slot></slot>
      </span>
    `;
  }

  static override get styles() {
    return [styles, css`
      .block-title {
        display: flex;
        justify-content: space-between;
      }

      ::slotted(svg) {
        inline-size: var(--space-md);
        block-size: var(--space-md);
        aspect-ratio: 1;
        display: inline-flex;
        align-self: end;
      }
    `];
  }
}