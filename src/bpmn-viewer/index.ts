import { css, html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from "../shared/styles/reset";

import Viewer from 'bpmn-js/lib/NavigatedViewer'; 
import ViewerDiagramJsCss from 'bpmn-js/dist/assets/diagram-js.css';
import ViewerBpmnJsCss from 'bpmn-js/dist/assets/bpmn-js.css';

@customElement('bpmn-viewer')
export class BPMNViewer extends LitElement {
  private _viewer!: any;

  @property({ attribute: "data-xml" })
  xml!: string

  constructor() {
    super();
  }

  override render() {
    return html`
       <div id="canvas" tabindex="0"></div>
    `;
  }

  override async firstUpdated() {
    this._viewer = new Viewer({
      container: this.renderRoot.querySelector("#canvas") as HTMLElement
    });

    try {
      const { warnings } = await this._viewer.importXML(this.xml);

      if (warnings.length) {
        console.log('import with warnings', warnings);
      } else {
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
      css`${unsafeCSS(ViewerDiagramJsCss)}`, 
      css`${unsafeCSS(ViewerBpmnJsCss) }`,
      css`
        :host,
        #canvas {
          height: 100%;  
        }
      `
    ];
  }
}