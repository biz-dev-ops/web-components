import { css } from "lit";

export default css`
    :host {
        --_model-viewer-color-base: var(--model-viewer-color-base, var(--color-brand-base));
        --_model-viewer-color-a10: var(--model-viewer-color-a10, var(--color-brand-a10));
        --_model-viewer-color-a40: var(--model-viewer-color-a40, var(--color-brand-a40));

        border: var(--line-base) solid var(--_model-viewer-color-a40);
        padding: var(--space-md);
        display: block;
        border-radius: var(--radius-base);
        font-size: var(--font-size-sm);
        display: flex;
        flex-direction: column;
        gap: var(--space-md);
    }
`;