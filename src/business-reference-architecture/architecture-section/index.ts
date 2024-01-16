import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import {ifDefined} from 'lit/directives/if-defined.js';

import styles from "../../shared/styles/reset";
import { Section, ButtonType, ArrowDirection, SectionType } from "../models";

import "../architecture-group";
import "../architecture-button";

@customElement("architecture-section")
export class ArchitectureSection extends LitElement {
    @property()
    buttonType!: ButtonType;

    @property()
    sectionType!: SectionType

    @property()
    arrow!: ArrowDirection;

    @property({ type: Object })
    section!: Section;

    override render() {
        return html`
            <div class="architecture-section" data-section-type="${ifDefined(ifDefined(this.sectionType))}">
                ${this.arrowTemplate()}
                ${this.sectionTitleTemplate()}
                ${this.groupsTemplate()}
                ${this.buttonsTemplate()}
            </div>
        `;
    }

    arrowTemplate() {
        if(!this.arrow)
            return html``;

        return html`
            <svg class="arrow arrow-${this.arrow}" viewBox="0 0 70 45" xmlns="http://www.w3.org/2000/svg">
                <path d="M61.895 0H8.45273C1.60825 0 -2.0756 8.03663 2.39206 13.2219L27.3318 42.1676C30.3843 45.7104 35.8116 45.8909 39.0928 42.5587L67.5953 13.6131C72.5752 8.55579 68.9925 0 61.895 0Z" fill="currentColor"/>
            </svg>
        `;
    }

    sectionTitleTemplate() {
        if(!this.section.link)
            return this.sectionHeadingTemplate();

        return html`
            <a .href=${this.section.link}>
                ${this.sectionHeadingTemplate()}
            </a>
        `;
    }

    sectionHeadingTemplate() {
        return html`<h2>${this.section.title}</h2>`;
    }

    groupsTemplate() {
        if(!this.section.groups)
            return html``;

        return  html`
            <div class="architecture-groups">
                ${this.section.groups?.map((group) =>
                    html`<architecture-group .group=${group} .buttonType=${this.buttonType}></architecture-group>`
                )}
            </div>
        `;
    }

    buttonsTemplate() {
        if(!this.section.buttons)
            return html``;

        return this.section.buttons?.map((button) =>
            html`<architecture-button .button=${button} .buttonType=${this.buttonType}></architecture-button>`
        );
    }

    static override get styles() {
        return [
            styles,
            css`
                :host {
                    display: contents;
                }

                .architecture-section {
                    display: flex;
                    align-items: center;
                    gap: var(--space-xs);
                    flex-wrap: wrap;
                    padding: var(--space-lg) var(--space-sm) var(--space-sm);
                    width: 100%;
                    position: relative;
                    border-radius: var(--radius-base);
                }
                
                .architecture-section:not([data-section-type]) {
                    background-color: var(--color-brand-a10);
                    color: var(--color-black);
                }

                .architecture-section[data-section-type="streams"] {
                    padding-top: var(--space-md);
                    color: var(--color-white);
                    border: 3px solid var(--color-black);
                    gap: 0;
                }
                
                .architecture-section[data-section-type="side"] {
                    grid-row: span 4 / span 4; /* Make dynamic */
                    grid-column-start: 2;
                    grid-row-start: 1;
                    flex-direction: column;
                    justify-content: center;
                    align-items: stretch;
                    gap: var(--space-sm);
                    background-color: var(--color-grey-100);
                }
                .arrow {
                    position: absolute;
                    width: 2.5rem;
                    color: var(--color-brand-a10);
                    fill: currentColor;
                }

                .arrow-up {
                    top: 0.375rem;
                    right: 50%;
                    transform: translate(50%, -100%) rotate(180deg);
                }

                .arrow-down {
                    bottom: 0.375rem;
                    left: 50%;
                    transform: translate(-50%, 100%);
                }
                
                h2, a {
                    color: var(--color-black);
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
                    text-transform: lowercase;
                }
                a h2 {
                    text-decoration: underline;
                }
                a:hover h2 {
                    text-decoration: none;
                }
                .architecture-groups {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    align-items: stretch;
                    gap: var(--space-md);
                    margin-top: var(--space-sm);
                }
                * {
                    box-sizing: border-box;
                }
            `,
        ];
    }
}
