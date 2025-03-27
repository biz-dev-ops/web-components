import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

import resetCss from "../../shared/styles/reset.css";
import typographyCss from "../../shared/styles/typography.css";

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
    typographyCss,
    css`
      .scenario {
        background-color: var(--color-black-a05);
        padding: calc(var(--space-md) - var(--line-base));
        border-radius: var(--radius-base);
        border: var(--line-base) solid var(--color-black-a10);
      }

      .scenario--passed,
      .scenario--failed,
      .scenario--not_implemented {
        padding-inline-start: calc(var(--space-md) - var(--line-medium));
        border-inline-start: var(--line-medium) solid var(--_scenario-status-color, var(--color-black-a10));
      }

      .scenario--passed {
        --_scenario-status-color: var(--status-passed);
      }

      .scenario--failed {
        --_scenario-status-color: var(--status-failed);
      }

      .scenario--not_implemented {
        --_scenario-status-color: var(--status-undefined);
      }

      .scenario__header {
        margin-bottom: 12px;
      }

      .scenario__tags {
        display: flex;
        gap: var(--space-xs);
      }

      .scenario__description {
        color: var(--color-black-a80);
      }

      .scenario__steps {
        display: flex;
        flex-direction: column;
        gap: var(--space-xs);
      }
    `
  ];
}