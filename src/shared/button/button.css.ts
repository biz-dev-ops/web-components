import { css } from "lit";

export default css`
    :host {
        --_button-font-family: var(--button-font-family, var(--font-family-base));
        --_button-font-size: var(--button-font-size, var(--font-size-base));
        --_button-line-height: var(--button-line-height, var(--line-height-base));
        --_button-hover-color: var(--button-hover-color, var(--color-brand-a10));
        --_button-padding-block: var(--button-padding-block, var(--button-padding, var(--space-sm)));
        --_button-padding-inline: var(--button-padding-inline, var(--button-padding, var(--space-sm)));
        --_button-inline-size: var(--button-inline-size, auto);
        --_button-border-color: var(--button-border-color, transparent);
        --_button-action-border-color: var(--button-border-color, var(--link-text-color));

        --icon-color: var(--button-text-color);

        inline-size: var(--_button-inline-size);
    }

    button {
        align-items: center;
        background-color: transparent;
        border: var(--line-base) solid var(--_button-border-color);
        border-radius: var(--radius-half);
        column-gap: var(--space-xs);
        color: var(--button-text-color);
        cursor: pointer;
        display: flex;
        font-family: var(--_button-font-family);
        font-size: var(--_button-font-size);
        line-height: var(--_button-line-height);
        inline-size: var(--_button-inline-size);
        min-block-size: var(--space-lg);
        padding: var(--_button-padding-block) var(--_button-padding-inline);
        text-align: start;
        text-decoration: none;
        transition: all var(--duration-base);
    }

    button[disabled] {
        --_button-border-color: var(--color-black-a30);
        --button-text-color: var(--color-black-a40);

        cursor: initial;
        pointer-events: none;
    }

    button span {
        flex: 1;
    }

    :is(button:not([disabled])):is(:active, :hover, :focus-visible) {
        background-color: var(--_button-hover-color);
        color: var(--button-text-color-active);
    }

    /* Directional arrows */
    :host([direction="up"]) button::after,
    :host([direction="right"]) button::after,
    :host([direction="down"]) button::after,
    :host([direction="left"]) button::before {
      content: '';
      display: inline-block;
      border-color: currentcolor;
      border-width:var(--line-thin) var(--line-thin) 0 0;
      border-style: solid;
      height: var(--space-xs);
      width: var(--space-xs);
      position: relative;
      top: calc(var(--space-xxs) / -2);
      justify-self: end;
      inset-block-start: .0625em;
      transition: transform var(--duration-base);
      transform-origin: 50% 50%;
      justify-self: flex-end;
    }

    :host([direction="up"]) button::after {
        inset-block-end: -.25em;
        transform: rotate(315deg);
    }

    :host([direction="right"]) button::after {
        transform: rotate(45deg);
        inset-inline-start: -.25em;
    }

    :host([direction="down"]) button::after {
        inset-block-start: -.25em;
        transform: rotate(135deg);
    }

    :host([direction="left"]) button::before {
        inset-inline-end: -.25em;
        transform: rotate(225deg);
    }

    /* Action buttons */
    :host([data-action]) button {
        border: var(--line-base) solid var(--_button-action-border-color);
        border-radius: var(--radius-pill);
        padding: var(--space-xxs) var(--space-sm);
        font-size: var(--font-size-sm);
        line-height: 1;
        font-weight: 600;
        min-block-size: auto;
    }

    :host([data-action]) button .content {
        display: flex;
        align-items: center;
        gap: var(--space-xs);
    }

    /* Action button with a hidden text label */
    :host([data-action]) button[aria-label] {
        border-radius: var(--radius-circle);
        padding: var(--space-xs);
    }
`;