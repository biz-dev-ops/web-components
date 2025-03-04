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

  renderMain(model:Task) {
    return html`
      ${this.modelViewerTemplate(`Context`, model?.context)}
      ${this.casesTemplate("Actions", model?.actions)}
      ${this.casesTemplate("Exceptions", model?.exceptions)}
    `;
  }

  static override get styles() {
    return [super.styles, taskViewerCss];
  }
}
