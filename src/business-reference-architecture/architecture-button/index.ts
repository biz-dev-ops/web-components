import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Button as ButtonType } from "../models";

import styles from "../../shared/styles/reset";

import "../architecture-icon";

@customElement("architecture-button")
export class ArchitectureButton extends LitElement {
    @property({ type: Object })
    button!: ButtonType;

    override render() {
        return html`
            <a href="${this.button.link}" class="architecture-button architecture-button-${this.button.style || 'default'}">
                ${this.button.icon ? html`<architecture-icon icon="${this.button.icon}" />` : ""}
                <span>${this.button.title}</span>
            </a>
        `;
    }

    static override get styles() {
        return [
            styles,
            css`
                a.architecture-button {
                    display: flex;
                    align-items: center;
                    gap: var(--space-xs);
                    font-size: var(--font-size-sm);
                    font-weight: 700;
                    text-decoration: none;
                    transition: all 0.2s ease-in-out;
                }
                a.architecture-button-default {
                    padding: 0 var(--space-xs);
                    color: var(--color-black);
                }
                a.architecture-button-white {
                    padding: var(--space-xs) var(--space-sm);
                    background-color: var(--color-white);
                    color: var(--color-black);
                    border-radius: var(--radius-base);
                }
                a.architecture-button-brand {
                    padding: var(--space-xs) var(--space-sm);
                    background-color: var(--color-brand-base);
                    color: var(--color-white);
                    border-radius: var(--radius-pill);
                }
                a.architecture-button-stream {
                    padding: var(--space-sm) var(--space-md);
                    color: var(--color-white);
                    background-color: var(--color-brand-base);
                    border-radius: var(--radius-half);
                }
                a architecture-icon {
                    flex: none;
                    width: 1.25rem;
                    height: 1.25rem;
                }
                a.architecture-button-default architecture-icon {
                    background-color: var(--color-brand-base);
                    border-radius: var(--radius-pill);
                    padding: var(--space-xs);
                    width: 2rem;
                    height: 2rem;
                }
                a.architecture-button-white architecture-icon {
                    color: var(--color-brand-base);
                }
            `,
        ];
    }
}
