import path from "node:path";
import { css, CSSResult, CSSResultArray, html, LitElement } from "lit";
import { customElement, property, state, eventOptions } from "lit/decorators.js";

import resetCss from "../../../shared/styles/reset.css";
import schemaViewerCss from "../schema-viewer.css";

import { getActiveResolver, getResolver, parseRef } from "../../schema-resolver";

import { FragmentSelected } from "../../types";

import "../../../shared/alert";
import "../../../shared/button";
import { ArraySchemaViewerComponent } from "../array-schema-viewer";
import { OneOfSchemaViewerComponent } from "../one-of-schema-viewer";
import { ObjectSchemaViewerComponent } from "../object-schema-viewer";

export const tag = "ref-schema-viewer";

@customElement(tag)
export class RefSchemaViewerComponent extends LitElement {
    static CanRender(schema: any, _key: string) : boolean {
        return "$ref" in schema;
    }

    @property({ type: Boolean })
    required!: boolean;

    @property({ type: String })
    key!: string;

    @property({ type: Object })
    schema!: any;

    @state()
    private refSchema?: any;

    @state()
    private error?: Error;

    @property({ type: Boolean })
    collapse!: boolean;

    override render() {
        if(!RefSchemaViewerComponent.CanRender(this.schema, this.key)) {
            return;
        }

        if(this.error) {
            return html`
                <bdo-alert type="error">${this.error.message}</bdo-alert>
            `;
        }

        if(!this.refSchema) {
            return;
        }

        return html`
            <div class="item item--ref">
                ${ArraySchemaViewerComponent.CanRender(this.refSchema, this.key) ? html`<array-schema-viewer .key=${this.key} .schema=${this.refSchema} .required=${this.required} @FragmentSelected=${this._onFragmentSelected}></array-schema-viewer>` : null}
                ${ObjectSchemaViewerComponent.CanRender(this.refSchema, this.key) ? html`<object-schema-viewer .key=${this.key} .schema=${this.refSchema} .required=${this.required} .collapse=${this.collapse} @FragmentSelected=${this._onFragmentSelected}></object-schema-viewer>` : null}
                ${OneOfSchemaViewerComponent.CanRender(this.refSchema, this.key) ? html`<one-of-schema-viewer .key=${this.key} .schema=${this.refSchema} .required=${this.required} .collapse=${this.collapse} @FragmentSelected=${this._onFragmentSelected}></one-of-schema-viewer>` : null}
                ${RefSchemaViewerComponent.CanRender(this.refSchema, this.key) ? html`<ref-schema-viewer .key=${this.key} .schema=${this.refSchema} .required=${this.required} .collapse=${this.collapse} @FragmentSelected=${this._onFragmentSelected}></ref-schema-viewer>` : null}
            </div>
        `;
    }

    @eventOptions({ passive: true })
    private _onFragmentSelected(event: CustomEvent<FragmentSelected>) {
        this.dispatchEvent(new CustomEvent<FragmentSelected>('FragmentSelected', { detail: event.detail }));
    }

    override async update(changedProperties: Map<string, unknown>) {
        if (changedProperties.has("schema")) {
            try {
                const id = await getActiveResolver()!.getId();
                const ref = parseRef(path.resolve(path.dirname(id!), this.schema.$ref));
                const resolver = getResolver(ref.url!);
                const schema = await resolver.resolve(ref.parts);
                this.refSchema = schema;
            }
            catch (error: unknown) {
                this.error = error as Error;
            }
        }

        super.update(changedProperties);
    }

    static override get styles(): CSSResult | CSSResultArray {
        return [
            resetCss,
            schemaViewerCss,
            css`
                .item--ref {
                    display: flex;
                    flex-direction: column;
                    gap: var(--space-md);
                }
            `,
        ];
    }
}
