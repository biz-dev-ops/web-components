import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ButtonType, Button } from "../models";

import styles from "../../shared/styles/reset";

import "../architecture-icon";

@customElement("architecture-button")
export class ArchitectureButton extends LitElement {
    @property()
    buttonType!: ButtonType;

    @property({ type: Object })
    button!: Button;

    override render() {
        let buttonCss = '';
        let innerButtonCss = '';
        let iconCss = '';
        let beforeCss = '';
        let afterCss = '';
        switch (this.buttonType) {
            case 'default':
                buttonCss = `
                    padding: var(--space-xs) var(--space-sm);
                    background-color: var(--color-white);
                    color: var(--color-black);
                    border-radius: var(--radius-base);
                `;
                iconCss = `
                    color: var(--color-brand-base);
                `;
                break;
            case 'brand':
                buttonCss = `
                    padding: var(--space-xs) var(--space-sm);
                    background-color: var(--color-brand-base);
                    color: var(--color-white);
                    border-radius: var(--radius-pill);
                `;
                break;
            case 'stream':
                buttonCss = `
                    color: var(--color-white);
                `;
                innerButtonCss = `
                    padding: var(--space-sm);
                    background-color: var(--color-brand-base);
                `;
                beforeCss = `
                    flex: none;
                    margin-right: -1px;
                    display: block;
                    height: 54px; /* Make dynamic */
                    color: var(--color-brand-base);
                `;
                afterCss = `
                    flex: none;
                    margin-left: -1px;
                    margin-right: -2px;
                    display: block;
                    height: 54px; /* Make dynamic */
                    color: var(--color-brand-base);
                `;
                break;
            default:
                buttonCss = `
                    padding: 0 var(--space-xs);
                    color: var(--color-black);
                    `;
                iconCss = `
                    padding: var(--space-xs);
                    flex: none;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    background-color: var(--color-brand-base);
                    border-radius: var(--radius-pill);
                    aspect-ratio: 1;
                `;
        }

        if(this.button.link) {
            return html`
                <a .href=${this.button.link} style="${buttonCss}">
                    ${this.arrowBeforeTemplate(beforeCss)}

                    <span class="inner" style="${innerButtonCss}">
                        ${this.iconTemplate(iconCss)}
                        ${this.textTemplate()}
                    </span>

                    ${this.arrowAfterTemplate(afterCss)}
                </a>
            `;
        }
        else {
            return html`
                <span style="${buttonCss}">
                    <span class="inner" style="${innerButtonCss}">
                        ${this.iconTemplate(iconCss)}
                        ${this.textTemplate()}
                    </span>
                </span>
            `;
        }
    }

    iconTemplate(iconCss = '') {
        return  html`${this.button.icon ? html`<span class="icon" style="${iconCss}"><architecture-icon icon="${this.button.icon}" buttonType="${this.buttonType}" /></span>` : ""}`;
    }

    textTemplate() {
        return  html`<span>${this.button.title}</span>`;
    }

    arrowBeforeTemplate(beforeCss = '') {
        return html`${this.buttonType === 'stream' ? html`<svg style="${beforeCss}" viewBox="0 0 14 54" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.0154 0H2.70485C0.658672 0 -0.635841 2.20865 0.355591 4.00822L12.3016 25.6918C12.75 26.5057 12.75 27.4943 12.3016 28.3082L0.355592 49.9918C-0.63584 51.7913 0.65866 54 2.70484 54H13.0154V0Z" fill="currentColor"/></svg>` : ''}`;
    }

    arrowAfterTemplate(afterCss = '') {
        return html`${this.buttonType === 'stream' ? html`<svg style="${afterCss}" viewBox="0 0 18 54" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 54.0008C1.97011 53.9741 3.77774 52.9136 4.73429 51.2177L17.6557 28.3091C18.1148 27.4952 18.1148 26.5065 17.6557 25.6926L4.73429 2.78391C3.77774 1.08803 1.97011 0.0275068 0 0.000823975V54.0008Z" fill="currentColor"/></svg>` : ''}`;
    }


    static override get styles() {
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
                }

                a architecture-icon, span architecture-icon {
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
