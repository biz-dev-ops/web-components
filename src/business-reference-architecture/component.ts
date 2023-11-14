import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import resetStyles from '../general/styles/reset';
import { Model } from './modules/models/model';

@customElement('business-reference-architecture')
export class BusinessReferenceArchitectureComponent extends LitElement {
  @property() 
  model!: Model

  @property({ attribute: "model-json" })
  modelJson!: string
  
  override render() {
    return html`<h1>Hello World!</h1>`;
  }

  override update(changedProperties: Map<string, unknown>) {
    if(changedProperties.has("modelJson")) {
      this.model = JSON.parse(this.modelJson);
    }
    super.update(changedProperties);
  }

  override updated() { }

  static override get styles() {
    const styles = css``;

    return [resetStyles, styles];
  }
}