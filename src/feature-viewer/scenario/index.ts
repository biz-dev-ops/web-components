import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

import resetCss from "../../shared/styles/reset.css";
import typographyCss from "../../shared/styles/typography.css";

import { Scenario } from "../models";
import scenarioCss from "./scenario.css";
import "../step";
import "../stats";
import "../../shared/badge";
import "../../shared/heading-container";

export const tag = "feature-scenario";

@customElement(tag)
export class ScenarioComponent extends LitElement {
  @property({ type: Object })
  scenario!: Scenario;

  override render() {
    return html`
        <bdo-heading-container data-testid="scenario" aria-expanded="false" class="${this.getScenarioClass()}">
          <summary slot="header" class="scenario__header">
            <h3 class="scenario__title">Scenario: ${this.scenario.name}</h3>
            ${this.renderTags(this.scenario.tags)}
            ${this.renderDescription(this.scenario.description)}
          </summary>
          ${this.renderSteps(this.scenario.steps)}
        </bdo-heading-container>
    `;
  }

  private renderTags(tags: string[] | undefined) {
    if (!tags) return null;
    return html`
      <div class="scenario__tags">
        ${tags.map((tag) => html`<bdo-badge type="tag">${tag}</bdo-badge>`)}
      </div>
    `;
  }

  private renderDescription(description: string | undefined) {
    if (!description) return null;
    return html`
      <p class="scenario__description">
        ${description}
      </p>
    `;
  }

  private renderSteps(steps: any[]) {
    if (!steps?.length) return null;
    return html`
      <div class="scenario__steps">
        <feature-stats .items=${steps}></feature-stats>
        ${steps.map((step) => html`<feature-step .step=${step}></feature-step>`)}
      </div>
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