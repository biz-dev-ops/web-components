import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";

import modelViewerPathCss from "./model-viewer-path.css";
import { PathChanged } from "../../models";
import { titlelize } from "../../../shared/util";
import "../../../shared/button";
import { ItemType, ModelItemDecorator } from "../../modules/model-item-decorator-builder";

@customElement('model-viewer-path')
export class ModelViewerPath extends LitElement {

  @property({ type: Array })
  path: ModelItemDecorator[] = [];

  override render() {
    return html`
      <nav>
        <ol class="list--path">
          ${this.path.map((decorated: ModelItemDecorator, index) => this._renderPathItem(decorated, index))}
        </ol>
      </nav>
    `;
  }

  private _renderPathItem(decorated: ModelItemDecorator, index: number) {
    const title = titlelize(decorated.title || "/");
    const item = html`<span class="txt--property">${title}</span>`;
    const last = this._isLast(index);

    return html`
          <li class="${ifDefined(decorated.type)} ${ifDefined(decorated.title?.trim().length === 0 ? "no-title" : null)}">
            ${decorated.type === ItemType.Array || last ? item : html`
                <bdo-button class="button--path" .disabled="${last}" @clicked="${() => { this._onClick(index); }}">
                  ${item}
                </bdo-button>
            `}
          </li>
        `
  }

  private _isLast(index: number): boolean {
    return index === (this.path.length - 1);
  }

  private _onClick(index: number) {
    this.dispatchEvent(new CustomEvent<PathChanged>('pathChanged', { detail: { index } }));
  }

  static override get styles() {
    return [modelViewerPathCss];
  }
}