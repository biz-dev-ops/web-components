import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { UseCaseViewer } from "../use-case-viewer";
import { Command } from "./models";
import commandViewerCss from "./command-viewer.css";
import "../model-viewer";

export const tag = "command-viewer";

@customElement(tag)
export class CommandViewer extends UseCaseViewer<Command> {
  useCaseType = {
    type: "command",
    icon: "mat-terminal",
    name: "Command",
  };

  renderMain(model:Command) {
    return html`
      ${this.modelViewerTemplate("command-parameters", `Parameters`, model?.parameters)}
      ${this.casesTemplate("command-exceptions", "Exceptions", model?.exceptions)}
    `;
  }

  static override get styles() {
    return [super.styles, commandViewerCss];
  }
}
