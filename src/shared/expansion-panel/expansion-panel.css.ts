import { css } from "lit";

const expansionPanelCss = css`
    /* Reset */
    :host {
        all: unset;
        font-family: var(--font-family-base);
        font-size: var(--font-size-base);
        display: inline-block;
        line-height: var(--line-height-base);
        box-sizing: border-box;
        text-align: start;
    }

    :where(*, ::before, ::after) {
        box-sizing: border-box;
    }
    
    /* Component */
    :host {
        --_expansion-panel-border-color: var(--expansion-panel-border-color, var(--color-brand-a40));

        display: block
    }
    
    details {
        border: var(--line-base) solid var(--_expansion-panel-border-color);
        display: block;
        border-radius: var(--radius-base);    
    }
    details summary::-webkit-details-marker {
        display:none;
    }

    summary {
        border-radius: calc(var(--radius-base) - var(--space-xs));    
        cursor: pointer;
        list-style: none;
        padding-inline-end: var(--space-lg);
        position: relative;
        padding: var(--space-sm);
        padding-inline-end: calc(var(--space-md) + var(--space-sm));
    }

    summary::after {
        border-color: var(--text-color-base);
        border-style: solid;
        border-width: var(--line-base) var(--line-base) 0 0;
        content: "";
        display: block;
        aspect-ratio: 1;
        block-size: var(--space-xs);
        inset-block-start: calc(50% - .25em);
        inset-inline-end: calc(.25em + var(--space-md));
        position: absolute;
        transform: rotate(135deg);
        transform-origin: 65% 35%;
        transition: var(--duration-base);
    }

    details[open] summary::after {
        transform: rotate(-45deg);
    }

    .panel {
        padding-inline: var(--space-sm);
        padding-block-end: var(--space-sm);
    }
`;

export default expansionPanelCss;