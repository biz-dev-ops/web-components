
import path from "node:path";
import { CSSResult, CSSResultArray, html, LitElement } from "lit";
import { customElement, eventOptions, property, state } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import markdownFactory from "../markdown-viewer/markdown-it";
const md = markdownFactory();
import resetCss from "../shared/styles/reset.css";
import schemaViewerCss from "./schema-viewer.css";

import { getResolver, parseRef } from "./schema-resolver";
import { FragmentIndexSelected, Fragment, FragmentSelected } from "./types";

import { ArraySchemaViewerComponent } from "./components/array-schema-viewer";
import { ObjectSchemaViewerComponent } from "./components/object-schema-viewer";
import { PrimitiveSchemaViewerComponent } from "./components/primitive-schema-viewer";
import { RefSchemaViewerComponent } from "./components/ref-schema-viewer";
import { XOfSchemaViewerComponent } from "./components/x-of-schema-viewer";
import "../shared/alert";
import "./components/schema-navigation";

export const tag = "schema-viewer";

@customElement(tag)
export class SchemaViewerComponent extends LitElement {
    private fragments: Fragment[] = [];

    @state()
    private schema?: any;

    @state()
    private error?: Error;

    @property({ type: String })
    src!: string;

    override render() {
        if (this.error) {
            return html`<bdo-alert type="error">${unsafeHTML(md.render(this.error.message))}</bdo-alert>`;
        }

        const key = this.fragments.at(-1)!.key;
        const required = key ? this.schema.required?.includes(key) : false;

        return html`
            <schema-navigation .fragments=${this.fragments} @FragmentIndexSelected=${this._onFragmentIndexSelected}></schema-navigation>

            ${ArraySchemaViewerComponent.CanRender(this.schema, key) ? html`<array-schema-viewer .src=${this.src} .key=${key} .schema=${this.schema} .required=${required} @FragmentSelected=${this._onFragmentSelected}></array-schema-viewer>` : null}
            ${ObjectSchemaViewerComponent.CanRender(this.schema, key) ? html`<object-schema-viewer .src=${this.src} .key=${key} .schema=${this.schema} .required=${required} .collapse=${false} @FragmentSelected=${this._onFragmentSelected}></object-schema-viewer>` : null}
            ${PrimitiveSchemaViewerComponent.CanRender(this.schema, key) ? html`<primitive-schema-viewer .src=${this.src} .key=${key} .schema=${this.schema} .required=${required} @FragmentSelected=${this._onFragmentSelected}></primitive-schema-viewer>` : null}
            ${RefSchemaViewerComponent.CanRender(this.schema, key) ? html`<ref-schema-viewer .src=${this.src} .key=${key} .schema=${this.schema} .required=${required} .collapse=${false} @FragmentSelected=${this._onFragmentSelected}></ref-schema-viewer>` : null}
            ${XOfSchemaViewerComponent.CanRender(this.schema, key) ? html`<x-of-schema-viewer .src=${this.src} .key=${key} .schema=${this.schema} .required=${required} .collapse=${false} @FragmentSelected=${this._onFragmentSelected}></x-of-schema-viewer>` : null}
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
        this.schema = await getResolver(this.src!).resolve(this.fragments.map(f => f.key));
    }

    override async update(changedProperties: Map<string, unknown>) {
        if (changedProperties.has("src")) {
            try {
                const { name, ref, schema } = await SchemaViewerComponent.getSchema(this.src!);
                this.fragments = [{ name, key: "" }];
                this.src = ref.url!;
                this.schema = schema;
            }
            catch (error: unknown) {
                this.error = error as Error;
            }
        }

        super.update(changedProperties);
    }

    private static async getSchema(src: string) {
        if (src.startsWith(".")) {
            src = path.resolve(src);
        }
        const ref = parseRef(src);
        const resolver = getResolver(ref.url!);
        const schema = await resolver.resolve(ref.parts);
        const name = schema?.title ?? path.basename(ref.url!).split(".")[0];
        return { name, ref, schema };
    }

    static override get styles(): CSSResult | CSSResultArray {
        return [
            resetCss,
            schemaViewerCss
        ];
    }
}
