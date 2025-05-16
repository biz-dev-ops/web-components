import { css, CSSResult, html, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";

import { AbstractArchitectureButton } from "../abstract-button";

@customElement("inverted-architecture-button")
export class InvertedArchitectureButton extends AbstractArchitectureButton {

    override iconTemplate() : TemplateResult {
        return html`<bdo-icon .icon="${this.button.icon}" inverted></bdo-icon>`;
    }

    static override get styles() : CSSResult[] {
        const styles = super.styles;
        styles.push(
            css`
                :host > a, :host > span {
                    padding: var(--space-xs);
                    background-color: var(--surface-current);
                    color: var(--text-color-base);
                    border-radius: var(--radius-base);
                }

                a {
                    text-decoration: none;
                }

                a .inner span:not(.icon) {
                  text-decoration: underline;  
                }

                a:is(:hover, :focus) .inner span:not(.icon) {
                  text-decoration: none;  
                }
            `
        )
        return styles;
    }
}
