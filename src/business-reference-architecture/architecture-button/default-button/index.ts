import { css, CSSResult } from "lit";
import { customElement } from "lit/decorators.js";
import { AbstractArchitectureButton } from "../abstract-button";


@customElement("default-architecture-button")
export class DefaultArchitectureButton extends AbstractArchitectureButton {

    static override get styles() : CSSResult[] {
        const styles = super.styles;
        styles.push(
            css`
                :host > a, :host > span {
                    padding: var(--space-xs) var(--space-sm);
                    background-color: var(--color-brand-base);
                    color: var(--surface-current);
                    border-radius: var(--radius-pill);
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

                bdo-icon {
                    --icon-color: var(--surface-current);
                }
            `
        )
        return styles;
    }
}
