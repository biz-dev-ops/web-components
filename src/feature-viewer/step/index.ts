import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Step } from "../models";

import resetCss from "../../shared/styles/reset.css";
import themeCss from "../../shared/styles/theme.css";

@customElement("feature-step")
export class StepComponent extends LitElement {
  @property({ type: Object })
  step!: Step;

  static override styles = [
    resetCss,
    themeCss,
    css`
      .step {
        display: flex;
        flex-direction: column;
        background-color: var(--color-white);
        padding: 12px;
        border-radius: 4px;
        border: 1px solid var(--color-gray-200);
        margin-bottom: 8px;
      }

      .step--passed {
        border-left: 4px solid var(--color-green-500);
      }

      .step--failed {
        border-left: 4px solid var(--color-red-500);
      }

      .step--not_implemented {
        border-left: 4px solid var(--color-yellow-500);
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

  private getStepClass(): string {
    const baseClass = "step";
    if (!this.step.result) return baseClass;
    return `${baseClass} step--${this.step.result}`;
  }

  override render() {
    return html`
      <div class="${this.getStepClass()}">
        <div class="step__content">
          <span class="step__keyword">${this.step.keyword}</span>
          <span class="step__text">${this.step.text}</span>
        </div>
        ${this.step.table
          ? html`
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
              </table>
            `
          : null}
      </div>
    `;
  }
} 