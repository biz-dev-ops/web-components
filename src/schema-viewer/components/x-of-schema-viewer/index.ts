import { css, CSSResult, CSSResultArray, html, LitElement } from "lit";
import { customElement, eventOptions, property } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import { parseMarkdown, titlelize } from "../../../shared/util";

import schemaViewerCss from "../schema-viewer.css";
import resetCss from "../../../shared/styles/reset.css";

import { FragmentSelected } from "../../types";
import { Schema } from "../../../shared/fetch";

import { ArraySchemaViewerComponent } from "../array-schema-viewer";
import { ObjectSchemaViewerComponent } from "../object-schema-viewer";
import { PrimitiveSchemaViewerComponent } from "../primitive-schema-viewer";
import "../../../shared/button";

export const tag = "x-of-schema-viewer";

@customElement(tag)
export class XOfSchemaViewerComponent extends LitElement {
    static CanRender(schema: any): boolean {
        return "oneOf" in schema || "anyOf" in schema || "allOf" in schema;
    }

    @property({ type: Boolean })
    required!: boolean;

    @property({ type: Array })
    path!: string[];

    @property({ type: Object })
    schema!: Schema;

    @property({ type: Boolean })
    collapse!: boolean;

    override render() {
        const key = this.path.at(-1)!;
        const schema = this.schema.resolveSchema(this.path);
        const type = this.getType(schema);

        if (!XOfSchemaViewerComponent.CanRender(schema)) {
            return;
        }

        if (this.collapse) {
            return html`
                <div class="item item--object item--${type.key}">
                    <bdo-button type="button" direction="right" @clicked=${() => { this._onClick(schema, key); }} data-testid="xof-item">
                        <span class="txt--property">
                            ${titlelize(schema.title || key)}
                            ${this.required ? html`<span class="txt--required" data-testid="required-indicator">*</span>` : ``}
                        </span>
                        ${schema.description ? html`<bdo-popover>${unsafeHTML(parseMarkdown(schema.description.trim()))}</bdo-popover>` : null}
                    </bdo-button>
                </div>
            `;
        }

        const items = schema[type.key].map((_item: any, index: number) => {
            const path = [...this.path, type.key, index.toString()];
            return { path, property: this.schema.resolveSchema(path) };
        });

        return html`
            <div class="item item--${type.key}">
                ${schema.description ? html`<bdo-truncate>${unsafeHTML(parseMarkdown(schema.description))}</bdo-truncate>` : null}
                <h3 data-testid="xof-title">${titlelize(type.name)}</h3>
                <ul class="list--${type.key}">
                    ${items
                        .map(({ path, property }, index:number) => html`
                        <li>
                            ${ArraySchemaViewerComponent.CanRender(property) ? html`<array-schema-viewer .path=${path} .schema=${this.schema} .required=${this.required} @FragmentSelected=${(event: CustomEvent<FragmentSelected>) => { this._onFragmentSelected(index, type, event); }} data-testid="xof-item"></array-schema-viewer>` : null}
                            ${ObjectSchemaViewerComponent.CanRender(property) ? html`<object-schema-viewer .path=${path} .schema=${this.schema} .required=${this.required} .collapse=${true} @FragmentSelected=${(event: CustomEvent<FragmentSelected>) => { this._onFragmentSelected(index, type, event); }} data-testid="xof-item"></object-schema-viewer>` : null}
                            ${PrimitiveSchemaViewerComponent.CanRender(property) ? html`<primitive-schema-viewer .path=${path} .schema=${this.schema} .required=${this.required} @FragmentSelected=${(event: CustomEvent<FragmentSelected>) => { this._onFragmentSelected(index, type, event); }} data-testid="xof-item"></primitive-schema-viewer>` : null}
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
            key: key
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

    private getType(schema: any) {
        if("oneOf" in schema) {
            return { name: "one of", key: "oneOf" };
        }

        if("anyOf" in schema) {
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
