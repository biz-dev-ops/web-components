import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

import resetCss from "../../shared/styles/reset.css";
import typographyCss from "../../shared/styles/typography.css";

import { Background } from "../models";
import scenarioCss from "../scenario/scenario.css";
import "../step";
import "../stats";
import "../../shared/heading-container";

export const tag = "feature-background";

@customElement(tag)
export class BackgroundComponent extends LitElement {
  @property({ type: Object })
  background!: Background;

  static override styles = [
    resetCss,
    typographyCss,
    scenarioCss
  ];

  private getBackgroundClass(): string {
    const baseClass = "scenario";
    if (!this.background.result) return baseClass;
    return `${baseClass} scenario--${this.background.result}`;
  }

  override render() {
    return html`
      <bdo-heading-container aria-expanded="false" class="${this.getBackgroundClass()}">
        <div slot="header" class="scenario__header">
          <h3 class="scenario__title">Background: ${this.background.name}</h3>
        </div>
        <feature-stats .items=${this.background.steps}></feature-stats>
        <div class="scenario__steps">
          ${this.background.steps.map(
            (step) => html`<feature-step .step=${step}></feature-step>`
          )}
        </div>
      </bdo-heading-container>
    `;
  }
}