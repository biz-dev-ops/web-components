import { css } from "lit";

export default css`
    p, figure, table, ul, ol, dl, pre, blockquote {
        margin: 0;
    }

    :where(p, table, ul, ol, dl, pre, blockquote):not(:last-child) {
        margin-block-end: calc(var(--line-height-base) * 1rem) !important;
    }

    h1, h2, h3, h4, h5, h6 {
        color: var(--text-color-heading);
        font-family: var(--font-family-heading);
        line-height: var(--line-height-heading);
        margin: 0;
    }

    :where(h1, h2, h3, h4, h5, h6):not(:last-child) {
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

    a > abbr {
        text-decoration: none;
    }

    a {
        color: var(--link-text-color, currentcolor);
        text-underline-offset: .25ex;
    }

    a:hover,
    a:focus {
        text-decoration: none !important;
    }
`;