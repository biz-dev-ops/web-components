import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("bdo-tab")
export class BdoTab extends LitElement {
  @property({ type: String }) override title!: string;
  @property() override id: string = "";
  
  override updated() {
    if (!this.title) {
      throw new Error('Title is required but was not provided.');
    }
    
    if (!this.id) {
      this.id = this.title.toLowerCase().replace(/\s/g, "-");
    }
  }

  override render() {
    return html`<div role="tabpanel" aria-labelledby="tab-${this.id}" id="tabpanel-${this.id}"><slot></slot></div>`;
  }

  static override get styles() {
    return css`
      :host {
        display: block;
        padding-block: var(--space-md);
      }
    `;
  };
}