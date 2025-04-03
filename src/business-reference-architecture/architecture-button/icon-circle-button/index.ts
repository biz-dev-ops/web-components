import { css, CSSResult } from "lit";
import { customElement } from "lit/decorators.js";

import { AbstractArchitectureButton } from "../abstract-button";

@customElement("icon-circle-architecture-button")
export class IconCircleArchitectureButton extends AbstractArchitectureButton {

    static override get styles() : CSSResult[] {
        const styles = super.styles;
        styles.push(
            css`
                :host > a, :host > span {
                    padding: 0 var(--space-xs);
                    color: var(--text-color-base);
                }

                .icon {
                    padding: var(--space-xs);
                    flex: none;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    background-color: var(--color-brand-base);
                    color: var(--surface-current);
                    border-radius: var(--radius-pill);
                    aspect-ratio: 1;
                    --icon-color: var(--surface-current);
                }
            `
        )
        return styles;
    }
}
