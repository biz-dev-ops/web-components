import { html, LitElement, PropertyValues, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";

import resetCss from "../styles/reset.css";
import iconCss from "./icon.css";
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

    // Render a single or a joined icons
    const icons = this.icon.split(" ").slice(0, 2);
    return html`${icons.map((icon) => this.renderIcon(icon))}`;
  }

  override async firstUpdated() {
    appendFontFaceDefinitionToDom(this);
  }

  renderIcon(icon: string) {
    if (icon.startsWith("mat-")) {
      return html`
        <span class="icon">
          <span class="symbol material-symbols">${icon.substring(4)}</span>
        </span>`;
    }

    // This will always have the SVG color
    return html`<img .src=${icon} />`;
  }

  static override get styles() {
    return [resetCss, iconCss, unsafeCSS(materialCss)];
  }
}
