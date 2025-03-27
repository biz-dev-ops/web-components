import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

import resetCss from "../../shared/styles/reset.css";
import typographyCss from "../../shared/styles/typography.css";

import { ScenarioOutline, Scenario, TestResult } from "../models";
import "../scenario";

export const tag = "feature-scenario-outline";

@customElement(tag)
export class ScenarioOutlineComponent extends LitElement {
  @property({ type: Object })
  outline!: ScenarioOutline;
  override render() {
    const expandedScenarios = this.expandScenarioOutline();

    return html`
      <div class="${this.getOutlineClass()}">
        <div class="scenario-outline__header">
          <h3 class="scenario-outline_title">Scenario Outline: ${this.outline.name || ""}</h3>
        </div>
        <div class="scenario-outline_scenarios">
          ${expandedScenarios.map(
            (scenario) => html`<feature-scenario .scenario=${scenario}></feature-scenario>`
          )}
        </div>
      </div>
    `;
  }

  private expandScenarioOutline(): Scenario[] {
    return this.outline.examples.tableBody.map((row, index) => {
      return {
        keyword: "Scenario",
        name: `${this.outline.name} (${index + 1})`,
        description: this.outline.description,
        tags: this.outline.tags,
        steps: this.outline.steps.map((step) => ({
          ...step,
          text: this.replacePlaceholders(step.text, row)
        })),
        result: TestResult.NOT_IMPLEMENTED
      }
    });
  }

  private getOutlineClass(): string {
    const baseClass = "scenario-outline";
    if (!this.outline.result) return baseClass;
    return `${baseClass} scenario-outline--${this.outline.result}`;
  }

  private replacePlaceholders(text: string, values: string[]): string {
    return text.replace(/<(\w+)>/g, (match, key) => {
      const index = this.outline.examples.tableHeader.indexOf(key);
      return index !== -1 ? values[index] : match;
    });
  }

  static override styles = [
    resetCss,
    typographyCss,
    css`
      .scenario-outline {
        background-color: var(--main-surface);
        border-radius: var(--radius-base);
        border-left: var(--line-medium) solid var(--_scenario-outline-status-color, transparent);
        box-shadow: var(--drop-shadow-base);
        display: flex;
        flex-direction: column;
        gap: var(--space-md);
        padding: var(--space-md);
        padding-inline-start: calc(var(--space-md) - var(--line-medium));
      }

      .scenario-outline--passed {
        --_scenario-outline-status-color: var(--status-passed);
      }

      .scenario-outline--failed {
        --_scenario-outline-status-color: var(--status-failed);
      }

      .scenario-outline--not_implemented {
        --_scenario-outline-status-color: var(--status-undefined);
      }

      .scenario-outline_scenarios {
        display: flex;
        flex-direction: column;
        gap: var(--space-md);
      }
    `
  ];
}