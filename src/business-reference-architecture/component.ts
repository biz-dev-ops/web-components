import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import resetStyles from '../general/styles/reset';

@customElement('business-reference-architecture')
export class BusinessReferenceArchitectureComponent extends LitElement {

  override render() {
    return html`
      <h1>Hello World!</h1>
    `;
  }

  static override get styles() {
    const styles = css``;

    return [resetStyles, styles];
  }
}