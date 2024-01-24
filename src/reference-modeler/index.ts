import { css, html, HTMLTemplateResult, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

import resetStyles from "../shared/styles/reset";
import arrowSvg from "./arrow.svg";

import { Section, Button } from "./models";
import "../shared/section";
import "../shared/button";
import "../shared/icon";

@customElement("reference-modeler")
export class ReferenceModelerComponent extends LitElement {
    @property({ type: Array })
    model!: Section[];

    @property({ attribute: "model-json" })
    modelJson!: string;

    override render() {
        return html`${this.model?.map(this.sectionTemplate.bind(this))}`;
    }

    sectionTemplate(section: Section) : HTMLTemplateResult {
        return html`
            <bdo-section class=${section.style || "default"} .arrow=${section.arrow}>
                ${section.arrow ? arrowSvg : html``}
                ${this.headingTemplate(section)}
                ${this.buttonsTemplate(section)}
                ${this.groupsTemplate(section)}
            </bdo-section>
        `;
    }

    headingTemplate(section: Section) {
        if(!section.title) {
            return html``;
        }
        
        return html`<h1 slot="heading">${this.titleLinkTemplate(section)}</h1>`;
    }

    titleLinkTemplate(el: Section | Button) {
        if(!el.link) {
            return html`<span>${el.title}</span>`;
        }

        return html`<a href=${el.link}>${el.title}</a>`;
    }

    buttonsTemplate(section: Section) {
        return html`<div class="buttons">${section.buttons?.map(this.buttonTemplate.bind(this))}</div>`;
    }

    buttonTemplate(button: Button) {
        return html`
            <bdo-button>
                ${this.iconTemplate(button)}
                ${this.titleLinkTemplate(button)}
            </bdo-button>
        `;
    }

    iconTemplate(button: Button) {
        if(!button.icon) {
            return html``;
        }

        return html`<bdo-icon icon=${button.icon}></bdo-icon>`;
    }

    groupsTemplate(section: Section) {
        return html`<div class="groups">${section.groups?.map(this.sectionTemplate.bind(this))}</div>`;
    }

    override update(changedProperties: Map<string, unknown>) {
        if (changedProperties.has("modelJson")) {
            try {
                this.model = JSON.parse(this.modelJson);
            } 
            catch (e) {
                console.error("Error parsing modelJson:", e);
            }
        }
        super.update(changedProperties);
    }

    static override get styles() {
        return [
            resetStyles,
            css`
                :host {
                    display: grid;
                    display: flex;
                    flex-direction: column;
                    gap: var(--space-lg);
                }

                bdo-section.default {
                    background-color: var(--color-brand-a10);
                }

                bdo-section:not(.pop):has(h1) {
                    padding-top: var(--space-lg);
                }

                bdo-section svg {
                    color: var(--color-brand-a10);
                }

                bdo-section h1[slot],
                bdo-section h1 a {
                    color: var(--text-color-heading);
                    font-family: var(--font-family-heading);
                    font-size: var(--heading-3-size);
                }

                bdo-section h1[slot] {
                    text-transform: lowercase;
                    background-color: var(--color-white);
                    border-radius: var(--radius-pill);
                    
                }

                bdo-section h1 a:hover {
                    text-decoration:none;
                }

                bdo-section.pop {
                    background-color: inherit;
                    border: var(--line-medium) solid var(--color-brand-pop);
                }

                bdo-section.pop svg {
                    color: var(--color-brand-pop);
                }

                bdo-section.pop h1[slot],
                bdo-section.pop h1 a {
                    color: var(--color-brand-pop);
                }

                bdo-section.pop h1[slot] {
                    border-radius: none;
                }

                bdo-section.pop bdo-button {
                    background-color: var(--color-brand-pop);
                    color: var(--color-white);
                }

                bdo-section.pop bdo-button a {
                    color: var(--color-white);
                }

                bdo-section .buttons {
                    display: flex;
                    flex-wrap: wrap;
                    gap: var(--space-xs);
                }

                bdo-section .groups {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    align-items: stretch;
                    gap: var(--space-md);
                    margin-top: var(--space-sm);
                }

                bdo-section .groups bdo-section {
                    background-color: inherit;
                    border: var(--line-medium) solid var(--color-brand-a20);
                }

                bdo-section .groups bdo-section h1 {
                    background-color: var(--color-brand-a10);
                    font-size: var(--font-size-sm);
                    text-transform: none;
                }

                bdo-button {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: var(--space-xs);
                    line-height: 140%;
                }

                bdo-button bdo-icon {
                    flex: none;
                    width: 1.5rem;
                    height: 1.5rem;
                    margin-top: -0.5rem; /* So text determines the button height */
                    margin-bottom: -0.5rem;
                }

                bdo-button > span {
                    display: flex;
                    width: 100%;
                    font-size: var(--font-size-sm);
                    font-weight: 700;
                    transition: all 0.2s ease-in-out;
                    position: relative;
                }
            `
        ];
    }
}
