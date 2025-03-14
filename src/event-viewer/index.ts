import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { UseCaseViewer } from "../use-case-viewer";
import { Event } from "./models";
import eventViewerCss from "./event-viewer.css";
import "../model-viewer";

export const tag = "event-viewer";

@customElement(tag)
export class EventViewer extends UseCaseViewer<Event> {
  useCaseType = {
    type: "event",
    icon: "mat-notifications",
    name: "Event",
  };

  renderMain(model:Event) {
    return html`
      ${this.modelViewerTemplate("event-parameters", `Parameters`, model?.parameters)}
    `;
  }

  static override get styles() {
    return [super.styles, eventViewerCss];
  }
}
