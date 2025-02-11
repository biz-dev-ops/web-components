import { html, css, TemplateResult, CSSResult } from "lit";
import { customElement } from "lit/decorators.js";

import { AbstractArchitectureButton } from "../abstract-button";

@customElement("arrow-architecture-button")
export class ArrowArchitectureButton extends AbstractArchitectureButton {
    
    override arrowBeforeTemplate() : TemplateResult {
        return html`<svg class="before" viewBox="0 0 14 54" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.0154 0H2.70485C0.658672 0 -0.635841 2.20865 0.355591 4.00822L12.3016 25.6918C12.75 26.5057 12.75 27.4943 12.3016 28.3082L0.355592 49.9918C-0.63584 51.7913 0.65866 54 2.70484 54H13.0154V0Z" fill="currentColor"/></svg>`;
    }

    override arrowAfterTemplate(): TemplateResult {
        return html`<svg class="after" viewBox="0 0 18 54" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 54.0008C1.97011 53.9741 3.77774 52.9136 4.73429 51.2177L17.6557 28.3091C18.1148 27.4952 18.1148 26.5065 17.6557 25.6926L4.73429 2.78391C3.77774 1.08803 1.97011 0.0275068 0 0.000823975V54.0008Z" fill="currentColor"/></svg>`;
    }

    static override get styles() : CSSResult[] {
        const styles = super.styles;
        styles.push(
            css`
                :host > a, :host > span {
                    color: var(--color-white);
                }

                .inner {
                    padding: var(--space-sm);
                    background-color: var(--color-brand-secondary);
                }

                .before {
                    flex: none;
                    margin-right: -2px;
                    display: block;
                    height: 54px; /* Make dynamic */
                    color: var(--color-brand-secondary);
                }

                .after {
                    flex: none;
                    margin-left: -1px;
                    margin-right: -3px;
                    display: block;
                    height: 54px; /* Make dynamic */
                    color: var(--color-brand-secondary);
                }
            `
        )
        return styles;
    }
}
