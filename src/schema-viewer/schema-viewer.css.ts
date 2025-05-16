import { css } from "lit";

export default css`
    :host {
        --_schema-viewer-color-base: var(--schema-viewer-color-base, var(--color-brand-base));
        --_schema-viewer-color-a10: var(--schema-viewer-color-a10, var(--color-brand-a10));
        --_schema-viewer-color-a40: var(--schema-viewer-color-a40, var(--color-brand-a40));

        --badge-color: var(--schema-viewer-color-a10);
        --badge-text-color: var(--schema-viewer-color-base);

        border: var(--line-thin) solid var(--_schema-viewer-color-a10);
        padding: var(--space-md);
        display: block;
        border-radius: var(--radius-base);
        font-size: var(--font-size-sm);
        display: flex;
        flex-direction: column;
        gap: var(--space-md);
    }

    :host([use-case]) {
        --schema-viewer-color-a10: var(--use-case-color-200);
        --schema-viewer-color-a40: var(--use-case-color-500);
        --schema-viewer-color-base: var(--use-case-color-800);
    }

    :host([use-case="command"]) {
        --use-case-color-200: #E5CAF5;
        --use-case-color-500: #7B449E;
        --use-case-color-800: #4A1F63;
    }

    :host([use-case="query"]) {
        --use-case-color-200: #F6DF90;
        --use-case-color-500: #B17521;
        --use-case-color-800: #6A5611;
    }

    :host([use-case="event"]) {
        --use-case-color-200: #ACE1DE;
        --use-case-color-500: #51A39F;
        --use-case-color-800: #236965;
    }

    :host([use-case="task"]) {
        --use-case-color-200: #CDE1AC;
        --use-case-color-500: #76AC3F;
        --use-case-color-800: #4A6620;
    }

    bdo-badge {
        align-self: flex-start;
    }
`;