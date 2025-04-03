import { css } from "lit";

const buttonCss = css`
    :host {
        --_badge-color: var(--badge-color, var(--color-brand-a10));
        --_badge-text-color: var(--badge-text-color, var(--text-color-base));
        --icon-color: var(--_badge-text-color);
        
        display: inline-block
    }

    .badge {
        align-items: center;
        background-color: var(--_badge-color);
        border-radius: var(--radius-pill);
        color: var(--_badge-text-color);
        display: flex;
        flex-direction: row;
        font-size: var(--font-size-sm);
        gap: var(--space-xxs);
        padding-block: calc(var(--space-xxs) / 2);
        padding-inline: var(--space-xs);
    }

    bdo-icon {
        font-size: var(--font-size-sm);
        height: 1.0rem;
    }
`;

export default buttonCss;