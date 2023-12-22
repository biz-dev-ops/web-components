import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import resetStyles from '../../shared/styles/reset';
import { unsafeHTML } from 'lit/directives/unsafe-html';

@customElement('canvas-box-title')
export abstract class CanvasBoxTitle extends LitElement {
  @property()
  icon!: string;

  override render() {
    return html`
      <span class="block-title" title="${this.title}">
          ${this.icon}
          ${unsafeHTML(this.icon)}
      </span>
    `;
  }

  static override get styles() {
    return [resetStyles, css``];
  }
}
