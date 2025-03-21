import { html, css, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import resetCss from "../shared/styles/reset.css";
import themeCss from "../shared/styles/theme.css";

import { Feature, TestResult } from "./models";
import { FeatureParser } from "./parser";
import "./background";
import "./scenario";
import "./scenario-outline";

export const tag = "feature-viewer";

@customElement(tag)
export class FeatureViewerComponent extends LitElement {
  @property({ type: String })
  src?: string;

  @property({ type: Object })
  feature?: Feature;

  @state()
  private error?: Error;

  override render() {
    if (this.error) {
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
          ${this.feature.tags ? html`
            <div class="feature__tags">
              ${this.feature.tags.map((tag) => html`<bdo-badge type="tag">${tag}</bdo-badge>`)}
            </div>`: null}
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
      if (this.feature) {
        this.feature.result = this.determineFeatureResult();
      }
    }

    super.update(changedProperties);
  }

  static override get styles() {
    return [
      resetCss,
      themeCss,
      css`
        .feature {
          padding: var(--space-md);
          background-color: #ffffff;
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-sm);
        }

        .feature__header {
          margin-bottom: var(--space-md);
        }

        .feature__title {
          margin: 0;
          color: var(--color-brand);
        }

        .feature__description {
          margin: var(--space-sm) 0;
          color: var(--color-text);
        }

        .scenarios-container {
          display: grid;
          gap: var(--space-md);
        }

        .feature__tags {
          margin-top: var(--space-xs);
        }

        .feature--passed {
          border-left: 4px solid var(--color-green-500);
        }

        .feature--failed {
          border-left: 4px solid var(--color-red-500);
        }

        .feature--not_implemented {
          border-left: 4px solid var(--color-yellow-500);
        }

        .feature__content {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .feature__error {
          color: var(--color-red-500);
          padding: 16px;
          background-color: var(--color-red-50);
          border-radius: 4px;
          border: 1px solid var(--color-red-200);
        }

        .feature__result-link {
          display: inline-block;
          margin-top: 16px;
          color: var(--color-blue-500);
          text-decoration: none;
        }

        .feature__result-link:hover {
          text-decoration: underline;
        }
      `,
    ];
  }

  private getFeatureClass(): string {
    const baseClass = "feature";
    if (!this.feature?.result) return baseClass;
    return `${baseClass} feature--${this.feature.result}`;
  }

  private determineFeatureResult(): TestResult | undefined {
    if (!this.feature) return undefined;

    // Check if any step has failed
    const hasFailedStep = this.feature.scenarios.some((scenario) =>
      scenario.steps.some((step) => step.result === TestResult.FAILED)
    );
    if (hasFailedStep) return TestResult.FAILED;

    // Check if any step is not implemented
    const hasNotImplementedStep = this.feature.scenarios.some((scenario) =>
      scenario.steps.some((step) => step.result === TestResult.NOT_IMPLEMENTED)
    );
    if (hasNotImplementedStep) return TestResult.NOT_IMPLEMENTED;

    // Check if all steps have passed
    const allStepsPassed = this.feature.scenarios.every((scenario) =>
      scenario.steps.every((step) => step.result === TestResult.PASSED)
    );
    if (allStepsPassed) return TestResult.PASSED;

    return undefined;
  }
}