import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Step } from "../models";

import resetCss from "../../shared/styles/reset.css";
import typographyCss from "../../shared/styles/typography.css";

@customElement("feature-step")
export class StepComponent extends LitElement {

  @property({ type: Object })
  step!: Step;

  override render() {
    return html`
      <div class="${this.getStepClass()}">
        <p class="step__content">
          <span class="step__keyword">${this.step.keyword}</span>
          <span class="step__text">${this.step.text}</span>
        </p>
        ${this.step.table ? html`
          <table>
            <thead>
              <tr>
                ${this.step.table.header.map(
                  (header) => html`<th>${header}</th>`
                  )}
              </tr>
            </thead>
            <tbody>
              ${this.step.table.rows.map(
                (row) => html`
                  <tr>
                    ${row.map((cell) => html`<td>${cell}</td>`)}
                  </tr>
                `
              )}
            </tbody>
          </table>`: null}
      </div>
    `;
  }

  private getStepClass(): string {
    const baseClass = "step";
    if (!this.step.result) return baseClass;
    return `${baseClass} step--${this.step.result}`;
  }

  static override styles = [
    resetCss,
    typographyCss,
    css`
      .step {
        display: flex;
        flex-direction: column;
        background-color: var(--color-white);
        padding: var(--space-xs) var(--space-sm);
        border-radius: var(--radius-half);
        border: var(--line-base) solid var(--color-black-a10);
      }

      .step--passed,
      .step--failed,
      .step--not_implemented {
        padding-inline-start: calc(var(--space-md) - var(--line-medium));
        border-inline-start: var(--line-medium) solid var(--_step-status-color, var(--color-black-a10));
      }

      .step--passed {
        --_step-status-color: var(--status-passed);
      }

      .step--failed {
        --_step-status-color: var(--status-failed);
      }

      .step--not_implemented {
        --_step-status-color: var(--status-undefined);
      }

      .step__content {
        display: flex;
        gap: 8px;
      }

      .step__keyword {
        font-weight: 700;
        color: var(--color-blue-500);
      }

      .step__text {
        flex: 1;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        font-size: 14px;
        margin-top: 8px;
      }

      th {
        background-color: var(--color-gray-100);
        font-weight: 700;
        text-align: left;
        padding: 8px;
        border: 1px solid var(--color-gray-200);
      }

      td {
        padding: 8px;
        border: 1px solid var(--color-gray-200);
      }
    `
  ];
}