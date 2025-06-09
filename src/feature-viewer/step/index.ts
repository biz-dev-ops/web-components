import { LitElement, html, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Step } from "../models";

import resetCss from "../../shared/styles/reset.css";
import typographyCss from "../../shared/styles/typography.css";
import stepCss from "./step.css";
import "../../shared/icon";

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
        ${this.step.result ? html`
          <mark class="step__state">${this.getResultLabel()}</mark>
        ` : null}
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

  private getResultLabel(): TemplateResult {
    if (this.step.result === "not_implemented") {
      return html`<bdo-icon icon="mat-error"></bdo-icon> Not implemented`;
    } else if (this.step.result === "passed") {
      return html`<bdo-icon icon="mat-check"></bdo-icon> Passed`;
    } else if (this.step.result === "failed") {
      return html`<bdo-icon icon="mat-close"></bdo-icon> Failed`;
    }
    return html``;
  }

  static override styles = [
    resetCss,
    typographyCss,
    stepCss
  ];
}