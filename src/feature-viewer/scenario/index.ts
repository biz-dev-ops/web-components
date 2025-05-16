import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

import resetCss from "../../shared/styles/reset.css";
import typographyCss from "../../shared/styles/typography.css";

import { Scenario } from "../models";
import scenarioCss from "./scenario.css";
import "../step";
import "../stats";
import "../../shared/badge";

export const tag = "feature-scenario";

@customElement(tag)
export class ScenarioComponent extends LitElement {
  @property({ type: Object })
  scenario!: Scenario;

  override render() {
    return html`
      <details class="${this.getScenarioClass()}">
        <summary class="scenario__header">
          <h3 class="scenario__title">Scenario: ${this.scenario.name}</h3>
          ${this.scenario.tags ? html`
              <div class="scenario__tags">
                  ${this.scenario.tags.map(
                    (tag) => html`<bdo-badge type="tag">${tag}</bdo-badge>`
                    )}
              </div>
            ` : null}
          ${this.scenario.description ? html`
              <p class="scenario__description">
                ${this.scenario.description}
              </p>
            ` : null}
        </summary>
        <div class="scenario__steps">
          <feature-stats .items=${this.scenario.steps}></feature-stats>
          ${this.scenario.steps.map(
            (step) => html`<feature-step .step=${step}></feature-step>`
          )}
        </div>
      </details>
    `;
  }

  private getScenarioClass(): string {
    const baseClass = "scenario";
    if (!this.scenario.result) return baseClass;
    return `${baseClass} scenario--${this.scenario.result}`;
  }

  static override styles = [
    resetCss,
    typographyCss,
    scenarioCss
  ];
}