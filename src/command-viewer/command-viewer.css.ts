import { css } from "lit";

export default css`

    /* Component */
    :host {
        --command-color-200: #E5CAF5;
        --command-color-500: #7B449E;
        --command-color-800: #4A1F63;
        --expansion-panel-border-color: var(--command-color-500);
    }

    header {
        --text-color-heading: var(--command-color-800);
        --text-color-base: var(--command-color-800);
    }

    header bdo-badge {
        --badge-color: var(--command-color-200);
        --badge-text-color: var(--command-color-800);
    }
`;