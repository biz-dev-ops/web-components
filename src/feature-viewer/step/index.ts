import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Step } from "../models";

import resetCss from "../../shared/styles/reset.css";
import typographyCss from "../../shared/styles/typography.css";
import stepCss from "./step.css";

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
    stepCss
  ];
}