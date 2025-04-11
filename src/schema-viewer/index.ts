import { CSSResult, CSSResultArray, html, LitElement, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import markdownFactory from "../markdown-viewer/markdown-it";
const md = markdownFactory();
import resetCss from "../shared/styles/reset.css";
import schemaViewerCss from "./schema-viewer.css";

import "../shared/alert";
import { fetchAndValidateSchema } from "../shared/fetch";
import path from "path";
import SchemaFactory from "./schema-factory";
export const tag = "schema-viewer";

@customElement(tag)
export class SchemaViewerComponent extends LitElement {
    private schemaFactory = new SchemaFactory();

    @property({ type: String })
    src?: string;

    private schema?: any;

    @state()
    private template?: TemplateResult[];

    @state()
    private error?: Error;

    override render() {
        if (this.error) {
            return html`<bdo-alert type="error">${unsafeHTML(md.render(this.error.message))}</bdo-alert>`;
        }

        return this.template;
    }

    override async update(changedProperties: Map<string, unknown>) {
        if (changedProperties.has("src")) {
            try {
                this.schema = await fetchAndValidateSchema(path.resolve(this.src!));
                const iterator = this.schemaFactory.build(this.schema);
                const results: TemplateResult[] = [];
                let result = await iterator.next();
                while (!result.done) {
                    results.push(result.value);
                    result = await iterator.next();
                }
                this.template = results;
                this.error = undefined;
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
