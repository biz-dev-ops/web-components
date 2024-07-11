import { css, LitElement, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import TokenSimulationModule from "bpmn-js-token-simulation/lib/viewer";
import Viewer from "bpmn-js/lib/NavigatedViewer";

import styles from "../shared/styles/reset";
import ViewerDiagramJsCss from "bpmn-js/dist/assets/diagram-js.css?shadow";
import ViewerBpmnJsCss from "bpmn-js/dist/assets/bpmn-js.css?shadow";
import SimulatorCss from "bpmn-js-token-simulation/assets/css/bpmn-js-token-simulation.css?shadow";

import * as bizdevops from "./bizdevops.json";
import { Element, ModdleElement } from "bpmn-js/lib/model/Types";

interface Link {
  name?: string;
  value: string;
}

interface ModdleLinks {
  links: Link[];
}

@customElement("bpmn-viewer")
export class BPMNViewer extends LitElement {
  private _viewer!: any;

  @property({ attribute: "data-xml" })
  xml!: string;

  @property({ attribute: "show-process" })
  showProcess!: string;

  @property({ attribute: "enable-simulator" })
  enableSimulator: string = "true";

  override async firstUpdated() {
    this._viewer = new Viewer({
      container: this.renderRoot as HTMLElement,
      moddleExtensions: {
        bizdevops,
      },
      additionalModules:
        this.enableSimulator === "true" ? [TokenSimulationModule] : [],
    });

    try {
      const { warnings } = await this._viewer.importXML(
        this.xml.replace(/\\"/g, '"')
      );

      if (warnings.length) {
        console.log("bpmn import with warnings", warnings);
      } else {
        console.log("bpmn import successful");
      }

      this._makeElementsClickable();

      if (this.showProcess) {
        this._expandSubProcess();
      }

      this.zoomReset();
    } catch (err) {
      console.log("something went wrong while importing bpmn:", err);
    }
  }

  private _expandSubProcess() {
    try {
      const subProcessId = this.showProcess.split("/").pop();
      const elementRegistry = this._viewer.get("elementRegistry");
      const element = elementRegistry.get(`${subProcessId}_plane`);
      this._viewer.get("canvas").setRootElement(element);
    } catch (error: unknown) {
      console.log(error instanceof Error ? error.message : "Unknown error");
    }
  }

  private _getLinks(element: ModdleElement): Link[] {
    const businessObject = element.bpmnElement;
    const extensionElements = businessObject?.extensionElements?.values || [];
    return extensionElements
      .filter(
        (extension: any) => extension.$type.toLowerCase() === "bizdevops:links"
      )
      .reduce(
        (previousLinks: Link[], currentLinks: ModdleLinks) => [
          ...previousLinks,
          ...currentLinks.links.map((link) => ({
            value: link.value,
            name: link.name,
          })),
        ],
        []
      );
  }

  private _makeElementsClickable() {
    const elementRegistry = this._viewer.get("elementRegistry");
    const eventBus = this._viewer.get("eventBus");

    eventBus.on("element.click", (event: any) => {
      const links = this._getLinks(event.element.di);

      if (links.length > 0) {
        this.dispatchEvent(
          new CustomEvent("onelementclick", {
            detail: { element: event.element, links },
            bubbles: true,
            composed: true,
          })
        );
      }
    });

    elementRegistry.forEach((element: Element) => {
      const links = this._getLinks(element.di);
      const gfx = elementRegistry.getGraphics(element);

      if (gfx && links.length > 0) {
        gfx.style.cursor = "pointer"; // has no effect
        gfx.style.textDecoration = "underline";
      }
    });
  }

  static override get styles() {
    return [
      styles,
      css`
        .error {
          border: 3px solid red;
        }
      `,
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
