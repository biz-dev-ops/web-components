import { css, CSSResult, CSSResultArray, html, LitElement } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { customElement, property } from "lit/decorators.js";

import resetCss from "../../../shared/styles/reset.css";
import schemaViewerCss from "../schema-viewer.css";
import "../../../shared/popover";

import { parseMarkdown, titlelize } from "../../../shared/util";

const PRIMITIVE_TYPES = ["string", "number", "integer", "boolean"];
const SKIP_KEYS = ["description", "title", "type", "format"];

export const tag = "primitive-schema-viewer";

@customElement(tag)
export class PrimitiveSchemaViewerComponent extends LitElement {

    @property({ type: Boolean })
    required!: boolean;

    @property({ type: String })
    key!: string;

    @property({ type: Object })
    schema!: any;

    override render() {
        if (!PRIMITIVE_TYPES.includes(this.schema.type)) {
            return;
        }

        return html`
            <div class="item item--value">
                <h3>
                    <span class="txt--property">
                        ${titlelize(this.schema.title || this.key)}
                        ${this.required ? html`<span class="txt--required">*</span>` : ``}
                    </span>
                    ${this.schema.description ?
                        html`
                            <bdo-popover>
                                ${unsafeHTML(parseMarkdown(this.schema.description.trim()))}
                            </bdo-popover>
                        ` : null
                    }
                    <span class="icon--type">
                        ${this.schema.type}${this.schema.format ? html`: <em>${this.schema.format}</em>` : ''}
                    </span>
                </h3>

                ${Object.keys(this.schema).map(key => {
                    if (SKIP_KEYS.includes(key)) {
                        return;
                    }
                    const property = this.schema[key];
                    return html`
                        <dt>${key}</dt>
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
