import { css, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from "../shared/styles/reset";

import Viewer from 'archimate-js/lib/NavigatedViewer'; 
import viewerStyles from 'archimate-js/assets/archimate-js.css';

@customElement('archimate-viewer')
export class ArchimateViewer extends LitElement {
  private _viewer!: any;

  @property({ attribute: "data-xml" })
  xml!: string

  constructor() {
    super();
  }

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
      
      //Why is this necessary?
      await this._viewer.openView();
      
      this._viewer
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
      css`${unsafeCSS(viewerStyles)}`
    ];
  }
}