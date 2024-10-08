import { html } from "lit";
import { customElement } from "lit/decorators.js";

if (process.env.NODE_ENV !== "production") {
  require("@biz-dev-ops/md-docs/assets/style/page/style.css?dev");
  require("../../assets/style/custom-theme.css?dev");
}

import { UseCaseViewer } from "../use-case-viewer";
import { Event } from "./models";
import eventViewerCss from "./event-viewer.css";
import "../model-viewer";

@customElement("event-viewer")
export class EventViewer extends UseCaseViewer<Event> {
  useCaseType = {
    type: "event",
    icon: "mat-notifications",
    name: "Event",
  };

  renderMain() {
    return html`
      ${this.modelViewerTemplate(`Parameters`, this.model?.parameters)}
    `;
  }

  static override get styles() {
    return [super.styles, eventViewerCss];
  }
}
