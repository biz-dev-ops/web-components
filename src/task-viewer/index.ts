import { html } from "lit";
import { customElement } from "lit/decorators.js";

import { UseCaseViewer } from "../use-case-viewer";
import { Task } from "./models";
import taskViewerCss from "./task-viewer.css";
import "../model-viewer";

@customElement('task-viewer')
export class TaskViewer extends UseCaseViewer<Task> {
   
    useCaseType = {
        type: "task",
        icon: "ph-check-square-offset",
        name: "Task"
    };
    
    renderMain() {
        return html`
            ${this.modelViewerTemplate(`${this.useCaseType.name} parameters`, this.model.context)}
            ${this.exceptionTemplate(this.model.actions)}
            ${this.exceptionTemplate(this.model.exceptions)}
        `;
    }

    static override get styles() {
        return [super.styles, taskViewerCss];
    }
}