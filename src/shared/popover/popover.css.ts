import { css } from "lit";

export default css`
    button {
        cursor: pointer;
    }

    :is(button:not([disabled])):is(:active, :hover, :focus-visible) +  [popover] {
      border-color: var(--button-background-active)
    }

    .popover-control--info {
      background-color: var(--surface-main);
      align-self: center;
      border: var(--line-base) solid var(--button-background-base);
      border-radius: var(--radius-circle);
      block-size: var(--font-size-base);
      cursor: pointer;
      font-size: var(--font-size-xs);
      display: flex;
      align-items: center;
      justify-content: center;
      aspect-ratio: 1;
      text-decoration: none;
    }

    .popover-control--info abbr[title] {
      border: 0;
      line-height: 1em;
      text-decoration: none;
      font-weight: 600;
    }

    [popover] {
      background-color: var(--surface-main);
      box-shadow: var(--drop-shadow-level2);
      border: 0;
      border-radius: var(--radius-base);
      inset: unset;
      color: var(--color-text);
      font-family: var(--font-family-base);
      font-size: var(--font-size-sm);
      font-weight: initial;
      line-height: var(--line-height-base);
      margin-block: var(--space-xs);
      margin-inline: var(--space-sm);
      padding: var(--space-sm);
      position: absolute;
      pointer-events: none;
      transition: var(--duration-base);
    }

    [popover]::backdrop {
        pointer-events: none;
        background-color: rgba(0 0 0 / 5%);
        transition: var(--duration-base);
    }
`;