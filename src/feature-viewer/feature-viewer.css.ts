import { css } from "lit";

export default css`
    :host {
        --_schema-viewer-color-base: var(--schema-viewer-color-base, var(--color-brand-base));
        --_schema-viewer-color-a10: var(--schema-viewer-color-a10, var(--color-brand-a10));
        --_schema-viewer-color-a40: var(--schema-viewer-color-a40, var(--color-brand-a40));

        --badge-color: var(--schema-viewer-color-a10);
        --badge-text-color: var(--schema-viewer-color-base);

        border: var(--line-base) solid var(--_schema-viewer-color-a40);
        padding: var(--space-sm);
        display: block;
        border-radius: var(--radius-base);
        font-size: var(--font-size-sm);
        display: flex;
        flex-direction: column;
        gap: var(--space-sm);
    }

    h2 {
        font-size: var(--heading-4-size);
    }
    
    .feature__header,
    .feature__content {
        display: flex;
        flex-direction: column;
        gap: var(--space-sm);
    }

    .feature__error {
        color: var(--color-error);
        padding: var(--space-sm);
        background-color: var(--color-error-100);
        border-radius: var(--radius-half);
        border: var(--line-base) solid var(--color-error);
    }
`;