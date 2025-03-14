import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { UseCaseViewer } from "../use-case-viewer";
import { Query } from "./models";
import queryViewerCss from "./query-viewer.css";
import "../model-viewer";

export const tag = "query-viewer";

@customElement(tag)
export class QueryViewer extends UseCaseViewer<Query> {
  useCaseType = {
    type: "query",
    icon: "mat-search",
    name: "Query",
  };

  renderMain(model: Query) {
    return html`
      ${this.modelViewerTemplate("query-parameters", `Parameters`, model?.parameters)}
      ${this.modelViewerTemplate("query-response", `Response`, model?.response)}
      ${this.casesTemplate("query-exceptions", "Exceptions", model?.exceptions)}
    `;
  }

  static override get styles() {
    return [super.styles, queryViewerCss];
  }
}
