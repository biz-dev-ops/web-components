import { css, CSSResult, CSSResultArray, html, LitElement } from "lit";
import { customElement, eventOptions, property } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import { parseMarkdown, titlelize } from "../../../shared/util";

import schemaViewerCss from "../schema-viewer.css";
import resetCss from "../../../shared/styles/reset.css";

import { FragmentSelected } from "../../types";

import { ArraySchemaViewerComponent } from "../array-schema-viewer";
import { ObjectSchemaViewerComponent } from "../object-schema-viewer";
import { PrimitiveSchemaViewerComponent } from "../primitive-schema-viewer";
import { RefSchemaViewerComponent } from "../ref-schema-viewer";
import "../../../shared/button";

export const tag = "one-of-schema-viewer";

@customElement(tag)
export class OneOfSchemaViewerComponent extends LitElement {
    static CanRender(schema: any, _key: string): boolean {
        return "oneOf" in schema;
    }

    @property({ type: Boolean })
    required!: boolean;

    @property({ type: String })
    key!: string;

    @property({ type: Object })
    schema!: any;

    @property({ type: Boolean })
    collapse!: boolean;

    override render() {
        if (!OneOfSchemaViewerComponent.CanRender(this.schema, this.key)) {
            return "oneOf" in this.schema;
        }

        if (this.collapse) {
            return html`
                <div class="item item--object">
                    <bdo-button type="button" direction="right" @clicked=${this._onClick}>
                        <span class="txt--property">
                            ${titlelize(this.schema.title || this.key)}
                            ${this.required ? html`<span class="txt--required">*</span>` : ``}
                        </span>
                        ${this.schema.description ? html`<bdo-popover>${unsafeHTML(parseMarkdown(this.schema.description.trim()))}</bdo-popover>` : null}
                    </bdo-button>
                </div>
            `;
        }

        return html`
            <div class="item item--one-of">
                ${this.schema.description ? html`<bdo-truncate>${unsafeHTML(parseMarkdown(this.schema.description))}</bdo-truncate>` : null}
                <ul class="list--one-of">
                    ${this.schema.oneOf.map((item: any, index: number) => html`
                        <li>
                            ${ArraySchemaViewerComponent.CanRender(item, this.key) ? html`<array-schema-viewer .key=${this.key} .schema=${item} .required=${this.required} @FragmentSelected=${(event: CustomEvent<FragmentSelected>) => { this._onFragmentSelected(index, event); }}></array-schema-viewer>` : null}
                            ${ObjectSchemaViewerComponent.CanRender(item, this.key) ? html`<object-schema-viewer .key=${this.key} .schema=${item} .required=${this.required} .collapse=${true} @FragmentSelected=${(event: CustomEvent<FragmentSelected>) => { this._onFragmentSelected(index, event); }}></object-schema-viewer>` : null}
                            ${PrimitiveSchemaViewerComponent.CanRender(item, this.key) ? html`<primitive-schema-viewer .key=${this.key} .schema=${item} .required=${this.required} @FragmentSelected=${(event: CustomEvent<FragmentSelected>) => { this._onFragmentSelected(index, event); }}></primitive-schema-viewer>` : null}
                            ${RefSchemaViewerComponent.CanRender(item, this.key) ? html`<ref-schema-viewer .key=${this.key} .schema=${item} .required=${this.required} .collapse=${true} @FragmentSelected=${(event: CustomEvent<FragmentSelected>) => { this._onFragmentSelected(index, event); }}></ref-schema-viewer>` : null}
                        </li>
                    `)}
                </ul>
            </div>
        `;
    }

    @eventOptions({ passive: true })
    private _onClick() {
        const fragments = [{
            name: this.schema.title || this.key,
            key: this.key
        }];

        this.dispatchEvent(new CustomEvent<FragmentSelected>('FragmentSelected', { detail: fragments }));
    }

    @eventOptions({ passive: true })
    private _onFragmentSelected(index: number, event?: CustomEvent<FragmentSelected>) {
        const fragments = [{
            name: "oneOf",
            key: "oneOf",
            hidden: true
        }, {
            name: event?.detail[0].name,
            key: index.toString()
        }];

        this.dispatchEvent(new CustomEvent<FragmentSelected>('FragmentSelected', { detail: fragments }));
    }

    static override get styles(): CSSResult | CSSResultArray {
        return [
            resetCss,
            schemaViewerCss,
            css`
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

                bdo-truncate {
                    margin-bottom: var(--space-sm);
                }
            `
        ];
    }
}
