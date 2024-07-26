import { html } from "lit";
import { customElement } from "lit/decorators.js";

import { UseCaseViewer } from "../use-case-viewer";
import { Command } from "./models";
import commandViewerCss from "./command-viewer.css";
import "../model-viewer";

if (process.env.NODE_ENV !== "production") {
  require("@biz-dev-ops/md-docs/assets/style/page/style.css");
  require("../../assets/style/custom-theme.css");
}

@customElement("command-viewer")
export class CommandViewer extends UseCaseViewer<Command> {
  useCaseType = {
    type: "command",
    icon: "mat-terminal",
    name: "Command",
  };

  renderMain() {
    return html`
      ${this.modelViewerTemplate(`Parameters`, this.model?.parameters)}
      ${this.casesTemplate("Exceptions", this.model?.exceptions)}
    `;
  }

  static override get styles() {
    return [super.styles, commandViewerCss];
  }
}
