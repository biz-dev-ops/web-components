import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { UseCaseViewer } from "../use-case-viewer";
import { Task } from "./models";
import taskViewerCss from "./task-viewer.css";
import "../model-viewer";

@customElement("task-viewer")
export class TaskViewer extends UseCaseViewer<Task> {
  useCaseType = {
    type: "task",
    icon: "mat-task_alt",
    name: "Task",
  };

  renderMain() {
    return html`
      ${this.modelViewerTemplate(`Context`, this.model?.context)}
      ${this.casesTemplate("Actions", this.model?.actions)}
      ${this.casesTemplate("Exceptions", this.model?.exceptions)}
    `;
  }

  static override get styles() {
    return [super.styles, taskViewerCss];
  }
}
