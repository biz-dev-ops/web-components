import { css } from "lit";

export default css`
    p, figure, table, ul, ol, dl, pre, blockquote {
        font-size: var(--font-size-base);
        line-height: var(--line-height-base);
        margin: 0;
    }

    :where(p, table, ul, ol, dl, pre, blockquote, [data-fullscreen="false"]):not(:last-child, [slot]) {
        margin-block-end: calc(var(--line-height-base) * 1rem);
    }

    h1, h2, h3, h4, h5, h6 {
        color: var(--text-color-heading);
        font-family: var(--font-family-heading);
        line-height: var(--line-height-heading);
        margin: 0;
    }

    :where(h1, h2, h3, h4, h5, h6):not(:last-child, [slot]) {
        margin-block-end: calc(var(--line-height-base) * .5em);
    }

    h1, .heading-size-1 {
        font-size: var(--heading-1-size);
    }

    h2, .heading-size-2 {
        font-size: var(--heading-2-size);
    }

    h3, .heading-size-3 {
        font-size: var(--heading-4-size);
    }

    h4, .heading-size-4 {
        font-size: var(--heading-5-size);
    }

    abbr[title] {
        border: 0;
        color: var(--link-text-color, currentcolor);
        outline: 0;
    }

    a > abbr {
        text-decoration: none;
    }

    a {
        color: var(--link-text-color, currentcolor);
        text-underline-offset: .25ex;
    }

    svg a {
        color: inherit;
    }

    a:hover,
    a:focus {
        text-decoration: none !important;
    }

    :focus-visible {
        box-shadow: 0 0 0 var(--line-thin) var(--link-text-color); 
        outline: none;
    }

    figure img,
    figure svg,
    figure embed {
        height: auto;
        max-inline-size: 100%;
        vertical-align: middle;
    }

    :where(a) {
        text-underline-offset: .25ex;
    }

    ul, ol {
        padding-inline-start: var(--space-md);
    }

    iframe {
        border: 0;
        width: 1px;
        min-width: 100%;
        vertical-align: middle;
    }

    table tr > * {
        border-block-end: var(--line-base) solid var(--background-color-base);
        padding: var(--space-xs) var(--space-sm);
        text-align: left;
    }

    table tr > *:first-child{
        padding-inline-start: 0;
    }

    table tr > *:last-child {
        padding-inline-end: 0;
    }

    dt {
        font-weight: 600;
    }

    dd {
        border-block-end: var(--line-base) dashed var(--color-grey-100);
        margin-inline-start: 0;
    }

    dd + dt {
        margin-block-start: var(--space-sm);
    }

    blockquote {
        padding: 0 var(--space-sm);
        border-left: var(--space-xxs) solid var( --color-brand-pop);
    }
`;