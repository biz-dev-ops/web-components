
import { css } from "lit";

const taskViewerCss = css`
    /* Reset */
    /* ... */
    
    /* Component */
    :host {
        --task-color-200: #CDE1AC;
        --task-color-500: #76AC3F;
        --task-color-800: #4A6620;
        --expansion-panel-border-color: var(--task-color-500);
    }

    /* ... */
`;

export default taskViewerCss;