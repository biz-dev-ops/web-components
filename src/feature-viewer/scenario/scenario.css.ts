import { css } from "lit";

export default css`
    .scenario {
        background-color: var(--main-surface);
        padding: calc(var(--space-sm) - var(--line-thin));
        border-radius: var(--radius-base);
        border: var(--line-thin) solid var(--_scenario-status-color);
    }
    
    .scenario[open] {
        display: flex;
        flex-direction: column;
        gap: var(--space-sm);
    }

    .scenario__header {
        position: relative;
        cursor: pointer;
        display: flex;
        flex-direction: row;
        gap: var(--space-sm);
        flex-wrap: wrap;
        align-items: center;
    }

    .scenario__header::marker {
        content: "";
    }
    
    .scenario__header::after {
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

    .scenario[open] .scenario__header::after {
        transform: rotate(-45deg);
    }

    .scenario__steps {
        display: flex;
        flex-direction: column;
        gap: var(--space-xs);
    }

    .scenario__title {
        color: var(--button-text-color);
        font-size: var(--font-size-sm);
        margin: 0;
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

    .scenario__tags {
        display: flex;
        gap: var(--space-xs);
    }
    
    .scenario__description {
        color: var(--color-black-a80);
    }
    
    feature-stats {
        --stats-font-size: var(--font-size-sm);
        margin-block-end: var(--space-sm);
    }
`;