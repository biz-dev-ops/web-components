import { css } from "lit";

export default css`
    :host {
        display: block;   
        background-color: var(--surface-current)
    }

    :host(.fullscreen) {
        background-color: var(--surface-main);
    }
    
    .driver {
        display: flex;
        gap: var(--space-xs);
        justify-content: flex-end;
    }

    :host(.fullscreen) .driver {
        position: absolute;
        inset-inline-end: var(--space-md);
        inset-block-start: var(--space-md);
        z-index: 1;
    }

    :host(.fullscreen) .driven {
        height: 100%;
        inset: 0;
        position: absolute;
        width: 100%;
    }
`;