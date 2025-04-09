import { CSSResult, CSSResultArray, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import markdownFactory from "../markdown-viewer/markdown-it";
const md = markdownFactory();
import resetCss from "../shared/styles/reset.css";
import jsonSchemaViewerCss from "./json-schema-viewer.css";

import "../shared/alert";
import { fetchAndValidateSchema } from "../shared/fetch";
import path from "path";

export const tag = "json-schema-viewer";

@customElement(tag)
export class JsonSchemaViewerComponent extends LitElement {

    @property({ type: String })
    src?: string;

    @state()
    private schema?: Record<string, unknown>;

    @state()
    private path?: string;

    @state()
    private error?: Error;

    override render() {
        if (this.error) {
            return html`<bdo-alert type="error">${unsafeHTML(md.render(this.error.message))}</bdo-alert>`;
        }

        return html`
            <div>
                <h1>JSON Schema Viewer</h1>
            </div>
        `;
    }

    override async update(changedProperties: Map<string, unknown>) {
        if (changedProperties.has("src")) {
            try {
                const schema = await fetchAndValidateSchema(path.resolve(this.src!));
                this.schema = schema;
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
            jsonSchemaViewerCss
        ];
    }
}
