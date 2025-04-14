import { css, CSSResult, CSSResultArray, html, LitElement } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { customElement, eventOptions, property } from "lit/decorators.js";

import { parseMarkdown } from "../../../shared/util";

import resetCss from "../../../shared/styles/reset.css";
import schemaViewerCss from "../schema-viewer.css";
import "../array-schema-viewer";
import "../object-schema-viewer";
import "../one-of-schema-viewer";
import "../one-of-items-schema-viewer";
import "../primitive-schema-viewer";

import { FragmentSelected } from "../../types";
import { ArraySchemaViewerComponent } from "../array-schema-viewer";
import { ObjectSchemaViewerComponent } from "../object-schema-viewer";
import { OneOfSchemaViewerComponent } from "../one-of-schema-viewer";
import { OneOfItemsSchemaViewerComponent } from "../one-of-items-schema-viewer";
import { PrimitiveSchemaViewerComponent } from "../primitive-schema-viewer";

export const tag = "object-properties-schema-viewer";

@customElement(tag)
export class ObjectPropertiesSchemaViewerComponent extends LitElement {
    static CanRender(schema: any, _key: string) : boolean {
        return "properties" in schema;
    }

    @property({ type: Boolean })
    required!: boolean;

    @property({ type: String })
    key!: string;

    @property({ type: Object })
    schema!: any;

    override render() {
        if (!ObjectPropertiesSchemaViewerComponent.CanRender(this.schema, this.key)) {
            return;
        }

        return html`
            <div class="item item--object">
                ${this.schema.description ? html`${unsafeHTML(parseMarkdown(this.schema.description))}` : null}
                <div class="items">
                    ${Object.keys(this.schema.properties || {}).map(key => {
                        const property = this.schema.properties[key];
                        const required = this.schema.required.includes(key);

                        return html`
                            ${ArraySchemaViewerComponent.CanRender(property, key) ? html`<array-schema-viewer .key=${key} .schema=${property} .required=${required} @FragmentSelected=${this._onItemSelected}></array-schema-viewer>` : null}
                            ${ObjectSchemaViewerComponent.CanRender(property, key) ? html`<object-schema-viewer .key=${key} .schema=${property} .required=${required} @FragmentSelected=${this._onItemSelected}></object-schema-viewer>` : null}
                            ${OneOfSchemaViewerComponent.CanRender(property, key) ? html`<one-of-schema-viewer .key=${key} .schema=${property} .required=${required} @FragmentSelected=${this._onItemSelected}></one-of-schema-viewer>` : null}
                            ${OneOfItemsSchemaViewerComponent.CanRender(property, key) ? html`<one-of-items-schema-viewer .key=${key} .schema=${property} .required=${required} @FragmentSelected=${this._onItemSelected}></one-of-items-schema-viewer>` : null}
                            ${PrimitiveSchemaViewerComponent.CanRender(property, key) ? html`<primitive-schema-viewer .key=${key} .schema=${property} .required=${required}></primitive-schema-viewer>` : null}
                        `;
                    })}
                </div>
            </div>
        `;
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

                p {
                    white-space: pre-wrap;
                }
            `,
        ];
    }
}
