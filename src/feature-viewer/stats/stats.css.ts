import { css } from "lit";

export default css`
    dl {
        color: var(--color-black-a40);
        display: flex;
        font-size: var(--stats-font-size, var(--font-size-base));
        gap: var(--space-xxs);
        justify-items: start;
        line-height: var(--line-height-base);
        margin: 0;
    }

    dt::after {
        content: ":";
    }

    dt, dd {
        --icon-color: var(--_stat-status-color);

        color: var(--_stat-status-color);
        font-weight: 600;
        flex-basis: auto;
        margin-inline-start: 0;
    }

    dt:not(:first-child) {
        margin-inline-start: var(--space-xs);
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: calc(var(--space-xxs) / 2);
    }
    
    .stat--passed {
        --_stat-status-color: var(--status-passed);
    }

    .stat--failed {
        --_stat-status-color: var(--status-failed);
    }

    .stat--not_implemented {
        --_stat-status-color: var(--status-undefined);
    }
`;