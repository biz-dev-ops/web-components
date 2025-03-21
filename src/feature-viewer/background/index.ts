import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

import resetCss from "../../shared/styles/reset.css";
import themeCss from "../../shared/styles/theme.css";

import { Background, TestResult } from "../models";
import "../step";

export const tag = "feature-background";

@customElement(tag)
export class BackgroundComponent extends LitElement {
  @property({ type: Object })
  background!: Background;

  static override styles = [
    resetCss,
    themeCss,
    css`
      .background {
        background-color: var(--color-gray-100);
        padding: 16px;
        border-radius: 4px;
        border: 1px solid var(--color-gray-200);
        margin-bottom: 16px;
      }

      .background--passed {
        border-left: 4px solid var(--color-green-500);
      }

      .background--failed {
        border-left: 4px solid var(--color-red-500);
      }

      .background--not_implemented {
        border-left: 4px solid var(--color-yellow-500);
      }

      .background__title {
        color: var(--color-blue-500);
        font-weight: 700;
        margin: 0 0 12px 0;
      }

      .background__steps {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
    `
  ];

  private getBackgroundClass(): string {
    const baseClass = "background";
    if (!this.background.result) return baseClass;
    return `${baseClass} background--${this.background.result}`;
  }

  override render() {
    return html`
      <div class="${this.getBackgroundClass()}">
        <h3 class="background__title">Background: ${this.background.name || ""}</h3>
        <div class="background__steps">
          ${this.background.steps.map(
            (step) => html`<feature-step .step=${step}></feature-step>`
          )}
        </div>
      </div>
    `;
  }
} 