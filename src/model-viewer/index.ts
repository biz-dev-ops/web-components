import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import {
  ItemSelected,
  ModelItem,
  ModelItemDecorator,
  PathChanged,
} from "./models";
import { ModelItemBuilder } from "./modules/model-item-builder";

import "./components/model-viewer-path";

import "@biz-dev-ops/md-docs/assets/style/page/style.css";
import "../../assets/style/custom-theme.css";

@customElement("model-viewer")
export class ModelViewer extends LitElement {
  @property()
  name!: string;

  @property({ type: Object })
  model!: ModelItem;

  @property({ attribute: "model-json" })
  modelJson!: string;

  @state()
  path: ModelItemDecorator[] = [];

  constructor() {
    super();

    (window as any).addEventListener("popstate", this.onPopState.bind(this));
  }

  override render() {
    if (this.path.length === 0) return "";

    return html`
      <model-viewer-path
        .path=${this.path}
        @pathChanged=${this.onPathChanged}
      ></model-viewer-path>
      <main>
        ${ModelItemBuilder.build(
          this.path.at(-1) as ModelItemDecorator,
          this.onItemSelected.bind(this),
          false
        )}
      </main>
    `;
  }

  override update(changedProperties: Map<string, unknown>) {
    if (changedProperties.has("modelJson")) {
      this.path = [];
      this.model = JSON.parse(this.modelJson);
      this.model.title = this.model.title || this.name;
      this.addPath("", this.model);
    } else if (changedProperties.has("model")) {
      this.path = [];
      this.model.title = this.model.title || this.name;
      this.addPath("", this.model);
    }

    super.update(changedProperties);
  }

  override updated() {
    this.shadowRoot?.querySelector("model-viewer-path")?.scrollIntoView();
  }

  setPath(path: ModelItemDecorator[]) {
    this.path = path;
    history.pushState(this.path.length, "");
  }

  addPath(property: string, item: ModelItem | undefined) {
    if (item === undefined) {
      return;
    }

    const parent = this.path.at(-1);
    this.setPath([
      ...this.path,
      new ModelItemDecorator(item, property, parent?.isChildRequired(property)),
    ]);
  }

  onItemSelected(event: CustomEvent<ItemSelected>) {
    this.addPath(event.detail.property, event.detail.item);
  }

  onPathChanged(event: CustomEvent<PathChanged>) {
    this.setPath(this.path.slice(0, event.detail.index + 1));
  }

  onPopState(event: any) {
    if (event.state) {
      this.setPath(this.path.slice(0, -1));
    }
  }

  static override get styles() {
    return css`
      :host {
        border: var(--line-base) solid var(--color-brand-a40);
        padding: var(--space-md);
        display: block;
        border-radius: var(--radius-base);
        font-size: var(--font-size-sm);
        display: flex;
        flex-direction: column;
        gap: var(--space-md);
      }
    `;
  }
}
