import { css } from "lit";

export default css`

    /* Component */
    :host {
        --task-color-200: #CDE1AC;
        --task-color-500: #76AC3F;
        --task-color-800: #4A6620;
        --expansion-panel-border-color: var(--task-color-500);
    }

    header {
        --text-color-heading: var(--task-color-800);
        --text-color-base: var(--task-color-800);
    }

    header bdo-badge {
        --badge-color: var(--task-color-200);
        --badge-text-color: var(--task-color-800);
    }
`;