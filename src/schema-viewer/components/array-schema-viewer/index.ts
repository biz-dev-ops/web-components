import { css, CSSResult, CSSResultArray, html, LitElement } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { customElement, eventOptions, property } from "lit/decorators.js";

import resetCss from "../../../shared/styles/reset.css";
import schemaViewerCss from "../schema-viewer.css";

import { parseMarkdown, titlelize } from "../../../shared/util";
import { FragmentSelected } from "../../types";


import "../../../shared/popover";
import "../../../shared/button";
import { Schema } from "../../../shared/fetch/schema";

export const tag = "array-schema-viewer";

@customElement(tag)
export class ArraySchemaViewerComponent extends LitElement {
    static CanRender(schema: any) : boolean {
        return "type" in schema && schema.type === "array";
    }

    @property({ type: Boolean })
    required!: boolean;

    @property({ type: Array })
    path!: string[];

    @property({ type: Object })
    schema!: Schema;

    override render() {
        const key = this.path.at(-1)!;
        const schema = this.schema.resolveSchema(this.path);
        const name = titlelize(schema.items.title || "item");

        if(!ArraySchemaViewerComponent.CanRender(schema)) {
            return;
        }

        return html`
            <div class="item item--array">
                <h3 data-testid="array-title">
                    <span class="txt--property">
                        ${titlelize(schema.title || key)} ${this.required ? html`<span class="txt--required" data-testid="required-indicator">*</span>` : ``}
                    </span>
                    ${schema.description ? html`<bdo-popover>${unsafeHTML(parseMarkdown(schema.description.trim()))}</bdo-popover>` : null }
                </h3>

                <ul class="list--array">
                    ${[...Array(2).keys()].map((_, index) => html`
                        <li>
                            <bdo-button direction="right" ?disabled="${index > 0}" @clicked=${() => { this._onClick(schema, key); }} data-testid="array-item">
                                <span class="txt--property">${name}</span>
                            </bdo-button>
                        </li>
                    `)}
                </ul>
            </div>
        `;
    }

    @eventOptions({ passive: true })
    private _onClick(schema: any, key: string) {
        const fragments = [{
            name: schema.title || key,
            key: key,
            disabled: true
         }, {
            name: schema.items.title || "item",
            key: "items",
         }];

        this.dispatchEvent(new CustomEvent<FragmentSelected>('FragmentSelected', { detail: fragments }));
    }

    static override get styles(): CSSResult | CSSResultArray {
        return [
            resetCss,
            schemaViewerCss,
            css`
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
            `
        ];
    }
}
