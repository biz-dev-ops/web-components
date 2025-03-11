import { css, LitElement, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import Viewer from "dmn-js";

import resetCss from "../shared/styles/reset.css?inline";
import themeCss from "../shared/styles/theme.css?inline";
import ViewerSharedCss from "dmn-js/dist/assets/dmn-js-shared.css?inline";
import ViewerDrdCss from "dmn-js/dist/assets/dmn-js-drd.css?inline";
import ViewerDecisionTableCss from "dmn-js/dist/assets/dmn-js-decision-table.css?inline";
import ViewerLiteralExpressionCss from "dmn-js/dist/assets/dmn-js-literal-expression.css?inline";
import ViewerDMNCss from "dmn-js/dist/assets/dmn-font/css/dmn.css?inline";

@customElement("dmn-viewer")
export class DMNViewer extends LitElement {
  private _viewer!: any;

  @property({ attribute: "src" })
  src!: string

  @property({ attribute: "data-xml" })
  xml!: string

  override async firstUpdated() {
    if (this._viewer) {
      this._viewer.destroy();
    }

    this._viewer = new Viewer({
      container: this.renderRoot as HTMLElement
    });

    this._updateDiagram(this.xml);
  }

  override async updated(changedProperties) {
    if (changedProperties.has("src")) {
      const response = await fetch(this.src);
      if (!response.ok) {
        const container = this.renderRoot as HTMLElement;
        container.innerHTML = `<div class="error">Failed to fetch ${this.src}</div>`;
        console.error(`Failed to fetch ${this.src}, status: ${response.status}, ${response.statusText}`, response);
        return;
      }

      this.xml = await response.text();
      this._updateDiagram(this.xml);
    }

    if (changedProperties.has("xml")) {
      this._updateDiagram(this.xml);
    }
  }

  private async _updateDiagram(xml: string) {
    if (!xml) {
      return;
    }

    try {
      const { warnings } = await this._viewer.importXML(this.xml);

      if (warnings.length) {
        console.log("import with warnings", warnings);
      }
      else {
        console.log("import successful");
      }

      this.zoomReset();
    }
    catch (err) {
      console.log("something went wrong:", err);
    }
  }

  static override get styles() {
    return [
      resetCss,
      themeCss,
      css`
        :host {
          display: block;
          width: 100%;
          height: 100%;
        }
        #dmn-container {
          width: 100%;
          height: 100%;
        }
        .error {
          border: 3px solid red;
        }
        .bjs-powered-by {
            display: none;
        }
      `,
      css`${unsafeCSS(ViewerSharedCss)}`,
      css`${unsafeCSS(ViewerDrdCss)}`,
      css`${unsafeCSS(ViewerDecisionTableCss)}`,
      css`${unsafeCSS(ViewerLiteralExpressionCss)}`,
      css`${unsafeCSS(ViewerDMNCss)}`
    ];
  }

  public zoomReset() {
    this._viewer.getActiveViewer().get("canvas").zoom("fit-viewport", "auto");
  }
}
