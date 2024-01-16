import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../architecture-button";

import styles from "../../shared/styles/reset";
import { ButtonType, Group } from "../models";

@customElement("architecture-group")
export class ArchitectureGroup extends LitElement {
    @property()
    buttonType!: ButtonType;

    @property({ type: Object })
    group!: Group;

    override render() {
        return html`
            ${this.groupTitleTemplate()}
            <div class="architecture-group-buttons">
                ${this.group.buttons.map((button) => html`<architecture-button .button=${button} .buttonType=${this.buttonType}></architecture-button>`)}
            </div>
        `;
    }

    groupTitleTemplate() {
        if(!this.group.link)
            return html`<h3>${this.group.title}</h3>`;

        return html`<h3><a .href=${this.group.link}>${this.group.title}</a></h3>`;
    }

    groupHeadingTemplate() {
        return this.group.title ? html`<h3><a href="#">${this.group.title}</a></h3>` : html``;
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
                h3, a {
                    color: var(--color-black);
                }
                h3 {
                    display: inline-block;
                    position: absolute;
                    top: 0;
                    left: var(--space-sm);
                    margin: 0;
                    padding: var(--space-xxs) var(--space-sm);
                    font-size: var(--font-size-sm);
                    background-color: var(--color-white);
                    border-radius: var(--radius-pill);
                    transform: translateY(-50%);
                    overflow: hidden;
                    text-transform: lowercase;
                }
                a {
                    display: block;
                    text-decoration: underline;
                }
                a:hover {
                    text-decoration: none;
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
