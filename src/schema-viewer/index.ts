import path from "path";
import { CSSResult, CSSResultArray, html, LitElement } from "lit";
import { customElement, eventOptions, property, state } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import markdownFactory from "../markdown-viewer/markdown-it";
const md = markdownFactory();
import resetCss from "../shared/styles/reset.css";
import schemaViewerCss from "./schema-viewer.css";

import { FragmentIndexSelected, Fragment, FragmentSelected } from "./types";

import { ArraySchemaViewerComponent } from "./components/array-schema-viewer";
import { ObjectSchemaViewerComponent } from "./components/object-schema-viewer";
import { PrimitiveSchemaViewerComponent } from "./components/primitive-schema-viewer";
import { XOfSchemaViewerComponent } from "./components/x-of-schema-viewer";
import "../shared/alert";
import "./components/schema-navigation";
import { fetchAndValidateSchema } from "../shared/fetch";
import { Schema } from "../shared/fetch/schema";

export const tag = "schema-viewer";

@customElement(tag)
export class SchemaViewerComponent extends LitElement {
    @state()
    private fragments: Fragment[] = [];

    private schema?: Schema;

    @state()
    private error?: Error;

    @property({ type: String })
    src!: string;

    override render() {
        if (this.error) {
            return html`<bdo-alert type="error">${unsafeHTML(md.render(this.error.message))}</bdo-alert>`;
        }

        if(!this.schema) {
            return;
        }

        const key = this.fragments.at(-1)!.key;
        const path = this.fragments.map(f => f.key);
        const schema = this.schema?.resolveSchema(path);
        const required = key ? schema.required?.includes(key) : false;

        return html`
            <schema-navigation .fragments=${this.fragments} @FragmentIndexSelected=${this._onFragmentIndexSelected}></schema-navigation>

            ${ArraySchemaViewerComponent.CanRender(schema) ? html`<array-schema-viewer .path=${path} .schema=${this.schema} .required=${required} @FragmentSelected=${this._onFragmentSelected}></array-schema-viewer>` : null}
            ${ObjectSchemaViewerComponent.CanRender(schema) ? html`<object-schema-viewer .path=${path} .schema=${this.schema} .required=${required} .collapse=${false} @FragmentSelected=${this._onFragmentSelected}></object-schema-viewer>` : null}
            ${PrimitiveSchemaViewerComponent.CanRender(schema) ? html`<primitive-schema-viewer .path=${path} .schema=${this.schema} .required=${required} @FragmentSelected=${this._onFragmentSelected}></primitive-schema-viewer>` : null}
            ${XOfSchemaViewerComponent.CanRender(schema) ? html`<x-of-schema-viewer .path=${path} .schema=${this.schema} .required=${required} .collapse=${false} @FragmentSelected=${this._onFragmentSelected}></x-of-schema-viewer>` : null}
        `;
    }

    @eventOptions({ passive: true })
    private async _onFragmentSelected(event: CustomEvent<FragmentSelected>) {
        const fragments =  Array.isArray(event.detail) ? event.detail : [event.detail]
        await this._setFragments([...this.fragments, ...fragments]);
    }

    @eventOptions({ passive: true })
    private async _onFragmentIndexSelected(event: CustomEvent<FragmentIndexSelected>) {
        const fragments = this.fragments.slice(0, event.detail.index + 1);
        await this._setFragments(fragments);
    }

    private async _setFragments(fragment: Fragment[]) {
        this.fragments = fragment;
    }

    override async update(changedProperties: Map<string, unknown>) {
        if (changedProperties.has("src")) {
            try {
                const schema = await fetchAndValidateSchema(this.src);
                this.schema = schema;
                this.fragments = [{ name: getSchemaTitle(schema.resolveSchema("")), key: "" }];
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
            schemaViewerCss
        ];
    }
}

function getSchemaTitle(schema: any): string {
    const uri = schema.$id;
    return schema.title ?? path.basename(uri).split(".")[0];;
}

