import { css, CSSResult, CSSResultArray, html, LitElement } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { customElement, property } from "lit/decorators.js";

import resetCss from "../../../shared/styles/reset.css";
import schemaViewerCss from "../schema-viewer.css";
import "../../../shared/popover";

import { parseMarkdown, titlelize } from "../../../shared/util";
import { Schema } from "../../../shared/fetch/schema";
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
                    <span class="icon--type" data-testid="type-indicator">
                        ${schema.type}${schema.format ? html`: <em>${schema.format}</em>` : ''}
                    </span>
                </h3>

                ${Object.keys(schema).map(key => {
                    if (SKIP_KEYS.includes(key)) {
                        return;
                    }
                    const property = schema[key];
                    return html`
                        <dt data-testid="additional-property">${key}</dt>
                        ${Array.isArray(property) ?
                            html`
                                <ul>
                                    ${property.map(item => html`<li>${item}</li>`)}
                                </ul>
                            `
                            : html`<dd>${property}</dd>`
                        }
                    `;
                })}
            </div>
        `;
    }

    static override get styles(): CSSResult | CSSResultArray {
        return [
            resetCss,
            schemaViewerCss,
            css`
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

                .icon--type {
                    margin-inline-start: auto;
                    font-size: var(--font-size-xs);
                    background-color: var(--surface-main);
                    border-radius: var(--radius-pill);
                    align-self: center;
                    padding: var(--space-xxs) var(--space-xs);
                }

                .icon--type em {
                    font-style: normal;
                    font-weight: 400;
                }
            `
        ];
    }
}
