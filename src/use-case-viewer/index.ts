import { CSSResult, CSSResultArray, LitElement, TemplateResult, html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { property } from "lit/decorators.js";
import resetCss from "../shared/styles/reset.css";
import themeCss from "../shared/styles/theme.css";
import useCaseViewerCss from "./use-case-viewer.css";
import "../shared/badge";
import "../shared/expansion-panel";
import "../shared/truncate";
import "../model-viewer";
import { Case, UseCase, UseCaseType } from "./models";
import {titlelize, parseMarkdown } from "../shared/util";
import { FetchError, fetchYamlAndBundleAs } from "../shared/fetch";

export abstract class UseCaseViewer<T extends UseCase> extends LitElement {
  @property({ type: Object })
  model!: T | FetchError;

  @property({ attribute: "src" })
  src!: string

  @property({ attribute: "data-json" })
  json!: string

  abstract useCaseType: UseCaseType;

  override render() {
    if (this.model instanceof FetchError) {
      return html`<div class="error">${this.model.message}</div>`;
    }

    return html`
      <section>
          <header>
              <bdo-badge type=${this.useCaseType?.type} icon=${this.useCaseType?.icon}>${this.useCaseType?.name}</bdo-badge>
              ${titlelize(this.model?.name)}
          </header>

          <main>
              ${this.descriptionTemplate(this.model?.description)}
              ${this.renderMain(this.model)}
          </main>
      </section>
    `;
  }

  abstract renderMain(model:T): TemplateResult;

  descriptionTemplate(description: string) {
    if (!description) {
      return html``;
    }

    return html`
      <bdo-truncate aria-label="description">
          ${unsafeHTML(parseMarkdown(description.trim()))}
      </bdo-truncate>
    `;
  }

  modelViewerTemplate(title: string, parameters: any) {
    if (!parameters) {
      return html``;
    }

    return html`
      <bdo-expansion-panel aria-label="parameters panel">
          <div slot="summary">${title}</div>
          <model-viewer .model=${parameters}></model-viewer>
      </bdo-expansion-panel>
    `;
  }

  casesTemplate(title: string, cases: Map<string, Case>) {
    if (!cases) {
      return html``;
    }

    return html`
      <bdo-expansion-panel aria-label="cases panel">
          <div slot="summary">${titlelize(title)} <span class="count">(${this.countItems(cases)})</span></div>

          <div class="cases" role="list" aria-label="cases">
              ${Object.entries(cases).map(([key, c]) => html`
                  <div class="case" role="listitem" aria-label="case">
                      <h2>${titlelize(c?.name || key)}</h2>
                      ${this.descriptionTemplate(c?.description)}
                      ${this.modelViewerTemplate("Parameters", c?.parameters)}
                  </div>
              `)}
          </div>
      </bdo-expansion-panel>
    `;
  }

  countItems(item: any) {
    if (!item) {
      return 0;
    }

    if (item.properties) {
      return Object.keys(item.properties).length;
    }

    if (Array.isArray(item)) {
      return item.length;
    }

    return Object.keys(item).length;;
  }

  override async update(changedProperties: Map<string, unknown>) {
      if (changedProperties.has("src")) {
        try {
          this.model = await fetchYamlAndBundleAs<T>(this.src);
        }
        catch (error: any) {
          this.model = error;
        }
      }

      if (changedProperties.has("json")) {
        this.model = JSON.parse(this.json);
      }

      super.update(changedProperties);
    }

  static override get styles(): CSSResult | CSSResultArray {
    return [resetCss, themeCss, useCaseViewerCss];
  }
}