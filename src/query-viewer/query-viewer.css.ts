import { css } from "lit";

export default css`

    :host {
        --query-color-200: #F6DF90;
        --query-color-500: #B17521;
        --query-color-800: #6A5611;
        --expansion-panel-border-color: var(--query-color-500);
    }

    header {
        --text-color-heading: var(--query-color-800);
        --text-color-base: var(--query-color-800);
    }

    header bdo-badge {
        --badge-color: var(--query-color-200);
        --badge-text-color: var(--query-color-800);
    }
`;