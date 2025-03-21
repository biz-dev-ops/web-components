import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

import resetCss from "../../shared/styles/reset.css";
import themeCss from "../../shared/styles/theme.css";

import { ScenarioOutline, Scenario, TestResult } from "../models";
import "../scenario";

export const tag = "feature-scenario-outline";

@customElement(tag)
export class ScenarioOutlineComponent extends LitElement {
  @property({ type: Object })
  outline!: ScenarioOutline;

  static override styles = [
    resetCss,
    themeCss,
    css`
      .scenario-outline {
        display: grid;
        gap: 16px;
      }

      .scenario-outline--passed {
        border-left: 4px solid var(--color-green-500);
      }

      .scenario-outline--failed {
        border-left: 4px solid var(--color-red-500);
      }

      .scenario-outline--not_implemented {
        border-left: 4px solid var(--color-yellow-500);
      }
    `
  ];

  private getOutlineClass(): string {
    const baseClass = "scenario-outline";
    if (!this.outline.result) return baseClass;
    return `${baseClass} scenario-outline--${this.outline.result}`;
  }

  private expandScenarioOutline(): Scenario[] {
    return this.outline.examples.tableBody.map((row) => {
      const scenario: Scenario = {
        keyword: "Scenario",
        name: `${this.outline.name} - ${row.join(", ")}`,
        description: this.outline.description,
        tags: this.outline.tags,
        steps: this.outline.steps.map((step) => ({
          ...step,
          text: this.replacePlaceholders(step.text, row)
        }))
      };

      // Determine scenario result based on step results
      if (scenario.steps.some((step) => step.result === TestResult.FAILED)) {
        scenario.result = TestResult.FAILED;
      } else if (
        scenario.steps.some((step) => step.result === TestResult.NOT_IMPLEMENTED)
      ) {
        scenario.result = TestResult.NOT_IMPLEMENTED;
      } else if (
        scenario.steps.every((step) => step.result === TestResult.PASSED)
      ) {
        scenario.result = TestResult.PASSED;
      }

      return scenario;
    });
  }

  private replacePlaceholders(text: string, values: string[]): string {
    return text.replace(/<(\w+)>/g, (match, key) => {
      const index = this.outline.examples.tableHeader.indexOf(key);
      return index !== -1 ? values[index] : match;
    });
  }

  override render() {
    const expandedScenarios = this.expandScenarioOutline();

    return html`
      <div class="${this.getOutlineClass()}">
        ${expandedScenarios.map(
          (scenario) => html`<feature-scenario .scenario=${scenario}></feature-scenario>`
        )}
      </div>
    `;
  }
} 