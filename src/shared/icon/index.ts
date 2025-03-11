import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

import resetCss from '../styles/reset.css';
import styles from "./icon.css";
import "material-symbols/outlined.css";

@customElement("bdo-icon")
export class Icon extends LitElement {
  @property()
  icon!: string | undefined;

  override render() {
    if (!this.icon) {
      return html``;
    }

    if (this.icon.startsWith("mat-")) {
      return html`<span class="material-symbols"
        >${this.icon.substring(4)}</span
      >`;
    }

    return html`<img .src=${this.icon} />`; // This will always have the SVG color
  }

  static override get styles() {
    return [resetCss, styles];
  }
}
