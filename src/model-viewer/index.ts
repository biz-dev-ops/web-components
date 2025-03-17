import { css, html, LitElement, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import resetCss from "../shared/styles/reset.css";
import themeCss from "../shared/styles/theme.css";
import { ItemSelected, ModelItem, PathChanged } from "./models";
import { ModelItemBuilder } from "./modules/model-item-builder";
import "./components/model-viewer-path";
import { FetchError, fetchYamlAndBundleAs } from "../shared/fetch";
import { ModelItemDecorator, ModelItemDecoratorBuilder } from "./modules/model-item-decorator-builder";

export const tag = "model-viewer";

@customElement(tag)
export class ModelViewer extends LitElement {
  builder!: ModelItemDecoratorBuilder;

  @property()
  name!: string;

  @property({ type: Object })
  model!: ModelItem

  @state()
  error!: FetchError | null;

  @property({ attribute: "src" })
  src!: string

  @property({ attribute: "data-json" })
  modelJson!: string;

  path: ModelItemDecorator[] = [];

  @state()
  item!: TemplateResult | TemplateResult[];

  constructor() {
    super();

    (window as any).addEventListener("popstate", this.onPopState.bind(this));
  }

  override render() {
    if (this.error) {
      return html`<div class="error">${this.error.message}</div>`;
    }

    if (this.path.length === 0) return html``;

    return html`
      <model-viewer-path
        .path=${this.path}
        @pathChanged=${this.onPathChanged}
      ></model-viewer-path>
      <main>
       ${this.item}
      </main>
    `;
  }

  override async update(changedProperties: Map<string, unknown>) {
    if (changedProperties.has("src")) {
      try {
        this.model = await fetchYamlAndBundleAs<ModelItem>(this.src);
      }
      catch (error: any) {
        this.error = error;
      }
    }

    if (changedProperties.has("modelJson")) {
      this.model = JSON.parse(this.modelJson) as ModelItem;
    }

    if (changedProperties.has("model")) {
      this.error = null;
      this.builder = new ModelItemDecoratorBuilder(this.model);
      this.path = [];
      this.model.title = this.model.title || this.name;
      await this.addPath("", this.model);
    }

    super.update(changedProperties);
  }

  override updated() {
    this.shadowRoot?.querySelector("model-viewer-path")?.scrollIntoView();
  }

  async setPath(path: ModelItemDecorator[]) {
    this.path = path;
    history.pushState(this.path.length, "");
    this.item = await ModelItemBuilder.build(
      this.path.at(-1) as ModelItemDecorator,
      this.builder,
      this.onItemSelected.bind(this),
      false
    );
  }

  async addPath(property: string, item: ModelItem | undefined) {
    if (item === undefined) {
      return;
    }

    const parent = this.path.at(-1);
    const decorator = await this.builder.build(item, property, parent?.isChildRequired(property));

    await this.setPath([
      ...this.path,
      decorator,
    ]);
  }

  async onItemSelected(event: CustomEvent<ItemSelected>) {
    await this.addPath(event.detail.property, event.detail.item);
  }

  async onPathChanged(event: CustomEvent<PathChanged>) {
    await this.setPath(this.path.slice(0, event.detail.index + 1));
  }

  async onPopState(event: any) {
    if (event.state) {
      await this.setPath(this.path.slice(0, -1));
    }
  }

  static override get styles() {
    return [
      resetCss,
      themeCss,
      css`
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
      `
    ];
  }
}
