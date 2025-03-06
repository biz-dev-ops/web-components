import { css, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from "../shared/styles/reset";

import Viewer from 'dmn-js';
import ViewerSharedCss from 'dmn-js/dist/assets/dmn-js-shared.css?inline';
import ViewerDrdCss from 'dmn-js/dist/assets/dmn-js-drd.css?inline';
import ViewerDecisionTableCss from 'dmn-js/dist/assets/dmn-js-decision-table.css?inline';
import ViewerLiteralExpressionCss from 'dmn-js/dist/assets/dmn-js-literal-expression.css?inline';
import ViewerDMNCss from 'dmn-js/dist/assets/dmn-font/css/dmn.css?inline';

@customElement('dmn-viewer')
export class DMNViewer extends LitElement {
  private _viewer!: any;

  @property({ attribute: "data-xml" })
  xml!: string

  override async firstUpdated() {
    this._viewer = new Viewer({
      container: this.renderRoot as HTMLElement
    });

    try {
      const { warnings } = await this._viewer.importXML(this.xml);

      if (warnings.length) {
        console.log('import with warnings', warnings);
      }
      else {
        console.log('import successful');
      }

      this.zoomReset();
    }
    catch (err) {
      console.log('something went wrong:', err);
    }
  }

  static override get styles() {
    return [
      styles,
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
