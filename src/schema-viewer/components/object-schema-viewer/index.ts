import { css, CSSResult, CSSResultArray, html, LitElement } from "lit";
import { customElement, eventOptions, property } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import { parseMarkdown, titlelize } from "../../../shared/util";

import resetCss from "../../../shared/styles/reset.css";
import schemaViewerCss from "../schema-viewer.css";

import { FragmentSelected } from "../../types";

import { ArraySchemaViewerComponent } from "../array-schema-viewer";
import { XOfSchemaViewerComponent } from "../x-of-schema-viewer";
import { PrimitiveSchemaViewerComponent } from "../primitive-schema-viewer";
import { RefSchemaViewerComponent } from "../ref-schema-viewer";
import "../../../shared/button";
import "../../../shared/truncate";

export const tag = "object-schema-viewer";

@customElement(tag)
export class ObjectSchemaViewerComponent extends LitElement {
    static CanRender(schema: any, _key: string): boolean {
        return "type" in schema && schema.type === "object";
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
        if (!ObjectSchemaViewerComponent.CanRender(this.schema, this.key)) {
            return;
        }

        if(this.collapse) {
            return html`
                <div class="item item--object">
                    <bdo-button type="button" direction="right" @clicked=${this._onClick}>
                        <span class="txt--property">
                            ${titlelize(this.schema.title || this.key)}
                            ${this.required ? html`<span class="txt--required">*</span>` : ``}
                        </span>
                        ${this.schema.description ? html`<bdo-popover>${unsafeHTML(parseMarkdown(this.schema.description.trim()))}</bdo-popover>` : null }
                    </bdo-button>
                </div>
            `;
        }

        return html`
            <div class="item item--object">
                ${this.schema.description ? html`<bdo-truncate data-testid="description">${unsafeHTML(parseMarkdown(this.schema.description))}</bdo-truncate>` : null}
                <h3 data-testid="object-title">
                    <span class="txt--property">
                        ${titlelize(this.schema.title || this.key)}
                        ${this.required ? html`<span class="txt--required" data-testid="required-indicator">*</span>` : ``}
                    </span>
                </h3>
                <div class="items">
                    ${Object.keys(this.schema.properties || {}).map(key => {
                        const property = this.schema.properties[key];
                        const required = this.schema.required?.includes(key);

                        return html`
                            ${ArraySchemaViewerComponent.CanRender(property, key) ? html`<array-schema-viewer .src=${this.src} .key=${key} .schema=${property} .required=${required} @FragmentSelected=${this._onItemSelected} data-testid="property"></array-schema-viewer>` : null}
                            ${ObjectSchemaViewerComponent.CanRender(property, key) ? html`<object-schema-viewer .src=${this.src} .key=${key} .schema=${property} .required=${required} .collapse=${true} @FragmentSelected=${this._onItemSelected} data-testid="nested-object"></object-schema-viewer>` : null}
                            ${XOfSchemaViewerComponent.CanRender(property, key) ? html`<x-of-schema-viewer .src=${this.src} .key=${key} .schema=${property} .required=${required} .collapse=${true} @FragmentSelected=${this._onItemSelected} data-testid="property"></x-of-schema-viewer>` : null}
                            ${PrimitiveSchemaViewerComponent.CanRender(property, key) ? html`<primitive-schema-viewer .src=${this.src} .key=${key} .schema=${property} .required=${required} @FragmentSelected=${this._onItemSelected} data-testid="property"></primitive-schema-viewer>` : null}
                            ${RefSchemaViewerComponent.CanRender(property, key) ? html`<ref-schema-viewer .src=${this.src} .key=${key} .schema=${property} .required=${required} .collapse=${true} @FragmentSelected=${this._onItemSelected} data-testid="property"></ref-schema-viewer>` : null}
                        `;
                    })}
                </div>
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
            schemaViewerCss,
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
