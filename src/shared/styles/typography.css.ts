import { css } from "lit";

export default css`
    ::slotted(:where(p, figure, table, ul, ol, dl, pre, blockquote)),
    p, figure, table, ul, ol, dl, pre, blockquote {
        font-size: var(--font-size-base);
        line-height: var(--line-height-base);
        margin: 0;
        max-width: 80ch;
    }

    table,
    ::slotted(table) {
        max-width: 100%;
    }

    ::slotted(:where(p, table, ul, ol, dl, pre, blockquote, [data-fullscreen="false"]):not(:last-child, [slot])),
    :where(p, table, ul, ol, dl, pre, blockquote, [data-fullscreen="false"]):not(:last-child, [slot]) {
        margin-block-end: calc(var(--line-height-base) * 1rem);
    }

    h1, h2, h3, h4, h5, h6,
    ::slotted(:where(h1, h2, h3, h4, h5, h6)) {
        color: var(--text-color-heading);
        font-family: var(--font-family-heading);
        line-height: var(--line-height-heading);
        margin: 0;
    }

    :where(h1, h2, h3, h4, h5, h6):not(:last-child, [slot]),
    ::slotted(:where(h1, h2, h3, h4, h5, h6):not(:last-child, [slot])) {
        margin-block-end: calc(var(--line-height-base) * .5em);
    }

    h1, .heading-size-1,
    ::slotted(h1, .heading-size-1) {
        font-size: var(--heading-1-size);
    }

    h2, .heading-size-2,
    ::slotted(h2, .heading-size-2) {
        font-size: var(--heading-2-size);
    }

    h3, .heading-size-3,
    ::slotted(h3, .heading-size-3) {
        font-size: var(--heading-4-size);
    }

    h4, .heading-size-4,
    ::slotted(h4, .heading-size-4) {
        font-size: var(--heading-5-size);
    }

    abbr[title],
    ::slotted(abbr[title]) {
        border: 0;
        color: var(--link-text-color, currentcolor);
        outline: 0;
    }

    a > abbr,
    ::slotted(a > abbr) {
        text-decoration: none;
    }

    a,
    ::slotted(a) {
        color: var(--link-text-color, currentcolor);
        text-underline-offset: .25ex;
    }

    svg a,
    ::slotted(svg a) {
        color: inherit;
    }

    a:where(:hover, :focus),
    ::slotted(:where(a:hover, a:focus)) {
        text-decoration: none !important;
    }

    :focus-visible,
    ::slotted(:focus-visible) {
        box-shadow: 0 0 0 var(--line-thin) var(--link-text-color); 
        outline: none;
    }

    figure:where(img, svg, embed),
    ::slotted(figure:where(img, svg, embed)) {
        height: auto;
        max-inline-size: 100%;
        vertical-align: middle;
    }

    :where(a),
    ::slotted(:where(a)) {
        text-underline-offset: .25ex;
    }

    ul, ol,
    ::slotted(:where(ul, ol)) {
        padding-inline-start: var(--space-md);
    }

    iframe,
    ::slotted(iframe) {
        border: 0;
        width: 1px;
        min-width: 100%;
        vertical-align: middle;
    }

    table tr > *,
    ::slotted(table tr > *) {
        border-block-end: var(--line-base) solid var(--background-color-base);
        padding: var(--space-xs) var(--space-sm);
        text-align: left;
    }

    table tr > *:first-child,
    ::slotted(table tr > *:first-child) {
        padding-inline-start: 0;
    }

    table tr > *:last-child,
    ::slotted(table tr > *:last-child) {
        padding-inline-end: 0;
    }

    dt,
    ::slotted(dt) {
        font-weight: 600;
    }

    dd,
    ::slotted(dd) {
        border-block-end: var(--line-base) dashed var(--color-grey-100);
        margin-inline-start: 0;
    }

    dd + dt,
    ::slotted(dd + dt) {
        margin-block-start: var(--space-sm);
    }

    blockquote,
    ::slotted(blockquote) {
        background-color: var(--color-black-a05);
        padding: var(--space-sm);
        padding-inline-start: calc(var(--space-sm) - var(--line-medium));
        border-left: var(--line-medium) solid var( --color-brand-pop);
    }
`;