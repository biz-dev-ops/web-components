import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

import resetCss from "../../shared/styles/reset.css";
import typographyCss from "../../shared/styles/typography.css";

import { Background } from "../models";
import "../step";
import backgroundCss from "./background.css";
import scenarioCss from "../scenario/scenario.css";

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
      <div class="${this.getBackgroundClass()}">
        <h3 class="scenario__title">Background: ${this.background.name || ""}</h3>
        <div class="scenario__steps">
          ${this.background.steps.map(
            (step) => html`<feature-step .step=${step}></feature-step>`
          )}
        </div>
      </div>
    `;
  }
} 