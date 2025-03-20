import { html, LitElement, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("bdo-heading-container")
export class BdoHeadingContainer extends LitElement {
  @property({ type: Number, attribute: "heading-level" })
  headingLevel = 1;

  static override styles = css`
    :host {
      display: block;
      margin-bottom: 1rem;
      border-left: 0.25rem solid lightgray;
      padding-left: 1rem;
    }

    :host([heading-level="1"]) {
      border-left-color: #007bff;
    }

    :host([heading-level="2"]) {
      border-left-color: #28a745;
    }

    :host([heading-level="3"]) {
      border-left-color: #dc3545;
    }

    :host([heading-level="4"]) {
      border-left-color: #ffc107;
    }

    :host([heading-level="5"]) {
      border-left-color: #17a2b8;
    }

    :host([heading-level="6"]) {
      border-left-color: #6c757d;
    }

    ::slotted([slot="header"]) {
      margin-top: 0;
    }
  `;

  override render() {
    return html`
      <slot name="header"></slot>
      <slot></slot>
    `;
  }
}