import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

import styles from "../../shared/styles/reset";
import { Section, Button, Group } from "../models";

import "../architecture-group";
import "../architecture-button";

@customElement("architecture-section")
export class ArchitectureSection extends LitElement {
    @property({ type: Object })
    section!: Section;

    override render() {
        // Make this more robust (this now checks if there's items in it to see if it's a group)
        const groups = this.section.content.filter((item) => 'items' in item) as Group[];
        const buttons = this.section.content.filter((item) => !('items' in item)) as Button[];
        const buttonStyle = this.section.buttonStyle;

        if (buttonStyle) {
            buttons.forEach((button) => {
                if (!button.style) {
                    button.style = buttonStyle;
                }
            });
            groups.forEach((group) => {
                if (!group.buttonStyle) {
                    group.buttonStyle = buttonStyle;
                }
            });
        }

        return html`
            <div class="architecture-section architecture-section-${this.section.style || 'default'}">
                ${this.section.arrow ? html`
                    <svg class="arrow arrow-${this.section.arrow}" viewBox="0 0 70 45" xmlns="http://www.w3.org/2000/svg">
                        <path d="M61.895 0H8.45273C1.60825 0 -2.0756 8.03663 2.39206 13.2219L27.3318 42.1676C30.3843 45.7104 35.8116 45.8909 39.0928 42.5587L67.5953 13.6131C72.5752 8.55579 68.9925 0 61.895 0Z" fill="currentColor"/>
                    </svg>
                ` : ''}

                <h2>${this.section.title}</h2>
                ${groups.length > 0 ? html`
                    <div class="architecture-groups">
                        ${groups.map((group) =>
                            html`<architecture-group .group=${group}></architecture-group>`
                        )}
                    </div>
                ` : ''}
                ${buttons.map((button) =>
                    html`<architecture-button .button=${button}></architecture-button>`
                )}
            </div>
        `;
    }

    static override get styles() {
        return [
            styles,
            css`
                :host {
                    display: contents;
                }
                .architecture-section {
                    grid-column: span 10 / span 10;
                    display: flex;
                    align-items: center;
                    gap: var(--space-xs);
                    flex-wrap: wrap;
                    padding: var(--space-lg) var(--space-sm) var(--space-sm);
                    width: 100%;
                    position: relative;
                    border-radius: var(--radius-base);
                }
                .architecture-section-default {
                    background-color: var(--color-brand-a10);
                }
                .architecture-section-streams {
                    border: 3px solid var(--color-black);
                }
                .architecture-section-principles {
                    /* What if there are no principles? How to make more dynamic? */
                    grid-column: span 2 / span 2;
                    grid-row: span 4 / span 4; /* Make dynamic */
                    grid-column-start: 11;
                    grid-row-start: 1;
                    flex-direction: column;
                    justify-content: center;
                    background-color: var(--color-grey-100);
                }
                .arrow {
                    position: absolute;
                    width: 2.5rem;
                    color: var(--color-brand-a10);
                    fill: currentColor;
                }
                .arrow-down {
                    bottom: 0.375rem;
                    left: 50%;
                    transform: translate(-50%, 100%);
                }
                .arrow-up {
                    top: 0.375rem;
                    right: 50%;
                    transform: translate(50%, -100%) rotate(180deg);
                }
                .arrow-null {
                    display: none;
                }
                h2 {
                    display: inline-block;
                    position: absolute;
                    top: 0;
                    left: var(--space-sm);
                    margin: 0;
                    padding: var(--space-xxs) var(--space-sm);
                    background-color: var(--color-white);
                    border-radius: var(--radius-pill);
                    transform: translateY(-50%);
                }
                .architecture-groups {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    align-items: stretch;
                    gap: var(--space-lg);
                    margin-top: var(--space-sm);
                }
                * {
                    box-sizing: border-box;
                }
            `,
        ];
    }
}
