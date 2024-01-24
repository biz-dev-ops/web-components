import { html, css, LitElement, TemplateResult, CSSResult } from "lit";
import { property } from "lit/decorators.js";
import { Button, Color } from "../../models";

import styles from "../../../shared/styles/reset";

import "../../../shared/icon";

export abstract class AbstractArchitectureButton extends LitElement {
    @property({ type: Object })
    button!: Button;

    @property()
    color: Color = "brand";

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
            styles,
            css`
                :host > a, :host > span {
                    display: flex;
                    width: 100%;
                    font-size: var(--font-size-sm);
                    font-weight: 700;
                    transition: all 0.2s ease-in-out;
                    position: relative;
                }

                :host([color="none"]) > a,
                :host([color="none"]) > span {
                    padding: 0 var(--space-xs);
                    color: var(--text-color-base);
                }

                :host([color="none"]) bdo-icon {
                    padding: var(--space-xs);
                    flex: none;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    background-color: var(--color-brand-base);
                    color: var(--color-white);
                    border-radius: var(--radius-pill);
                    aspect-ratio: 1;
                }

                :host([color="brand"]) > a,
                :host([color="brand"]) > span {
                    padding: var(--space-xs) var(--space-sm);
                    background-color: var(--color-brand-base);
                    color: var(--color-white);
                    border-radius: var(--radius-pill);
                }

                :host([color="pop"]) > a,
                :host([color="pop"]) > span {
                    padding: var(--space-xs) var(--space-sm);
                    background-color: var(--color-brand-pop);
                    color: var(--color-white);
                    border-radius: var(--radius-pill);
                }

                :host([color="white"]) > a,
                :host([color="white"]) > span {
                    padding: var(--space-xs);
                    background-color: var(--color-white);
                    color: var(--text-color-base);
                    border-radius: var(--radius-base);
                }

                :host([color="white"]) > bdo-icon {
                    color: var(--color-brand-base)!important;
                }

                a {
                    text-decoration: underline;
                }

                a:hover {
                    text-decoration: none;
                }

                a .inner, 
                span .inner {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: var(--space-xs);
                    line-height: 140%;
                }

                a bdo-icon, 
                span bdo-icon {
                    flex: none;
                    width: 1.5rem;
                    height: 1.5rem;
                    margin-top: -0.5rem; /* So text determines the button height */
                    margin-bottom: -0.5rem;
                }
            `,
        ];
    }
}
