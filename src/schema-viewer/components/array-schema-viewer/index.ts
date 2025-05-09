import { css, CSSResult, CSSResultArray, html, LitElement } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { customElement, eventOptions, property } from "lit/decorators.js";

import resetCss from "../../../shared/styles/reset.css";
import schemaViewerSharedCss from "../shared.css";
import arraySchemaViewerCss from "./array-schema-viewer.css";

import { parseMarkdown, titlelize } from "../../../shared/util";
import { FragmentSelected } from "../../types";


import "../../../shared/popover";
import "../../../shared/button";
import { Schema } from "../../../shared/fetch/schema";
import typographyCss from "../../../shared/styles/typography.css";

export const tag = "array-schema-viewer";

@customElement(tag)
export class ArraySchemaViewerComponent extends LitElement {
    static CanRender(schema: any) : boolean {
        return "type" in schema && schema.type === "array";
    }

    @property({ type: Boolean })
    required!: boolean;

    @property({ type: Array })
    path!: string[];

    @property({ type: Object })
    schema!: Schema;

    override render() {
        const key = this.path.at(-1)!;
        const schema = this.schema.resolveSchema(this.path);
        const name = titlelize(schema.items.title || "item");

        if(!ArraySchemaViewerComponent.CanRender(schema)) {
            return;
        }

        return html`
            <div class="item item--array">
                <div class="item--header">
                    <h3 data-testid="array-title">
                        <span class="txt--property">
                            ${titlelize(schema.title || key)} ${this.required ? html`<span class="txt--required" data-testid="required-indicator">*</span>` : ``}
                        </span>
                    </h3>

                    ${schema.description ? html`${unsafeHTML(parseMarkdown(schema.description.trim()))}` : null }
                </div>

                <div class="item--main">
                    <div class="item--fadeout">
                        <ul class="list--array">
                            ${[...Array(2).keys()].map((_, index) => html`
                                <li>
                                    <bdo-button direction="right" ?disabled="${index > 0}" @clicked=${() => { this._onClick(schema, key); }} data-testid="array-item">
                                        <span class="txt--property">${name}</span>
                                    </bdo-button>
                                </li>
                            `)}
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }

    @eventOptions({ passive: true })
    private _onClick(schema: any, key: string) {
        const fragments = [{
            name: schema.title || key,
            key: key,
            disabled: true
         }, {
            name: schema.items.title || "item",
            key: "items",
         }];

        this.dispatchEvent(new CustomEvent<FragmentSelected>('FragmentSelected', { detail: fragments }));
    }

    static override get styles(): CSSResult | CSSResultArray {
        return [
            resetCss,
            typographyCss,
            schemaViewerSharedCss,
            arraySchemaViewerCss
        ];
    }
}
