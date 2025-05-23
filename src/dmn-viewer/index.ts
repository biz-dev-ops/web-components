import { css, html, LitElement, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import Viewer from "dmn-js";

import resetCss from "../shared/styles/reset.css";
import ViewerSharedCss from "dmn-js/dist/assets/dmn-js-shared.css?inline";
import ViewerDrdCss from "dmn-js/dist/assets/dmn-js-drd.css?inline";
import ViewerDecisionTableCss from "dmn-js/dist/assets/dmn-js-decision-table.css?inline";
import ViewerLiteralExpressionCss from "dmn-js/dist/assets/dmn-js-literal-expression.css?inline";
import ViewerDMNCss from "dmn-js/dist/assets/dmn-font/css/dmn-embedded.css?inline";
import { appendFontFaceDefinitionToDom } from "../shared/util";
import { FetchError, fetchText } from "../shared/fetch";
import "../shared/alert";
import { Action, ActionLitElement } from "../shared/action-dispatcher";
export const tag: string = "dmn-viewer";

@customElement(tag)
export class DMNViewer extends ActionLitElement {

  private _viewer!: any;

  @property({ attribute: "src" })
  src!: string

  @property({ attribute: "data-xml" })
  xml!: string

  @state()
  error!: FetchError | null;

  override render() {
    if (this.error) {
      return html`<bdo-alert type="error">${this.error.message}</bdo-alert>`;
    }
    return html``;
  }

  override async firstUpdated() {
    this._viewer = new Viewer({
      container: this.renderRoot as HTMLElement
    });
    appendFontFaceDefinitionToDom(this);
  }

  override async updated(changedProperties) {
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

      this.zoomReset();
    }
    catch (err) {
      console.log("something went wrong:", err);
    }
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
        #dmn-container {
          width: 100%;
          height: 100%;
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

  @Action("toggle-fullscreen")
  public zoomReset() {
    this._viewer.getActiveViewer().get("canvas").zoom("fit-viewport", "auto");
  }
}
