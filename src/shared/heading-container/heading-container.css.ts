import { css } from "lit";

export default css`
    :host {
        display: flex;
        flex-direction: column;
        gap: var(--space-md);
        border-block-start: var(--line-base) solid var(--color-brand-a20);
        padding: var(--space-lg) var(--space-md);
        margin-inline: calc(var(--space-md) * -1);
    }

    :host([level="1"]) {
        margin-inline: 0;
        padding-block-end: var(--space-md);
    }

    :host(:where([level="3"], [level="4"])) {
        border-inline: var(--line-base) solid var(--color-brand-a20);
        border-block: none;
        gap: var(--space-sm);
        padding-inline: var(--space-sm);
        padding-block-start: var(--space-xs);
        padding-block-end: 0;
    }

    :host(:where([level="3"], [level="4"]):first-of-type) {
        border-block-start: var(--line-base) solid var(--color-brand-a20);
        border-radius: var(--radius-base) var(--radius-base) 0 0;
        padding-block-start: var(--space-sm);
    }

    :host(:where([level="3"], [level="4"]):last-of-type) {
        border-block-end: var(--line-base) solid var(--color-brand-a20);
        border-radius: 0 0 var(--radius-base) var(--radius-base);
        padding-block-end: var(--space-sm);

    }
    :host(:where([level="3"], [level="4"]):first-of-type:last-of-type) {
        border-radius: var(--radius-base);
    }

    :host(:where([level="3"], [level="4"])) .content[aria-hidden="true"] {
        display: none;
    }

    ::slotted(:where(h3, h4)) {
        background-color: var(--color-brand-a10);
        border-radius: var(--radius-half);
        color: var(--link-text-color);
        cursor: pointer;
        max-width: none;
        padding: var(--space-sm);
        padding-inline-end: var(--space-lg);
        position: relative;
    }

    ::slotted(:where(h3, h4))::after {
        border-color: var(--text-color-base);
        border-style: solid;
        border-width: var(--line-base) var(--line-base) 0 0;
        content: "";
        display: block;
        height: var(--space-xs);
        inset-block-start: 50%;
        inset-inline-end: calc(.25rem + var(--space-md));
        margin-block-start: calc(var(--space-xs) / -4);
        position: absolute;
        transform: rotate(135deg);
        transform-origin: 60% 40%;
        transition: transform var(--duration-base);
        width: var(--space-xs);
    }

    :where([aria-expanded="false"]) ::slotted(:where(h3, h4))::after {
        transform: rotate(-45deg);
    }

    :host(:where([level="4"])) {
        padding-inline: var(--space-xs) !important;
        margin-inline: 0 !important;   
    }

    .header ::slotted(:where(h1, h2, h3, h4)) {
        color: var(--text-color-heading);
        font-family: var(--font-family-heading);
        line-height: var(--line-height-heading);
        margin: 0;
    }

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