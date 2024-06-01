import { css, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from "../shared/styles/reset";

import Viewer from 'archimate-js/lib/NavigatedViewer'; 
import ViewerArchimateJsCss from 'archimate-js/assets/archimate-js.css';
import ViewerPaletteIconsCss from 'archimate-js/assets/palette-icons.css';

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
      css`${unsafeCSS(ViewerArchimateJsCss)}`, 
      css`${unsafeCSS(ViewerPaletteIconsCss) }`
    ];
  }
}