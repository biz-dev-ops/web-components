import { html, LitElement, PropertyValues, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";

import styles from "./icon.css";
import materialCss from "material-symbols/outlined.css?inline";
import { appendFontFaceDefinitionToDom } from "../util";

@customElement("bdo-icon")
export class Icon extends LitElement {
  @property()
  icon!: string | undefined;
  
  @property({ type: String, attribute: "icon-align" })
  align: "start" | "center" | "end" = "end";
  @property({ type: String, attribute: "icon-justify" })
  justify: "start" | "center" | "end" = "end";
  @property({ type: String, attribute: "background" })
  background?: string;

  override updated(changedProperties: PropertyValues) {
    if (changedProperties.has("justify")) {
      this.style.setProperty("--icon-justify", this.justify);
    }
    if (changedProperties.has("align")) {
      this.style.setProperty("--icon-align", this.align);
    }
    if (changedProperties.has("background") && this.background) {
      this.style.setProperty("--icon-background", this.background);
    }
  }

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

    return html`<img .src=${icon} />`; // This will always have the SVG color
  }

  static override get styles() {
    return [styles, unsafeCSS(materialCss)];
  }
}
