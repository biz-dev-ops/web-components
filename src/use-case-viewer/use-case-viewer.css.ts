import { css } from "lit";

export default css`
    :host {
        --expansion-panel-border-color: var(--use-case-color-500);
    }

    section {
        display: flex;
        flex-direction: column;
        gap: var(--space-xxs);
    }

    model-viewer {
        --color-brand-a10: var(--use-case-color-200);
        --color-brand-a40: var(--use-case-color-500);
        --color-brand-base: var(--use-case-color-800);
    }

    header {
        --text-color-heading: var(--use-case-color-800);
        --text-color-base: var(--use-case-color-800);

        display: flex;
        flex-direction: row;
        align-items: center;
        gap: var(--space-xxs);
        font-weight: bold;
    }

    header bdo-badge {
        --badge-color: var(--use-case-color-200);
        --badge-text-color: var(--use-case-color-800);
    }

    main {
        display: flex;
        flex-direction: column;
        gap: var(--space-xs);
        font-size: var(--font-size-sm);
    }

    [slot="summary"] {
        font-size: var(--font-size-sm);
    }

    .count {
        color: var(--color-black-a40);
    }

    p {
        margin: 0;
    }

    p:not(:last-child) {
        margin-block-end: var(--space-sm);
    }

    .cases {
        display: flex;
        flex-direction: column;
        gap: var(--space-sm);
    }

    .case {
        font-size: var(--font-size-sm);
    }

    .case h2 {
        font-size: inherit;
        margin-block: 0;
    }
`;