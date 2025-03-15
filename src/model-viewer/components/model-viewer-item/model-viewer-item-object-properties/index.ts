import { customElement } from "lit/decorators.js";
import { TemplateResult, css, html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { ItemSelected } from "../../../models";

import "../../../../shared/button";
import { ModelItemBuilder } from "../../../modules/model-item-builder";
import { ModelViewerItem } from "..";
import { titlelize, parseMarkdown } from "../../../../shared/util";
import { ModelItemDecorator, ModelItemDecoratorBuilder } from "../../../modules/model-item-decorator-builder";

@customElement("model-viewer-item-object-properties")
export class ModelViewerItemObjectProperties extends ModelViewerItem {
  override render() {
    return html`
      <div class="item item--object">
        <h2>
          <span class="txt--property">
            ${titlelize(this.title)}
            ${this.required ? html`<span class="txt--required">*</span>` : ``}
          </span>
        </h2>
        ${this.item.description ? html`${unsafeHTML(parseMarkdown(this.item.description))}` : null}
        <div class="items" slot="items">
          <slot></slot>
        </div>
      </div>
    `;
  }

  static override get styles() {
    return [
      ...super.styles,
      css`
        .items {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
        }

        p {
          white-space: pre-wrap;
        }
      `,
    ];
  }

  public static async build(decorated: ModelItemDecorator, builder: ModelItemDecoratorBuilder, itemSelectedDelegate: (event: CustomEvent<ItemSelected>) => void, root: boolean): Promise<TemplateResult> {
    if (!isObject(decorated, root)) return html``;

    const properties: TemplateResult<1>[] = [];
    for (const property in decorated.item.properties) {
      const child = await builder.build(
        decorated.item.properties[property],
        property,
        decorated.isChildRequired(property)
      );
      properties.push(html`${await ModelItemBuilder.build(child, builder, itemSelectedDelegate, true)}`);
    }

    return html`
      <model-viewer-item-object-properties
        property=${decorated.property}
        title=${titlelize(decorated.title)}
        .item=${decorated.item}
        .required=${decorated.required}
      >
        ${properties}
      </model-viewer-item-object-properties>
    `;
  }
}

const isObject = (decorated: ModelItemDecorator, root: boolean) => {
  return (
    !root && (decorated.item.type === "object" || decorated.item.properties)
  );
};
