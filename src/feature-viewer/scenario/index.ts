import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

import resetCss from "../../shared/styles/reset.css";
import themeCss from "../../shared/styles/theme.css";

import { Scenario } from "../models";
import "../step";
import "../../shared/badge";

export const tag = "feature-scenario";

@customElement(tag)
export class ScenarioComponent extends LitElement {
  @property({ type: Object })
  scenario!: Scenario;

  override render() {
    return html`
      <div class="${this.getScenarioClass()}">
        <div class="scenario__header">
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
        </div>
        <div class="scenario__steps">
          ${this.scenario.steps.map(
            (step) => html`<feature-step .step=${step}></feature-step>`
          )}
        </div>
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
    themeCss,
    css`
      .scenario {
        background-color: var(--color-gray-100);
        padding: 16px;
        border-radius: 4px;
        border: 1px solid var(--color-gray-200);
        margin-bottom: 16px;
      }

      .scenario--passed {
        border-left: 4px solid var(--color-green-500);
      }

      .scenario--failed {
        border-left: 4px solid var(--color-red-500);
      }

      .scenario--not_implemented {
        border-left: 4px solid var(--color-yellow-500);
      }

      .scenario__header {
        margin-bottom: 12px;
      }

      .scenario__title {
        color: var(--color-blue-500);
        font-weight: 700;
        margin: 0 0 8px 0;
      }

      .scenario__tags {
        display: flex;
        gap: 8px;
        margin-bottom: 8px;
      }

      .scenario__description {
        color: var(--color-gray-600);
        margin: 0;
        font-size: 14px;
      }

      .scenario__steps {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
    `
  ];
}