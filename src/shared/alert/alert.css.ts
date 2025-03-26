import { css } from "lit";

const alertCss = css`
    :host {
        --_alert-color: var(--alert-color, var(--color-info));
        --_alert-backgound-color: var(--alert-backgound-color, var(--color-info-100));

        display: block;
    }

    .alert {
        background-color: var(--_alert-backgound-color);
        border: var(--line-base) solid var(--_alert-color);
        border-radius: var(--radius-half);
        display: flex;
        gap: var(--space-xs);
        padding: var(--space-xs) var(--space-sm);
        font-size: var(--font-size-sm);
    }

    .alert--success {
        --_alert-color: var(--color-success);
        --_alert-backgound-color: var(--color-success-100);
    }

    .alert--warning {
        --_alert-color: var(--color-warning);
        --_alert-backgound-color: var(--color-warning-100);
    }

    .alert--error {
        --_alert-color: var(--color-error);
        --_alert-backgound-color: var(--color-error-100);
    }

    bdo-icon {
        color: var(--_alert-color);
        font-size: var(--heading-3-size);
    }
`;
export default alertCss;