import { CSSResult, CSSResultArray, html, LitElement } from "lit";
import { customElement, eventOptions, property } from "lit/decorators.js";

import { titlelize } from "../../../shared/util";

import resetCss from "../../../shared/styles/reset.css";
import schemaViewerCss from "../schema-viewer.css";
import "../../../shared/button";
import { FragmentSelected } from "../../types";

export const tag = "object-schema-viewer";

@customElement(tag)
export class ObjectSchemaViewerComponent extends LitElement {
    static CanRender(schema: any, _key: string) : boolean {
        return "type" in schema && schema.type === "object";
    }

    @property({ type: Boolean })
    required!: boolean;

    @property({ type: String })
    key!: string;

    @property({ type: Object })
    schema!: any;

    override render() {
        if(!ObjectSchemaViewerComponent.CanRender(this.schema, this.key)) {
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
        this.dispatchEvent(new CustomEvent<FragmentSelected>('FragmentSelected', { detail: { name: this.schema.title || this.key, key: this.key } }));
    }

    static override get styles(): CSSResult | CSSResultArray {
        return [
            resetCss,
            schemaViewerCss
        ];
    }
}
