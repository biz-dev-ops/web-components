import { customElement, eventOptions } from "lit/decorators.js";
import { css, html, TemplateResult } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { ItemSelected } from "../../../models";
import { ModelViewerItem } from "..";
import { titlelize, parseMarkdown } from "../../../../shared/util";

import "../../../../shared/button";
import "../../../../shared/popover";
import { ModelItemDecorator, ModelItemDecoratorBuilder } from "../../../modules/model-item-decorator-builder";

@customElement('model-viewer-item-array')
export class ModelViewerItemArray extends ModelViewerItem {

    override render() {
        const name = titlelize(this.item.items.title || "item");

        return html`
            <div class="item item--array">
                <h3>
                    <span class="txt--property">
                        ${titlelize(this.title)} ${this.required ? html`<span class="txt--required">*</span>` : ``}
                    </span>
                    ${this.item.description ?
                        html`
                            <bdo-popover>
                                ${unsafeHTML(parseMarkdown(this.item.description.trim()))}
                            </bdo-popover>
                        ` : null
                    }
                </h3>

                <ul class="list--array">
                    ${[...Array(2).keys()].map((_, index) => html`
                        <li>
                            <bdo-button direction="right" @clicked=${this._onClick} ?disabled="${index > 0}">
                                <span class="txt--property">${name}</span>
                            </bdo-button>
                        </li>
                    `
            )}
                </ul>
            </div>
        `;
    }

    @eventOptions({ passive: true })
    private _onClick() {
        this.dispatchEvent(new CustomEvent<ItemSelected>('itemSelected', { detail: { property: this.property, item: this.item } }));
        this.dispatchEvent(new CustomEvent<ItemSelected>('itemSelected', { detail: { property: "item", item: this.item.items } }));
    }

    static override get styles() {
        return [...super.styles, css`

            .item--array {
                border-radius: var(--radius-half);
                border: var(--line-thin) solid var(--_item-line-color);
                padding: var(--space-sm);
                padding-block-end: 0;
                margin-block-end: calc(var(--space-xs) * -1);
                mask-image: linear-gradient(to top, transparent var(--space-sm), black var(--space-xl));
                -webkit-mask-image: linear-gradient(to top, transparent var(--space-sm), black var(--space-xl));
            }

            .list--array {
                list-style: none;
                padding-inline-start: 0;
                display: flex;
                flex-direction: column;
                row-gap: var(--space-sm);
            }

            .list--array li {
                position: relative;
            }

            .list--array li::before,
            .list--array li::after {
            content: '';
                position: absolute;
                inset-inline-start: calc(var(--space-sm) * -1);
                inset-block-start: calc(var(--space-sm) + var(--space-xxs));
            }

            .list--array li::before {
                background-color: var(--_item-line-color);
                block-size: var(--line-thin);
                inline-size: var(--space-sm);
            }

            .list--array li::after {
                aspect-ratio: 1;
                background-color: var(--surface-main);
                block-size: .625rem;
                border-radius: var(--radius-circle);
                border: var(--line-thin) solid var(--_item-line-color);
                transform: translateX(-.4375rem) translateY(-.25rem);
            }

            .list--array li:not(:first-child) {
                pointer-events: none;
            }
        `];
    }

    static async build(decorated: ModelItemDecorator, _builder: ModelItemDecoratorBuilder, itemSelectedDelegate: (event: CustomEvent<ItemSelected>) => void, _root: boolean) : Promise<TemplateResult> {
        if (decorated.item.type != "array" && !decorated.item.items)
            return html``;

        return html`
            <model-viewer-item-array
                aria-label="model-viewer-item"
                property=${decorated.property}
                title=${titlelize(decorated.title)}
                .item=${decorated.item}
                .required=${decorated.required}
                @itemSelected=${itemSelectedDelegate}
            ></model-viewer-item-array>
        `;
    }
}