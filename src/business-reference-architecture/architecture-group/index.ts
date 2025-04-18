import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../architecture-button";

import styles from "../../shared/styles/reset.css";
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
        if(!this.group.title || this.group.title === "") {
            return html``;
        }

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
                    min-width: 10rem;
                }
                h3, a {
                    color: var(--text-color-base);
                    font-family: var(--font-family-heading);
                    line-height: var(--line-height-heading);
                }
                h3 {
                    display: inline-block;
                    position: absolute;
                    top: 0;
                    left: var(--space-sm);
                    margin: 0;
                    padding: var(--space-xxs) var(--space-sm);
                    font-size: var(--font-size-sm);
                    background-color: var(--color-brand-a10);
                    border-radius: var(--radius-pill);
                    transform: translateY(-50%);
                    overflow: hidden;
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
