import { css, CSSResult, CSSResultArray, html, LitElement } from "lit";
import { customElement, eventOptions, property } from "lit/decorators.js";

import resetCss from "../../../shared/styles/reset.css";
import "../../../shared/popover";
import "../../../shared/button";

import { titlelize } from "../../../shared/util";
import { FragmentIndexSelected, Fragment } from "../../types";
import schemaViewerCss from "../schema-viewer.css";

export const tag = "schema-navigation";

@customElement(tag)
export class SchemaNavigation extends LitElement {

    @property({ type: Array })
    fragments!: Fragment[];

    override render() {
        return html`
            <nav>
                <ol class="list--path">
                    ${
                        this.fragments
                            .map((fragment, index) => {
                                // if(fragment.hidden) {
                                //     return;
                                // }

                                const name = html`<span class="txt--property">${titlelize(fragment.name)}</span>`;

                                if(fragment.disabled || index === this.fragments.length - 1) {
                                    return html`<li>${name}</li>`;
                                }
                                else {
                                    return html`
                                        <li>
                                            <bdo-button class="button--path" @clicked="${() => { this._onClick(index); }}">
                                                ${name}
                                            </bdo-button>
                                        </li>
                                    `;
                                }
                            })
                        }
                </ol>
            </nav>
        `;
    }

    @eventOptions({ passive: true })
    private _onClick(index: number) {
        this.dispatchEvent(new CustomEvent<FragmentIndexSelected>('FragmentIndexSelected', { detail: { index } }));
    }

    static override get styles(): CSSResult | CSSResultArray {
        return [
            resetCss,
            schemaViewerCss,
            css`
                .list--path {
                    --button-padding: var(--space-xs);

                    align-items: center;
                    display: flex;
                    flex-wrap: wrap;
                    gap: var(--space-xs);
                    list-style: none;
                    margin: 0;
                    padding-inline-start: 0;
                }

                .list--path li {
                    display: flex;
                    column-gap: var(--space-xs);
                    align-items: center;
                }

                .list--path li:not(:last-child, .oneof, .no-title)::after {
                    content: ' /';
                }

                .list--path li.oneof:not(.no-title) .txt--property::after {
                    content: ':';
                }

                .list--path li.oneof + .object button {
                    margin-inline-start: calc(var(--space-xxs) * -1);
                }

                .list--path button {
                    padding: var(--space-xs);
                }

                .list--path li > span {
                    padding-block: calc(var(--line-base) + var(--button-padding));
                }
            `
        ];
    }
}
