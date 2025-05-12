import { css, CSSResult, CSSResultArray, html, LitElement } from "lit";
import { customElement, eventOptions, property } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import { parseMarkdown, titlelize } from "../../../shared/util";

import resetCss from "../../../shared/styles/reset.css";
import schemaViewerSharedCss from "../shared.css";

import { FragmentSelected } from "../../types";
import { Schema } from "../../../shared/fetch/schema";

import { ArraySchemaViewerComponent } from "../array-schema-viewer";
import { XOfSchemaViewerComponent } from "../x-of-schema-viewer";
import { PrimitiveSchemaViewerComponent } from "../primitive-schema-viewer";
import "../../../shared/button";
import "../../../shared/truncate";
import typographyCss from "../../../shared/styles/typography.css";
export const tag = "object-schema-viewer";

@customElement(tag)
export class ObjectSchemaViewerComponent extends LitElement {
    static CanRender(schema: any): boolean {
        return "type" in schema && schema.type === "object";
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

        if (!ObjectSchemaViewerComponent.CanRender(schema)) {
            return;
        }

        if(this.collapse) {
            return html`
                <div class="item item--object">
                    <bdo-button type="button" direction="right" @clicked=${() => { this._onClick(schema, key); }}>
                        <span class="txt--property">
                            ${titlelize(schema.title || key)}
                            ${this.required ? html`<span class="txt--required">*</span>` : ``}
                        </span>
                        ${schema.description ? html`<bdo-popover>${unsafeHTML(parseMarkdown(schema.description.trim()))}</bdo-popover>` : null }
                    </bdo-button>
                </div>
            `;
        }

        return html`
            <div class="item item--object">
                ${schema.description ? html`<bdo-truncate data-testid="description">${unsafeHTML(parseMarkdown(schema.description))}</bdo-truncate>` : null}
                <div class="items">
                    ${Object.keys(schema.properties || {}).map(key => {
                        const path = [...this.path, "properties", key];
                        const property = this.schema.resolveSchema(path);
                        const required = schema.required?.includes(key);

                        return html`
                            ${ArraySchemaViewerComponent.CanRender(property) ? html`<array-schema-viewer .path=${path} .schema=${this.schema} .required=${required} @FragmentSelected=${this._onItemSelected} data-testid="property"></array-schema-viewer>` : null}
                            ${ObjectSchemaViewerComponent.CanRender(property) ? html`<object-schema-viewer .path=${path} .schema=${this.schema} .required=${required} .collapse=${true} @FragmentSelected=${this._onItemSelected} data-testid="nested-object"></object-schema-viewer>` : null}
                            ${XOfSchemaViewerComponent.CanRender(property) ? html`<x-of-schema-viewer .path=${path} .schema=${this.schema} .required=${required} .collapse=${true} @FragmentSelected=${this._onItemSelected} data-testid="property"></x-of-schema-viewer>` : null}
                            ${PrimitiveSchemaViewerComponent.CanRender(property) ? html`<primitive-schema-viewer .path=${path} .schema=${this.schema} .required=${required} @FragmentSelected=${this._onItemSelected} data-testid="property"></primitive-schema-viewer>` : null}
                        `;
                    })}
                </div>
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
    private _onItemSelected(event: CustomEvent<FragmentSelected>) {
        const fragments = [{
            name: "properties",
            key: "properties",
            hidden: true,
            disabled: true
         }, ...(Array.isArray(event.detail) ? event.detail : [event.detail])];

        this.dispatchEvent(new CustomEvent<FragmentSelected>('FragmentSelected', { detail: fragments }));
    }

    static override get styles(): CSSResult | CSSResultArray {
        return [
            resetCss,
            typographyCss,
            schemaViewerSharedCss,
            css`
                .items {
                    display: flex;
                    flex-direction: column;
                    gap: var(--space-md);
                }

                bdo-truncate {
                    margin-bottom: var(--space-sm);
                }
            `,
        ];
    }
}
