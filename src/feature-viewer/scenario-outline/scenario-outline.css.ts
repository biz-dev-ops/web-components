import { css } from "lit";

export default css`
    .scenario-outline {
        background-color: var(--main-surface);
        padding: calc(var(--space-sm) - var(--line-thin));
        border-radius: var(--radius-base);
        border: var(--line-thin) dotted var(--_scenario-status-color);
        display: flex;
        flex-direction: column;
        gap: var(--space-sm);
    }

    .scenario-outline__title {
        font-size: var(--heading-5-size);
    }

    .scenario-outline--passed {
        --_scenario-status-color: var(--status-passed);
    }

    .scenario-outline--failed {
        --_scenario-status-color: var(--status-failed);
    }

    .scenario-outline--not_implemented {
        --_scenario-status-color: var(--status-undefined);
    }

    .scenario-outline__scenarios {
        display: flex;
        flex-direction: column;
        gap: var(--space-sm);
        margin-inline: calc((var(--space-sm)) / -1);
    }
`;