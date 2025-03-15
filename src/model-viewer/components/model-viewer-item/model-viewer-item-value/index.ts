import { css, html, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { ItemSelected } from "../../../models";

import "../../../../shared/popover";
import { ModelViewerItem } from "..";
import { titlelize, parseMarkdown } from "../../../../shared/util";
import { ModelItemDecorator, ModelItemDecoratorBuilder } from "../../../modules/model-item-decorator-builder";

@customElement('model-viewer-item-value')
export class ModelViewerItemValue extends ModelViewerItem {

    override render() {
        const properties: TemplateResult[] = [];

        for (const property in this.item) {
            if (property !== 'description' && property !== 'title' && property !== 'type' && property !== 'format') {
                properties.push(html`
                    <dt>${property}</dt>
                    ${Array.isArray(this.item[property]) ?
                        html`
                            <ul>
                                ${this.item[property].map(item => html`<li>${item}</li>`)}
                            </ul>
                        `
                        : html`<dd>${this.item[property]}</dd>`
                    }
              `);
            }
        }

        return html`
            <div class="item item--value">
                <h3>
                    <span class="txt--property">
                        ${titlelize(this.title)}
                        ${this.required ? html`<span class="txt--required">*</span>` : ``}
                    </span>
                    ${this.item.description ?
                        html`
                            <bdo-popover>
                                ${unsafeHTML(parseMarkdown(this.item.description.trim()))}
                            </bdo-popover>
                        ` : null
                    }
                    <span class="icon--type">
                        ${this.item.type}${this.item.format ? html`: <em>${this.item.format}</em>` : ''}
                    </span>
                </h3>

                ${properties}
            </div>
        `;
    }

    static override get styles() {
        return [...super.styles, css`
             dt {
                color: rgba(0 0 0 / 50%);
                font-weight: 600;
            }

            dd {
                margin-inline-start: 0;
                white-space: pre-wrap;
            }

            dd + dt {
                margin-block-start: 1em;
            }

            .item--value {
                background-color: var(--color-black-a05);
                border-radius: var(--radius-half);
                padding: var(--space-sm);
            }

            .icon--type {
                margin-inline-start: auto;
                font-size: var(--font-size-xs);
                background-color: var(--main-surface);
                border-radius: var(--radius-pill);
                align-self: center;
                padding: var(--space-xxs) var(--space-xs);
            }

            .icon--type em {
                font-style: normal;
                font-weight: 400;
            }
        `];
    }

    static async build(decorated: ModelItemDecorator, _builder: ModelItemDecoratorBuilder, _itemSelectedDelegate: (event: CustomEvent<ItemSelected>) => void): Promise<TemplateResult> {
        if (decorated.item.type != 'string' && decorated.item.type != 'number' && decorated.item.type != 'integer' && decorated.item.type != 'boolean')
            return html``;

        return html`
            <model-viewer-item-value
              aria-label="model-viewer-item"
              property=${decorated.property}
              title=${titlelize(decorated.title)}
              .item=${decorated.item}
              .required=${decorated.required}
            ></model-viewer-item-value>
          `;
    }
}