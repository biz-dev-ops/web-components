import { css } from "lit";

const modelViewerPathCss = css`
  :host {
    --_item-line-color: var(--_model-viewer-color-base);

    --button-border-color: var(--_item-line-color);
    --button-hover-color: var(--_model-viewer-color-a10);
    --button-font-size: var(--font-size-sm);
    --button-inline-size: 100%;
  }

  .list--path {
    --button-padding: var(--space-xs);

    align-items: center;
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-xs);
    list-style: none;
    margin: 0;
    padding-inline-start: 0;
  }

  .list--path li {
    display: flex;
    column-gap: var(--space-xs);
    align-items: center;
  }

  .list--path li:not(:last-child, .oneof, .no-title)::after {
    content: ' /';
  }

  .list--path li.oneof:not(.no-title) .txt--property::after {
    content: ':';
  }

  .list--path li.oneof + .object button {
    margin-inline-start: calc(var(--space-xxs) * -1);
  }

  .list--path button {
    padding: var(--space-xs);
  }

  .list--path li > span {
    padding-block: calc(var(--line-base) + var(--button-padding));
  }
`;

export default modelViewerPathCss