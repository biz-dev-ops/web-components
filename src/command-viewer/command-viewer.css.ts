import { css } from "lit";

const commandViewerCss = css`
    /* Reset */
    :host {
        all: unset;
        font-family: var(--font-family-base);
        font-size: var(--font-size-base);
        display: inline-block;
        line-height: var(--line-height-base);
        box-sizing: border-box;
        text-align: start;
        display: block;
    }

    :where(*, ::before, ::after) {
        box-sizing: border-box;
    }
    
    /* Component */
    :host {
        --command-color-200: #E5CAF5;
        --command-color-500: #7B449E;
        --command-color-800: #4A1F63;
        --expansion-panel-border-color: var(--command-color-500);
    }

    section {
        display: flex;
        flex-direction: column;
        gap: var(--space-xxs);
    }

    header {
        --text-color-heading: var(--command-color-800);
        --text-color-base: var(--command-color-800);

        display: flex;
        flex-direction: row;
        align-items: center;
        gap: var(--space-xxs);
    }

    header bdo-badge {
        --badge-color: var(--command-color-200);
        --badge-text-color: var(--command-color-800);
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

export default commandViewerCss;