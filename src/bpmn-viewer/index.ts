import { css, LitElement, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import TokenSimulationModule from "bpmn-js-token-simulation/lib/viewer";
import Viewer from "bpmn-js/lib/NavigatedViewer";

import styles from "../shared/styles/reset";
import ViewerDiagramJsCss from "bpmn-js/dist/assets/diagram-js.css";
import ViewerBpmnJsCss from "bpmn-js/dist/assets/bpmn-js.css";
import SimulatorCss from "bpmn-js-token-simulation/assets/css/bpmn-js-token-simulation.css";

@customElement("bpmn-viewer")
export class BPMNViewer extends LitElement {
  private _viewer!: any;

  @property({ attribute: "data-xml" })
  xml!: string;

  override async firstUpdated() {
    this._viewer = new Viewer({
      container: this.renderRoot as HTMLElement,
      additionalModules: [TokenSimulationModule],
    });

    try {
      const { warnings } = await this._viewer.importXML(this.xml);

      if (warnings.length) {
        console.log("import with warnings", warnings);
      } else {
        console.log("import successful");
      }

      this.zoomReset();
    } catch (err) {
      console.log("something went wrong:", err);
    }
  }

  static override get styles() {
    return [
      styles,
      css`
        ${unsafeCSS(ViewerDiagramJsCss)}
      `,
      css`
        ${unsafeCSS(ViewerBpmnJsCss)}
      `,
      css`
        ${unsafeCSS(SimulatorCss)}
      `,
    ];
  }

  public getZoomLevel() {
    return this._viewer.get("canvas").zoom();
  }

  public zoomIn() {
    (this._viewer.get("zoomScroll") as any).stepZoom(1);
  }

  public zoomOut() {
    (this._viewer.get("zoomScroll") as any).stepZoom(-1);
  }

  public zoomReset() {
    this._viewer.get("canvas").zoom("fit-viewport");
  }
}
