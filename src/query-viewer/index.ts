import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { UseCaseViewer } from "../use-case-viewer";
import { Query } from "./models";
import queryViewerCss from "./query-viewer.css";
import "../model-viewer";

@customElement("query-viewer")
export class QueryViewer extends UseCaseViewer<Query> {
  useCaseType = {
    type: "query",
    icon: "mat-search",
    name: "Query",
  };

  renderMain(model: Query) {
    return html`
      ${this.modelViewerTemplate(`Parameters`, model?.parameters)}
      ${this.modelViewerTemplate(`Response`, model?.response)}
      ${this.casesTemplate("Exceptions", model?.exceptions)}
    `;
  }

  static override get styles() {
    return [super.styles, queryViewerCss];
  }
}
