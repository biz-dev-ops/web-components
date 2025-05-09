import { css } from "lit";

export default css`
  :host {
    --_item-line-color: var(--_schema-viewer-color-base);

    --button-border-color: var(--_item-line-color);
    --button-hover-color: var(--_schema-viewer-color-a10);
    --button-font-size: var(--font-size-sm);
    --button-inline-size: 100%;
  }
  
  h3 {
    column-gap: var(--space-xs);
    display: flex;
    font-size: var(--font-size-sm);
  }

  ul, ol {
    margin: 0;
  }

  .txt--property {
    font-weight: 600;
    text-align: start
  }

  .txt--required {
    color: var(--color-error);
  }
`;