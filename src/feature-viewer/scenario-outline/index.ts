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
  override render() {
    const expandedScenarios = this.expandScenarioOutline();

    return html`
      <div class="${this.getOutlineClass()}">
        <h3 class="scenario-outline_title">Scenario Outline: ${this.outline.name || ""}</h3>
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
}