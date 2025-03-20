import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("bdo-tab")
export class BdoTab extends LitElement {

  override render() {
    const tabIndex = Array.from(this.parentElement?.querySelectorAll("bdo-tab") || []).indexOf(this);
    return html`<div role="tabpanel" aria-labelledby="tab-${tabIndex}" id="tabpanel-${tabIndex}"><slot></slot></div>`;
  }

  static override get styles() {
    return css`
      :host {
          display: block;
      }
    `;
  };
}