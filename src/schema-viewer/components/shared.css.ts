import { css } from "lit";

export default css`
  :host {
    --button-border-color: var(--_schema-viewer-color-a40);
    --button-hover-color: var(--_schema-viewer-color-a10);
    --button-font-size: var(--font-size-sm);
    --button-inline-size: 100%;

    font-size: var(--font-size-sm);
  }
  
  h2, h3 {
    color: var(--text-color-base);
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

  .badge--type {
    margin-inline-start: auto;
    font-weight: 600;
    font-size: var(--font-size-xs);
    background-color: var(--color-black-a05);
    border-radius: var(--radius-pill);
    align-self: center;
    padding: var(--space-xxs) var(--space-xs);
  }

  .badge--type em {
    font-style: normal;
    font-weight: 400;
  }
`;