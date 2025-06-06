import { css } from "lit";

export default css`
    .step {
        background-color: var(--_step-status-color-100);
        border-radius: var(--radius-half);
        padding: var(--space-xs) var(--space-sm);
    }
    
    p, table {
        font-size: var(--font-size-xs);
    }

    .step__state {
        --icon-color: var(--_step-status-color);

        align-items: center;
        background: none;
        color: var(--_step-status-color);
        display: inline-flex;
        gap: var(--space-xxs);
    }

    .step--passed {
        --_step-status-color: var(--status-passed);
        --_step-status-color-100: var(--status-passed-100);
    }

    .step--failed {
        --_step-status-color: var(--status-failed);
        --_step-status-color-100: var(--status-failed-100);
    }

    .step--not_implemented {
        --_step-status-color: var(--status-undefined);
        --_step-status-color-100: var(--status-undefined-100);
    }

    .step__content {
        display: flex;
        gap: var(--space-xs);
        max-width: 100%;
    }

    .step__content:not(:last-child) {
        margin-block-end: calc(var(--line-height-base) * .5rem);
    }

    .step__keyword {
        font-weight: 700;
        color: var(--color-blue-500);
        min-width: 5ch;
    }

    .step__text {
        flex: 1;
    }

    table {
        background-color: var(--color-white-a90);
        border: var(--space-xs) solid var(--color-white-a90);
        border-collapse: collapse;
    }

    table tr > th {
        padding-block: 0;
    }

    table tr > td {
        padding-block: 0;
    }
`;