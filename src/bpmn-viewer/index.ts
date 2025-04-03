import { css, html, LitElement, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import resetCss from "../shared/styles/reset.css";
import viewerDiagramJsCss from "bpmn-js/dist/assets/diagram-js.css?inline";
import viewerBpmnJsCss from "bpmn-js/dist/assets/bpmn-js.css?inline";
import simulatorCss from "bpmn-js-token-simulation/assets/css/bpmn-js-token-simulation.css?inline";

import TokenSimulationModule from "bpmn-js-token-simulation/lib/viewer.js";
import Viewer from "bpmn-js/lib/NavigatedViewer.js";
import { Element, ModdleElement } from "bpmn-js/lib/model/Types";

import * as bizdevops from "./bizdevops.moddle.json";
import { FetchError, fetchText } from "../shared/fetch";
import "../shared/alert";

interface Link {
  name?: string;
  value: string;
}

interface ModdleLinks {
  links: Link[];
}

export const tag: string = "bpmn-viewer";

@customElement(tag)
export class BPMNViewer extends LitElement {
  private _initialized = false;
  private _viewer!: any;

  @property({ attribute: "src" })
  src!: string

  @property({ attribute: "data-xml" })
  xml!: string;

  @property({ attribute: "show-process" })
  showProcess!: string;

  @property({ attribute: "enable-simulator", reflect: true, type: Boolean })
  enableSimulator: boolean = false;

  @property({ attribute: "disable-interaction", reflect: true, type: Boolean })
  disableInteraction: boolean = false;

  @state()
  error!: FetchError | null;

  override render() {
    if (this.error) {
      return html`<bdo-alert type="error">${this.error.message}</bdo-alert>`;
    }
    else {
      return html`<div id="bpmn-container"></div>`;
    };
  }

  override async firstUpdated() {
    this._initViewer();
  }

  override async updated(changedProperties) {
    if (!this._initialized) {
      this._initialized = false;
      return;
    }

    if (changedProperties.has("enableSimulator")) {
      this._initViewer();
    }

    if (changedProperties.has("src")) {
      try {
        this.xml = await fetchText(this.src);
        this.error = null;
      }
      catch (error: any) {
        this.error = error;
      }
    }

    if (changedProperties.has("xml")) {
      this._updateDiagram(this.xml);
    }

    if (changedProperties.has("disableInteraction")) {
      this._viewer.get("zoomScroll").toggle(this.disableInteraction);
    }
  }

  private _initViewer() {
    if (this._viewer) {
      this._viewer.get("eventBus").off("root.set");
      this._viewer.destroy();
    }

    this._viewer = new Viewer({
      container: this.renderRoot.querySelector("#bpmn-container") as HTMLElement,
      moddleExtensions: {
        bizdevops,
      },
      additionalModules: this.enableSimulator ? [TokenSimulationModule] : [],
    });

    this._viewer.get("eventBus").on("root.set", () => {
      this._setHeight();
    });

    if (this.xml) {
      this._updateDiagram(this.xml);
    }

    if (this.disableInteraction) {
      this._viewer.get("zoomScroll").toggle(this.disableInteraction);
    }

    this._initialized = true;
  }

  private async _updateDiagram(xml: string) {
    if (!xml) {
      return;
    }

    try {
      const { warnings } = await this._viewer.importXML(
        xml.replace(/\\"/g, '"')
      );

      if (warnings.length) {
        console.log("bpmn import with warnings", warnings);
      }

      this._makeElementsClickable();

      if (this.showProcess) {
        this._expandSubProcess();
      }
    }
    catch (err) {
      console.log("something went wrong while importing bpmn:", err);
    }
  }

  private _setHeight() {
    const minMax = _getMinMaxHeight(this);
    const extraHeight = _calculateExtraHeigt(this);
    const viewbox = this._viewer.get("canvas").viewbox();
    const container = this.renderRoot.querySelector("#bpmn-container") as HTMLElement;

    container.style.aspectRatio = `${viewbox.inner.width} / ${viewbox.inner.height}`;
    container.style.minHeight = `${minMax.minHeight}px`;
    container.style.maxHeight = `${Math.min(viewbox.inner.height + extraHeight, minMax.maxHeight)}px`;

    this.zoomReset();

    function _calculateExtraHeigt(el) {
      const breadcrumbs = el.renderRoot.querySelector(".bjs-breadcrumbs") as HTMLElement;
      const { x, height } = breadcrumbs.getBoundingClientRect();
      const lineTweak = Math.max(10, x + height) * 2;
      return lineTweak;
    }

    function _getMinMaxHeight(element) {
      const style = window.getComputedStyle(element);
      const minHeightRaw = style.minHeight;
      const maxHeightRaw = style.maxHeight;

      const parseValue = (value) => {
        if (value === 'none' || value === 'auto') {
          return null;
        }
        const parsed = parseFloat(value);
        return isNaN(parsed) ? null : parsed;
      };

      return {
        minHeight: parseValue(minHeightRaw) ?? 0,
        maxHeight: parseValue(maxHeightRaw) ?? Number.MAX_SAFE_INTEGER,
      };
    }
  }

  private _expandSubProcess() {
    try {
      const subProcessId = this.showProcess.split("/").pop();
      const elementRegistry = this._viewer.get("elementRegistry");
      const element = elementRegistry.get(`${subProcessId}_plane`);
      this._viewer.get("canvas").setRootElement(element);
    }
    catch (error: unknown) {
      console.error(error);
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

      if (links.length === 0) {
        return;
      }
      this.dispatchEvent(
        new CustomEvent("onelementclick", {
          detail: { element: event.element, links },
          bubbles: true,
          composed: true,
        })
      );
    });

    elementRegistry.forEach((element: Element) => {
      const gfx = elementRegistry.getGraphics(element);
      if (!gfx) return;

      const links = this._getLinks(element.di);
      if (links.length === 0) return;

      gfx.style.cursor = "pointer"; // has no effect
      gfx.style.textDecoration = "underline";
    });
  }

  static override get styles() {
    return [
      resetCss,
      css`
        :host {
          display: block;
          width: 100%;
          height: 100%;
        }
        #bpmn-container {
          width: 100%;
          height: 100%;
        }
        .bjs-breadcrumbs {
          top: 0px!important;
          left:0px!important;
        }
        .bjs-powered-by {
            display: none;
        }
      `,
      css`${unsafeCSS(viewerDiagramJsCss)}`,
      css`${unsafeCSS(viewerBpmnJsCss)}`,
      css`${unsafeCSS(simulatorCss)}`,
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
    const currentViewbox = this._viewer.get("canvas").viewbox()

    this._viewer.get("canvas").viewbox({
      x: 0,
      y: 0,
      width: currentViewbox.width,
      height: currentViewbox.height
    })

    this._viewer.get("canvas").zoom("fit-viewport", "auto");
  }
}
