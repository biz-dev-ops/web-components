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

    .scenario-outline[open] {
        display: flex;
        flex-direction: column;
        gap: var(--space-sm);
    }

    .scenario-outline__header {
        position: relative;
        cursor: pointer;
        display: flex;
        flex-direction: row;
        gap: var(--space-sm);
        flex-wrap: wrap;
        align-items: center;
    }

    .scenario-outline__header::marker {
        content: "";
    }

    .scenario-outline__header::after {
        border-color: currentcolor;
        border-style: solid;
        border-width: var(--line-base) var(--line-base) 0 0;
        content: "";
        display: block;
        aspect-ratio: 1;
        block-size: var(--space-xs);
        inset-block-start: calc(50% - .25em);
        inset-inline-end: .25em;
        position: absolute;
        transform: rotate(135deg);
        transform-origin: 65% 35%;
        transition: var(--duration-base);
    }

    .scenario-outline[open] .scenario-outline__header::after {
        transform: rotate(-45deg);
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
        gap: var(--space-sm); */
    }

    feature-stats {
        --stats-font-size: var(--font-size-sm);
        margin-block-end: var(--space-sm);
    }
`;