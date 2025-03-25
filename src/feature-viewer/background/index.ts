import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

import resetCss from "../../shared/styles/reset.css";
import themeCss from "../../shared/styles/theme.css";
import typographyCss from "../../shared/styles/typography.css";

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
    typographyCss,
    css`
      .background {
        background-color: var(--color-black-a05);
        padding: calc(var(--space-md) - var(--line-base));
        border-radius: var(--radius-base);
        border: var(--line-base) solid var(--color-black-a10);
      }

      .background--passed,
      .background--failed,
      .background--not_implemented {
        padding-inline-start: calc(var(--space-md) - var(--line-medium));
        border-inline-start: var(--line-medium) solid var(--_background-status-color, var(--color-black-a10));
      }

      .background--passed {
        --_background-status-color: var(--status-passed);
      }

      .background--failed {
        --_background-status-color: var(--status-failed);
      }

      .background--not_implemented {
        --_background-status-color: var(--status-undefined);
      }

      .background__steps {
        display: flex;
        flex-direction: column;
        gap: var(--space-xs);
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