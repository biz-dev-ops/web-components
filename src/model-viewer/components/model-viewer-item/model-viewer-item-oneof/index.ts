import { customElement, property } from "lit/decorators.js";
import { TemplateResult, css, html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { ItemSelected, ModelItem } from "../../../models";

import "../../../../shared/button";
import "../../../../shared/popover";
import { ModelViewerItem } from "..";
import { titlelize, parseMarkdown } from "../../../../shared/util";
import { ModelItemDecorator, ModelItemDecoratorBuilder } from "../../../modules/model-item-decorator-builder";

@customElement('model-viewer-item-one-of')
export class ModelViewerItemOneOf extends ModelViewerItem {
    @property({ type: Array }) items!: ModelItemDecorator[];

    override render() {
        return html`
            <div class="item item--one-of">
                <h2>
                    <span class="txt--property">
                        ${titlelize(this.title)}
                        ${this.required ? html`<span class="txt--required">*</span>` : ``}
                    </span>
                </h2>

                <ul class="list--one-of">
                    ${this.items
                        .map(item => item.item)
                        .map(item => html`
                        <li>
                            <bdo-button direction="right" @clicked="${() => { this._onClicked(item); }}">
                                <span class="button-label">
                                <span class="txt--property">${titlelize(item.title)}</span>
                                ${item.description ? html`
                                    <bdo-popover>
                                        ${unsafeHTML(parseMarkdown(item.description.trim()))}
                                    </bdo-popover>
                                ` : null}
                                </span>
                            </bdo-button>
                        </li>
                    `)}
                </ul>
            </div>
        `;
    }

    private _onClicked(item: ModelItem) {
        this.dispatchEvent(new CustomEvent<ItemSelected>('itemSelected', { detail: { property: this.property, item } }));
    }

    static override get styles() {
        return [...super.styles, css`
            .list--one-of {
                list-style: none;
                padding-inline-start: 0;
                display: flex;
                flex-direction: column;
                row-gap: var(--space-sm);
            }

            .list--one-of {
                row-gap: var(--space-xxs);
            }

            .list--one-of li {
                display: flex;
                flex-direction: column;
                position: relative;
                row-gap: var(--space-xxs);
            }

            .list--one-of li:not(:last-child)::after {
                content: 'OR';
                font-size: var(--font-size-xs);
                text-align: center;
                display: block;
                color: var(--color-black-a40);
                font-weight: 600;
            }

            .button-label {
                display: flex;
                column-gap: var(--space-xs);
            }
        `];
    }

    static async build(decorated: ModelItemDecorator, builder: ModelItemDecoratorBuilder, itemSelectedDelegate: (event: CustomEvent<ItemSelected>) => void): Promise<TemplateResult> {
        if (!decorated.item.oneOf)
            return html``;

        const result = await decorated.item.oneOf.map(async item => builder.build(item));
        const items = await Promise.all(result);

        return html`
            <model-viewer-item-one-of
                aria-label="model-viewer-item"
                property=${decorated.property}
                title=${titlelize(decorated.title)}
                .items=${items}
                .required=${decorated.required}
                @itemSelected=${itemSelectedDelegate}
            ></model-viewer-item-one-of>
      `;
    }
}