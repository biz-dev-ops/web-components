import { html, LitElement, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";

import styles from "./icon.css";
import materialCss from "material-symbols/outlined.css?inline";
import { appendFontFaceDefinitionToDom } from "../util";

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

  override async firstUpdated() {
    appendFontFaceDefinitionToDom(this);
  }

  static override get styles() {
    return [styles, unsafeCSS(materialCss)];
  }
}
