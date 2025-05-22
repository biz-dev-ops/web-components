import { html, css, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import resetCss from "../shared/styles/reset.css";
import typographyCss from "../shared/styles/typography.css";

import { Feature, TestResult } from "./models";
import { FeatureParser } from "./parser";
import "./background";
import "./scenario";
import "./scenario-outline";
import { DrivenByAction } from "../shared/driver/types";
export const tag = "feature-viewer";

@customElement(tag)
export class FeatureViewerComponent extends LitElement implements DrivenByAction {
  canHandleDriverAction(action: string): boolean {
    return ["toggle-fullscreen"].includes(action);
  }
  handleDriverAction(_action: string): void { }

  @property({ type: String })
  src?: string;

  @property({ type: Object })
  feature?: Feature;

  @state()
  private error?: Error;

  override render() {
    if (this.error) {
      // TODO: Is this not a feature with a error modifier? With a classname `feature feature--error`?
      return html`
        <div class="feature__error">
          ${this.error.message}
        </div>
      `;
    }

    if (!this.feature) {
      return null;
    }

    return html`
      <div class="${this.getFeatureClass()}">
        <div class="feature__header">
          <h2 class="feature__title">Feature: ${this.feature.name}</h2>
          ${this.feature.tags?.length ? html`
            <p class="feature__tags">
              ${this.feature.tags.map((tag) => html`<bdo-badge type="tag">${tag}</bdo-badge>`)}
            </p>`: null}
          ${this.feature.description ? html`
            <p class="feature__description">
              ${this.feature.description}
            </p>`: null}
          ${this.feature.resultFile ? html`
            <a
              href="${this.feature.resultFile}"
              class="feature__result-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Test Results
            </a>`: null}
        </div>
        <div class="feature__content">
          ${this.feature.background ? html`<feature-background .background=${this.feature.background}></feature-background>`: null}
          ${this.feature.scenarios.map((scenario) =>
          "examples" in scenario
            ? html`<feature-scenario-outline .outline=${scenario}></feature-scenario-outline>`
            : html`<feature-scenario .scenario=${scenario}></feature-scenario>`
          )}
        </div>
      </div>
    `;
  }

  override async update(changedProperties: Map<string, unknown>) {
    if (changedProperties.has("src")) {
      if (!this.src) {
        this.feature = undefined;
        this.error = undefined;
      }
      else {
        try {
          this.error = undefined;
          const response = await fetch(this.src);
          if (!response.ok) {
            throw new Error(`Failed to load feature file: ${response.statusText}`);
          }
          const content = await response.text();
          this.feature = FeatureParser.parse(content);
        }
        catch (error) {
          this.feature = undefined;
          this.error = error as Error;
        }
      }
    }

    if (changedProperties.has("feature")) {
      this.setNotImplementedResult();
    }

    super.update(changedProperties);
  }

  static override get styles() {
    return [
      resetCss,
      typographyCss,
      css`
        .feature {
          background-color: var(--main-surface);
          border-radius: var(--radius-base);
          border-left: var(--line-medium) solid var(--_feature-status-color, transparent);
          box-shadow: var(--drop-shadow-base);
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
          padding: var(--space-md);
          padding-inline-start: calc(var(--space-md) - var(--line-medium));
        }

        .feature--passed {
          --_feature-status-color: var(--status-passed);
        }

        .feature--failed {
          --_feature-status-color: var(--status-failed);
        }

        .feature--not_implemented {
          --_feature-status-color: var(--status-undefined);
        }

        .feature__content {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
        }

        .feature__error {
          color: var(--color-error);
          padding: var(--space-sm);
          background-color: var(--color-error-100);
          border-radius: var(--radius-half);
          border: var(--line-base) solid var(--color-error);
        }
      `,
    ];
  }

  private getFeatureClass(): string {
    const baseClass = "feature";
    if (!this.feature?.result) return baseClass;
    return `${baseClass} feature--${this.feature.result}`;
  }

  private setNotImplementedResult(): void {
    if (!this.feature) return undefined;

    //Set the results to not implemented, and TODO add test results object later.
    this.feature.result = TestResult.NOT_IMPLEMENTED;

    this.feature.scenarios.forEach((scenario) => {
      scenario.result = TestResult.NOT_IMPLEMENTED;
      scenario.steps.forEach((step) => {
        step.result = TestResult.NOT_IMPLEMENTED;
      });
    });

    if (this.feature.background) {
      this.feature.background.result = TestResult.NOT_IMPLEMENTED;
      this.feature.background.steps.forEach((step) => {
        step.result = TestResult.NOT_IMPLEMENTED;
      });
    }

    return undefined;
  }
}