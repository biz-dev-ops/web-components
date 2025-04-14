import { CSSResult, CSSResultArray, html, LitElement } from "lit";
import { customElement, eventOptions, property } from "lit/decorators.js";

import { titlelize } from "../../../shared/util";

import schemaViewerCss from "../schema-viewer.css";
import resetCss from "../../../shared/styles/reset.css";
import "../../../shared/button";
import { FragmentSelected } from "../../types";

export const tag = "one-of-schema-viewer";

@customElement(tag)
export class OneOfSchemaViewerComponent extends LitElement {
    static CanRender(schema: any, _key: string) : boolean {
        return "oneOf" in schema;
    }

    @property({ type: Boolean })
    required!: boolean;

    @property({ type: String })
    key!: string;

    @property({ type: Object })
    schema!: any;

    override render() {
        if(!OneOfSchemaViewerComponent.CanRender(this.schema, this.key)) {
            return;
        }

        return html`
            <div class="item item--object">
                <bdo-button type="button" direction="right" @clicked=${this._onClick}>
                    <span class="txt--property">
                        ${titlelize(this.schema.title || this.key)}
                        ${this.required ? html`<span class="txt--required">*</span>` : ``}
                    </span>
                </bdo-button>
            </div>
        `;
    }

    @eventOptions({ passive: true })
    private _onClick() {
        const fragments = [{
            name: this.schema.title || this.key,
            key: this.key,
            disabled: true
         }, {
            name: "oneOf",
            key: "oneOf"
         }];

        this.dispatchEvent(new CustomEvent<FragmentSelected>('FragmentSelected', { detail: fragments }));
    }

    static override get styles(): CSSResult | CSSResultArray {
        return [
            resetCss,
            schemaViewerCss
        ];
    }
}
