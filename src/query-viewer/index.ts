import { html } from "lit";
import { customElement } from "lit/decorators.js";

import "@biz-dev-ops/md-docs/assets/style/page/style.css";
import "../../assets/style/custom-theme.css";

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

  renderMain() {
    return html`
      ${this.modelViewerTemplate(`Parameters`, this.model?.parameters)}
      ${this.modelViewerTemplate(`Response`, this.model?.response)}
      ${this.casesTemplate("Exceptions", this.model?.exceptions)}
    `;
  }

  static override get styles() {
    return [super.styles, queryViewerCss];
  }
}
