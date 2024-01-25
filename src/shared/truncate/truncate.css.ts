import { css } from "lit";

const truncateCss = css`
    /* Component */
    :host {
        --_truncate-lines: var(--truncate-lines, 1);
    }

    .truncate {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: var(--space-sm);
    }
    
    .truncate__toggle {
        align-self: flex-end;
        appearance: none;
        color: currentcolor;
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
        text-decoration: underline;
        text-underline-offset: .25ex;
        padding: 0;
        border: 0;
        background: none;
        white-space: nowrap;
    }

    .truncate__toggle:disabled {
        visibility: hidden;
    }

    .truncate__toggle:hover {
        text-decoration: none;
    }
    
    .truncate--active {
        flex-direction: row;
    }

    .truncate--active .truncate__content {
        display: -webkit-box;
        -webkit-line-clamp: var(--_truncate-lines, 1);
        -webkit-box-orient: vertical;
        -moz-box-orient: vertical;
        overflow: hidden;
    }

    .truncate__active .truncate__toggle {
        align-self: flex-start;
    }
`;

export default truncateCss;