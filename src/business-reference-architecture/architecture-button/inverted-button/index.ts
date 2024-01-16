import { css, CSSResult } from "lit";
import { customElement } from "lit/decorators.js";

import { AbstractArchitectureButton } from "../abstract-button";

@customElement("inverted-architecture-button")
export class InvertedArchitectureButton extends AbstractArchitectureButton {
    
    static override get styles() : CSSResult[] {
        const styles = super.styles;
        styles.push(
            css`
                :host > a, :host > span {
                    padding: var(--space-xs) var(--space-sm);
                    background-color: var(--color-white);
                    color: var(--color-black);
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
