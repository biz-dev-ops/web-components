import { html, css, LitElement, TemplateResult, CSSResult } from "lit";
import { property } from "lit/decorators.js";
import { Button } from "../../models";

import resetCss from "../../../shared/styles/reset.css";
import "../../../shared/icon";

export abstract class AbstractArchitectureButton extends LitElement {
    @property({ type: Object })
    button!: Button;

    override render() {
        if (this.button.link) {
            return html`
                <a .href=${this.button.link}>
                    ${this.arrowBeforeTemplate()}
                    <span class="inner">
                        ${this.iconContainerTemplate()}
                        ${this.textTemplate()}
                    </span>
                    ${this.arrowAfterTemplate()}
                </a>
            `;
        }
        else {
            return html`
                <span>
                    ${this.arrowBeforeTemplate()}
                    <span class="inner">
                        ${this.iconContainerTemplate()}
                        ${this.textTemplate()}
                    </span>
                    ${this.arrowAfterTemplate()}
                </span>
            `;
        }
    }

    iconContainerTemplate() {
        if(!this.button.icon) {
            return html``;
        }

        return html`
            <span class="icon">
                ${this.iconTemplate()}
            </span>
        `;
    }

    protected iconTemplate() : TemplateResult {
        return html`<bdo-icon .icon="${this.button.icon}"></bdo-icon>`;
    }

    textTemplate() {
        return html`<span>${this.button.title}</span>`;
    }

    protected arrowBeforeTemplate() : TemplateResult {
        return html``;
    }

    protected arrowAfterTemplate(): TemplateResult {
        return html``;
    }

    static override get styles() : CSSResult[] {
        return [
            resetCss,
            css`
                :host > a, :host > span {
                    display: flex;
                    width: 100%;
                    font-size: var(--font-size-sm);
                    font-weight: 700;
                    transition: all 0.2s ease-in-out;
                    position: relative;
                }

                a {
                    text-decoration: underline;
                }

                a:hover {
                    text-decoration: none;
                }

                a .inner, span .inner {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: var(--space-xs);
                    line-height: 140%;
                }

                bdo-icon {
                    flex: none;
                    width: 1.5rem;
                    height: 1.5rem;
                    margin-top: -0.5rem; /* So text determines the button height */
                    margin-bottom: -0.5rem;
                    font-weight: 300;
                    font-size: 1.4rem;
                }
            `,
        ];
    }
}
