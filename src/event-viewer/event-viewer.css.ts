import { css } from "lit";

export default css`

    :host {
        --event-color-200: #ACE1DE;
        --event-color-500: #51A39F;
        --event-color-800: #236965;
        --expansion-panel-border-color: var(--event-color-500);
    }

    header {
        --text-color-heading: var(--event-color-800);
        --text-color-base: var(--event-color-800);
    }

    header bdo-badge {
        --badge-color: var(--event-color-200);
        --badge-text-color: var(--event-color-800);
    }
`;