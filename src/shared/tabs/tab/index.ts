import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("my-tab")
export class MyTab extends LitElement {

  override render() {
    const tabIndex = Array.from(this.parentElement?.querySelectorAll("my-tab") || []).indexOf(this);
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