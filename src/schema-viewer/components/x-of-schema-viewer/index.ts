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

export const tag = "x-of-schema-viewer";

@customElement(tag)
export class XOfSchemaViewerComponent extends LitElement {
    static CanRender(schema: any, _key: string): boolean {
        return "oneOf" in schema || "anyOf" in schema || "allOf" in schema;
    }

    @property({ type: Boolean })
    required!: boolean;

    @property({ type: String })
    key!: string;

    @property({ type: Object })
    schema!: any;

    @property({ type: Boolean })
    collapse!: boolean;

    @property({ type: String })
    src!: string;

    override render() {
        if (!XOfSchemaViewerComponent.CanRender(this.schema, this.key)) {
            return;
        }

        const type = this.getType();

        if (this.collapse) {
            return html`
                <div class="item item--object item--${type.key}">
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
            <div class="item item--${type.key}">
                ${this.schema.description ? html`<bdo-truncate>${unsafeHTML(parseMarkdown(this.schema.description))}</bdo-truncate>` : null}
                <h3>${titlelize(type.name)}</h3>
                <ul class="list--${type.key}">
                    ${this.schema[type.key].map((item: any, index: number) => html`
                        <li>
                            ${ArraySchemaViewerComponent.CanRender(item, this.key) ? html`<array-schema-viewer .src=${this.src} .key=${this.key} .schema=${item} .required=${this.required} @FragmentSelected=${(event: CustomEvent<FragmentSelected>) => { this._onFragmentSelected(index, type, event); }}></array-schema-viewer>` : null}
                            ${ObjectSchemaViewerComponent.CanRender(item, this.key) ? html`<object-schema-viewer .src=${this.src} .key=${this.key} .schema=${item} .required=${this.required} .collapse=${true} @FragmentSelected=${(event: CustomEvent<FragmentSelected>) => { this._onFragmentSelected(index, type, event); }}></object-schema-viewer>` : null}
                            ${PrimitiveSchemaViewerComponent.CanRender(item, this.key) ? html`<primitive-schema-viewer .src=${this.src} .key=${this.key} .schema=${item} .required=${this.required} @FragmentSelected=${(event: CustomEvent<FragmentSelected>) => { this._onFragmentSelected(index, type, event); }}></primitive-schema-viewer>` : null}
                            ${RefSchemaViewerComponent.CanRender(item, this.key) ? html`<ref-schema-viewer .src=${this.src} .key=${this.key} .schema=${item} .required=${this.required} .collapse=${true} @FragmentSelected=${(event: CustomEvent<FragmentSelected>) => { this._onFragmentSelected(index, type, event); }}></ref-schema-viewer>` : null}
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
    private _onFragmentSelected(index: number, type: { name: string, key: string }, event?: CustomEvent<FragmentSelected>) {
        const fragments = [{
            name: type.name,
            key: type.key,
            hidden: true
        }, {
            name: event?.detail[0].name,
            key: index.toString()
        }];

        this.dispatchEvent(new CustomEvent<FragmentSelected>('FragmentSelected', { detail: fragments }));
    }

    private getType() {
        if("oneOf" in this.schema) {
            return { name: "one of", key: "oneOf" };
        }

        if("anyOf" in this.schema) {
            return { name: "any of", key: "anyOf" };
        }
        return { name: "all of", key: "allOf" };
    }

    static override get styles(): CSSResult | CSSResultArray {
        return [
            resetCss,
            schemaViewerCss,
            css`
                .list--oneOf,
                .list--anyOf,
                .list--allOf {
                    list-style: none;
                    padding-inline-start: 0;
                    display: flex;
                    flex-direction: column;
                    row-gap: var(--space-xxs);
                }

                .list--oneOf li,
                .list--anyOf li,
                .list--allOf li {
                    display: flex;
                    flex-direction: column;
                    position: relative;
                    row-gap: var(--space-xxs);
                }

                .list--oneOf li:not(:last-child)::after,
                .list--anyOf li:not(:last-child)::after,
                .list--allOf li:not(:last-child)::after {
                    font-size: var(--font-size-xs);
                    text-align: center;
                    display: block;
                    color: var(--color-black-a40);
                    font-weight: 600;
                }

                .list--oneOf li:not(:last-child)::after,
                .list--anyOf li:not(:last-child)::after {
                    content: "or";
                }

                .list--allOf li:not(:last-child)::after {
                    content: "and";
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
