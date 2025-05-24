import { html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { ActionLitElement } from "../shared/action-dispatcher";

import resetCss from "../shared/styles/reset.css";
import typographyCss from "../shared/styles/typography.css";

import { Feature, TestResult } from "./models";
import { FeatureParser } from "./parser";

import "./background";
import "./scenario";
import "./scenario-outline";
import "./stats";
import "../shared/alert";

import featureViewerCss from "./feature-viewer.css";

export const tag = "feature-viewer";

@customElement(tag)
export class FeatureViewerComponent extends ActionLitElement {
  @property({ type: String })
  src?: string;

  @property({ type: Object })
  feature?: Feature;

  @state()
  private error?: Error;

  override render() {
    if (this.error) {
      return html`<bdo-alert type="error">${this.error?.message}</bdo-alert>`;
    }

    if (!this.feature) {
      return null;
    }

    return html`
      <bdo-heading-container data-testid="feature">
        <h2 slot="header" class="feature__title">Feature: ${this.feature.name}</h2>
        ${this.renderContent(this.feature)}
      </bdo-heading-container>
    `;
  }

  private renderContent(feature: Feature) {
    return html`
       <div class="feature__header">
        ${this.renderTags(feature.tags)}
        ${this.renderDescription(feature.description)}
        ${this.renderResultLink(feature.resultFile)}
      </div>
      <div class="feature__content">
        <feature-stats .items=${feature.scenarios}></feature-stats>
        ${feature.background ? html`<feature-background .background=${feature.background}></feature-background>` : null}
        ${feature.scenarios.map((scenario) =>
          "examples" in scenario
            ? html`<feature-scenario-outline .outline=${scenario}></feature-scenario-outline>`
            : html`<feature-scenario .scenario=${scenario}></feature-scenario>`
        )}
      </div>
    `;
  }

  private renderTags(tags?: string[]) {
    if (!tags || tags.length === 0) return null;

    return html`
      <p class="feature__tags">
        ${tags.map((tag) => html`<bdo-badge type="tag">${tag}</bdo-badge>`)}
      </p>
    `;
  }

  private renderDescription(description?: string) {
    if (!description) return null;

    return html`
      <p class="feature__description">
        ${description}
      </p>
    `;
  }

  private renderResultLink(resultFile?: string) {
    if (!resultFile) return null;

    return html`
      <a href="${resultFile}" class="feature__result-link" target="_blank" rel="noopener noreferrer">
        View Test Results
      </a>
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
      featureViewerCss
    ];
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