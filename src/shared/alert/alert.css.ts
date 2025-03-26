import { css } from "lit";

const alertCss = css`
    :host {
        --_alert-color: var(--color-info);
        --_alert-color-100: var(--color-info-100);

        display: block;
    }

    .alert {
        background-color: var(--_alert-color-100);
        border: var(--line-base) solid var(--_alert-color);
        border-radius: var(--radius-half);
        display: flex;
        gap: var(--space-xs);
        padding: var(--space-sm);
        font-size: var(--font-size-sm);
    }

    .alert--success {
        --_alert-color: var(--color-success);
        --_alert-color-100: var(--color-success-100);
    }

    .alert--warning {
        --_alert-color: var(--color-warning);
        --_alert-color-100: var(--color-warning-100);
    }

    .alert--error {
        --_alert-color: var(--color-error);
        --_alert-color-100: var(--color-error-100);
    }

    bdo-icon {
        color: var(--_alert-color);
        font-size: var(--heading-3-size);
        line-height: .8; // Visually center the icon
    }

    ::slotted(:where(p, figure, table, ul, ol, dl, pre, blockquote)) {
        margin: 0;
        color: var(--text-color-base);
    }

    ::slotted(:where(h1, h2, h3, h4, h5, h6)) {
        color: var(--text-color-heading);
        font-family: var(--font-family-heading);
        line-height: var(--line-height-heading);
        margin: 0;
    }

    ::slotted(:where(p, table, ul, ol, dl, pre, blockquote, h1, h2, h3, h4, h5, h6):not(:last-child)) {
        margin-block-end: calc(var(--line-height-base) * .5em);
    }

    ::slotted(:where():not(:last-child)) {
        margin-block-end: calc(var(--line-height-base) * .5em);
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

    ::slotted(:where(a)) {
        color: var(--link-text-color, currentcolor);
        text-underline-offset: .25ex;
    }

    ::slotted(:where(a:hover,a:focus)) {
        text-decoration: none !important;
    }
`;
export default alertCss;