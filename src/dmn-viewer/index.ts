import { css, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from "../shared/styles/reset";

import Viewer from 'dmn-js';
import ViewerSharedCss from 'dmn-js/dist/assets/dmn-js-shared.css';
import ViewerDrdCss from 'dmn-js/dist/assets/dmn-js-drd.css';
import ViewerDecisionTableCss from 'dmn-js/dist/assets/dmn-js-decision-table.css';
import ViewerLiteralExpressionCss from 'dmn-js/dist/assets/dmn-js-literal-expression.css';
import ViewerDMNCss from 'dmn-js/dist/assets/dmn-font/css/dmn.css';

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

      //Why is getActiveViewer necessary?
      this._viewer
        .getActiveViewer()
        .get('canvas')
        .zoom('fit-viewport');
    }
    catch (err) {
      console.log('something went wrong:', err);
    }
  }

  static override get styles() {
    return [
      styles,
      css`${unsafeCSS(ViewerSharedCss)}`,
      css`${unsafeCSS(ViewerDrdCss)}`,
      css`${unsafeCSS(ViewerDecisionTableCss)}`,
      css`${unsafeCSS(ViewerLiteralExpressionCss)}`,
      css`${unsafeCSS(ViewerDMNCss)}`
    ];
  }
}