import { html } from "lit";
import { customElement } from "lit/decorators.js";

import { UseCaseViewer } from "../use-case-viewer";
import { Command } from "./models";
import commandViewerCss from "./command-viewer.css";
import "../model-viewer";

@customElement('command-viewer')
export class CommandViewer extends UseCaseViewer<Command> {
   
    useCaseType = {
        type: "command",
        icon: "ph-terminal-window",
        name: "Command"
    };
    
    renderMain() {
        return html`
            ${this.modelViewerTemplate(`${this.useCaseType.name} parameters`, this.model.parameters)}
            ${this.casesTemplate("Exceptions", this.model.exceptions)}
        `;
    }

    static override get styles() {
        return [super.styles, commandViewerCss];
    }
}