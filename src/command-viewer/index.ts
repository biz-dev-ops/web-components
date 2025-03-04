import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { UseCaseViewer } from "../use-case-viewer";
import { Command } from "./models";
import commandViewerCss from "./command-viewer.css";
import "../model-viewer";

@customElement("command-viewer")
export class CommandViewer extends UseCaseViewer<Command> {
  useCaseType = {
    type: "command",
    icon: "mat-terminal",
    name: "Command",
  };

  renderMain(model:Command) {
    return html`
      ${this.modelViewerTemplate(`Parameters`, model?.parameters)}
      ${this.casesTemplate("Exceptions", model?.exceptions)}
    `;
  }

  static override get styles() {
    return [super.styles, commandViewerCss];
  }
}
