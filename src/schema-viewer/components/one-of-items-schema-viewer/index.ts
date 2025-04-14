import { css, CSSResult, CSSResultArray, html, LitElement } from "lit";
import { customElement, eventOptions, property } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import { parseMarkdown, titlelize } from "../../../shared/util";

import schemaViewerCss from "../schema-viewer.css";
import resetCss from "../../../shared/styles/reset.css";
import "../../../shared/button";
import "../../../shared/popover";

import { FragmentSelected } from "../../types";

export const tag = "one-of-items-schema-viewer";

@customElement(tag)
export class OneOfItemsSchemaViewerComponent extends LitElement {
    static CanRender(_schema: any, key: string) : boolean {
        return key === "oneOf";
    }

    @property({ type: Boolean })
    required!: boolean;

    @property({ type: String })
    key!: string;

    @property({ type: Object })
    schema!: any;

    override render() {
        if(!OneOfItemsSchemaViewerComponent.CanRender(this.schema, this.key)) {
            return;
        }

        return html`
            <div class="item item--one-of">
                <ul class="list--one-of">
                    ${this.schema.map((item: any, index: number) => html`
                        <li>
                            <bdo-button direction="right" @clicked="${() => { this._onClick(index); }}">
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

    @eventOptions({ passive: true })
    private _onClick(index: number) {
        const item = this.schema[index];
        const fragments = [{
            name: item.title || "item",
            key: index.toString()
         }];

        this.dispatchEvent(new CustomEvent<FragmentSelected>('FragmentSelected', { detail: fragments }));
    }

    static override get styles(): CSSResult | CSSResultArray {
        return [
            resetCss,
            schemaViewerCss,
            css`
                [hidden=true] {
                    display: none !important;
                }

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
            `
        ];
    }
}
