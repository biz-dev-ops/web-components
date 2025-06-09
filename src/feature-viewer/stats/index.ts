import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Scenario, Step, TestResult } from "../models";

import resetCss from "../../shared/styles/reset.css";
import statsCss from "./stats.css";
import "../../shared/icon";

export const tag = "feature-stats";

@customElement(tag)
export class StatsComponent extends LitElement {
  @property({ type: Array })
  items!: (Scenario | Step)[];

  override render() {
    return html`
      <dl class="scenarios-stats">
        <dt>${this.getLabel()}</dt>
        <dd>${this.items.length}</dd>
        <dt class="stat--passed"><bdo-icon icon="mat-check"></bdo-icon> Passed</dt>
        <dd class="stat--passed">${this.items.filter((item) => item.result === TestResult.PASSED).length}</dd>
        <dt class="stat--failed"><bdo-icon icon="mat-close"></bdo-icon> Failed</dt>
        <dd class="stat--failed">${this.items.filter((item) => item.result === TestResult.FAILED).length}</dd>
        <dt class="stat--not_implemented"><bdo-icon icon="mat-error"></bdo-icon> Not Implemented</dt>
        <dd class="stat--not_implemented">${this.items.filter((item) => item.result === TestResult.NOT_IMPLEMENTED).length}</dd>
      </dl>
    `;
  }

  private isScenarioItems(): boolean {
    return this.items.length > 0 && (
      "steps" in this.items[0]
    );
  }

  private getLabel(): string {
    if (this.isScenarioItems()) {
      return "Scenarios";
    } else {
      return "Steps";
    }
  }

  static override styles = [
    resetCss,
    statsCss
  ];
}
