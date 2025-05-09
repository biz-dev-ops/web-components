import { css } from "lit";

export default css`
    .scenario {
        background-color: var(--main-surface);
        padding: calc(var(--space-sm) - var(--line-thin));
        border-radius: var(--radius-base);
        border: var(--line-thin) solid var(--_scenario-status-color);
    }

    .scenario h3 {
        font-size: var(--font-size-sm);
    }

    .scenario--passed {
        --_scenario-status-color: var(--status-passed);
    }

    .scenario--failed {
        --_scenario-status-color: var(--status-failed);
    }

    .scenario--not_implemented {
        --_scenario-status-color: var(--status-undefined);
    }

    .scenario__header {
        margin-bottom: 12px;
    }

    .scenario__tags {
        display: flex;
        gap: var(--space-xs);
    }

    .scenario__description {
        color: var(--color-black-a80);
    }

    .scenario__steps {
        display: flex;
        flex-direction: column;
        gap: var(--space-xs);
    }
`;