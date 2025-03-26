import { css } from "lit";

export default css`
    :host {
        display: flex;
        flex-direction: column;
        gap: var(--space-md);
        border-block-start: var(--line-base) solid var(--color-brand-a20);
        padding: var(--space-lg) var(--space-md);
        padding-block-end: 0;
        margin-inline: calc(var(--space-md) * -1);
    }

    :host([heading-level="1"]) {
        margin-inline: 0;
        padding-block-end: var(--space-md);
    }
    :host(:where([heading-level="3"], [heading-level="4"])) {
        border-inline: var(--line-base) solid var(--color-brand-a20);
        gap: var(--space-sm);
        padding: var(--space-sm);
    }

    :host(:where([heading-level="3"], [heading-level="4"]):first-of-type) {
        border-block-start: var(--line-base) solid var(--color-brand-a20);
        border-radius: var(--radius-base) var(--radius-base) 0 0;
    }

    :host(:where([heading-level="3"], [heading-level="4"]):last-of-type) {
        border-block-end: var(--line-base) solid var(--color-brand-a20);
        border-radius: 0 0 var(--radius-base) var(--radius-base);
    }
    :host(:where([heading-level="3"], [heading-level="4"]):first-of-type:last-of-type) {
        border-radius: var(--radius-base);
    }

    ::slotted(:where(h3, h4)) {
        background-color: var(--color-brand-a10);
        border-radius: var(--radius-half);
        color: var(--link-text-color);
        max-width: none;
        padding: var(--space-sm);
        padding-inline-end: var(--space-lg);
        position: relative;
    }

    :host(:where([heading-level="4"])) {
        padding-inline: var(--space-xs) !important;
        margin-inline: 0 !important;   
    }

    .header ::slotted(:where(h1, h2, h3, h4)) {
        color: var(--text-color-heading);
        font-family: var(--font-family-heading);
        line-height: var(--line-height-heading);
        margin: 0;
    }

    /* ::slotted(:where(h1, h2, h3, h4):not(:last-child)) {
        margin-block-end: calc(var(--line-height-base) * .5em);
    } */

    ::slotted(:where(h1, .heading-size-1)) {
        font-size: var(--heading-1-size);
    }

    ::slotted(:where(h2, .heading-size-2)) {
        font-size: var(--heading-2-size);
    }

    ::slotted(:where(h3, .heading-size-3)) {
        font-size: var(--heading-4-size);
    }

    ::slotted(:where(h4, .heading-size-4)) {
        font-size: var(--heading-5-size);
    }
`;