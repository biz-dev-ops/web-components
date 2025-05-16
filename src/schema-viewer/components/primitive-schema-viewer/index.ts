import { css, CSSResult, CSSResultArray, html, LitElement } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { customElement, property } from "lit/decorators.js";

import resetCss from "../../../shared/styles/reset.css";
import schemaViewerSharedCss from "../shared.css";
import "../../../shared/popover";

import { parseMarkdown, titlelize } from "../../../shared/util";
import { Schema } from "../../../shared/fetch/schema";
import typographyCss from "../../../shared/styles/typography.css";
const PRIMITIVE_TYPES = ["string", "number", "integer", "boolean"];
const SKIP_KEYS = ["description", "title", "type", "format"];

export const tag = "primitive-schema-viewer";

@customElement(tag)
export class PrimitiveSchemaViewerComponent extends LitElement {
    static CanRender(schema: any) : boolean {
        return PRIMITIVE_TYPES.includes(schema.type);
    }

    @property({ type: Boolean })
    required!: boolean;

    @property({ type: Array })
    path!: string[];

    @property({ type: Object })
    schema!: Schema;

    @property({ type: String })
    src!: string;

    override render() {
        const key = this.path.at(-1)!;
        const schema = this.schema.resolveSchema(this.path);

        if (!PrimitiveSchemaViewerComponent.CanRender(schema)) {
            return;
        }

        return html`
            <div class="item item--value">
                <h3 data-testid="primitive-title">
                    <span class="txt--property">
                        ${titlelize(schema.title || key)}
                        ${this.required ? html`<span class="txt--required" data-testid="required-indicator">*</span>` : ``}
                    </span>
                    ${schema.description ? html`<bdo-popover data-testid="description">${unsafeHTML(parseMarkdown(schema.description.trim()))}</bdo-popover>` : null }
                    <span class="badge--type" data-testid="type-indicator">
                        ${schema.type}${schema.format ? html`: <em>${schema.format}</em>` : ''}
                    </span>
                </h3>

                <dl>
                ${Object.keys(schema).map(key => {
                    if (SKIP_KEYS.includes(key)) {
                        return;
                    }
                    const property = schema[key];
                    return html`
                        <dt data-testid="additional-property">${key}</dt>
                        ${Array.isArray(property) ?
                            html`
                                ${property.map(item => html`<dd>${item}</dd>`)}
                            `
                            : html`<dd>${property}</dd>`
                        }
                    `;
                })}
                </dl>
            </div>
        `;
    }

    static override get styles(): CSSResult | CSSResultArray {
        return [
            resetCss,
            typographyCss,
            schemaViewerSharedCss,
            css`
                dl {
                    font-size: var(--font-size-sm);
                }
                
                dt {
                    color: rgba(0 0 0 / 50%);
                    font-weight: 600;
                }

                dd {
                    margin-inline-start: 0;
                    white-space: pre-wrap;
                }

                dd + dt {
                    margin-block-start: 1em;
                }

                .item--value {
                    background-color: var(--color-black-a05);
                    border-radius: var(--radius-half);
                    padding: var(--space-sm);
                }
            `
        ];
    }
}
