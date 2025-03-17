import { html, LitElement, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";

import styles from "./icon.css";
//@Tristan, wanneer ik ?dev verander in ?inline dan verdwijnen de iconen. Graag advies
import materialCss from "material-symbols/outlined.css?inline";

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
    return [styles, unsafeCSS(materialCss)];
  }
}
