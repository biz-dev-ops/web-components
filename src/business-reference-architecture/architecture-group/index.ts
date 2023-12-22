import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Group as GroupType, Button } from "../models";
import "../architecture-button";

import styles from "../../shared/styles/reset";

@customElement("architecture-group")
export class ArchitectureGroup extends LitElement {
    @property({ type: Object })
    group!: GroupType;

    override render() {
        const buttons = this.group.items as Button[];
        const buttonStyle = this.group.buttonStyle;

        if (buttonStyle) {
            buttons.forEach((button) => {
                if (!button.style) {
                    button.style = buttonStyle;
                }
            });
        }

        return html`
                ${this.group.title ? html`<h3><a href="#">${this.group.title}</a></h3>` : ""}
                <div class="architecture-group-buttons">
                    ${this.group.items.map((button) => html`<architecture-button .button=${button}></architecture-button>`)}
                </div>
        `;
    }

    static override get styles() {
        return [
            styles,
            css`
                :host {
                    padding: var(--space-md) var(--space-sm) var(--space-sm);
                    width: 100%;
                    border: 3px solid var(--color-brand-a20);
                    border-radius: var(--radius-base);
                    position: relative;
                }
                h3 {
                    display: inline-block;
                    position: absolute;
                    top: 0;
                    left: var(--space-sm);
                    margin: 0;
                    font-size: var(--font-size-sm);
                    background-color: var(--color-white);
                    border-radius: var(--radius-pill);
                    transform: translateY(-50%);
                    overflow: hidden;
                }
                h3 a {
                    display: block;
                    padding: var(--space-xxs) var(--space-sm);
                    color: var(--color-black);
                    text-decoration: none;
                }
                h3 a:hover {
                    text-decoration: underline;
                }
                .architecture-group-buttons {
                    display: flex;
                    flex-wrap: wrap;
                    gap: var(--space-xs);
                }
            `,
        ];
    }
}
