import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

import resetCss from "../../shared/styles/reset.css";
import typographyCss from "../../shared/styles/typography.css";

import { ScenarioOutline, Scenario, TestResult } from "../models";
import "../scenario";
import scenarioOutlineCss from "./scenario-outline.css";
import "../../shared/heading-container";

export const tag = "feature-scenario-outline";

@customElement(tag)
export class ScenarioOutlineComponent extends LitElement {

  @property({ type: Object })
  outline!: ScenarioOutline;

  override render() {
    const scenarios = this.createScenarios();

    return html`
      <bdo-heading-container class="${this.getOutlineClass()}" aria-expanded="false">
        <h3 slot="header" class="scenario-outline__title">Scenario Outline: ${this.outline.name} (${scenarios.length})</h3>
        <feature-stats .items=${scenarios}></feature-stats>
        <div class="scenario-outline__scenarios">
          ${scenarios.map(
            (scenario) => html`<feature-scenario .scenario=${scenario}></feature-scenario>`
          )}
        </div>
      </bdo-heading-container>
    `;
  }

  private createScenarios(): Scenario[] {
    return this.outline.examples.tableBody.map((row) => {
      return {
        keyword: "Scenario",
        name: this.replacePlaceholders(this.outline.name, row),
        description: this.outline.description ? this.replacePlaceholders(this.outline.description, row) : undefined,
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
    scenarioOutlineCss
  ];
}