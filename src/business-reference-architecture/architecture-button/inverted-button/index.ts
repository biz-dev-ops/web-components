import { css, CSSResult, html, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";

import { AbstractArchitectureButton } from "../abstract-button";

@customElement("inverted-architecture-button")
export class InvertedArchitectureButton extends AbstractArchitectureButton {
    
    override iconTemplate() : TemplateResult {
        return html`<architecture-icon .icon="${this.button.icon}" inverted></architecture-icon>`;
    }

    static override get styles() : CSSResult[] {
        const styles = super.styles;
        styles.push(
            css`
                :host > a, :host > span {
                    padding: var(--space-xs);
                    background-color: var(--color-white);
                    color: var(--text-color-base);
                    border-radius: var(--radius-base);
                }

                .icon {
                    color: var(--color-brand-base)!important;
                }
            `
        )
        return styles;
    }
}
