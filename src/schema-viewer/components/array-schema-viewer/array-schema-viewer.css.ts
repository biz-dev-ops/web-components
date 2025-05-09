import { css } from "lit";

export default css`    
    .item--array {
        padding-block-start: var(--space-xs);
        margin-block-end: calc(var(--space-xs) * -1);
    }
    
    .item--header,
    .item--fadeout {
        border-radius: var(--radius-half);
        border: var(--line-thin) solid var(--_item-line-color);
        position: relative;
        padding: var(--space-sm);
    }

    .item--header {
        border-radius: var(--radius-half) var(--radius-half) 0 0;
        border-bottom: 0;
    }

    .item--main {
        margin-inline: -1rem;
        padding-inline: 1rem;
        mask-image: linear-gradient(to top, transparent var(--space-sm), black var(--space-xl));
        -webkit-mask-image: linear-gradient(to top, transparent var(--space-sm), black var(--space-xl));
    }
    
    .item--fadeout {
        border-radius: 0 0 var(--radius-half) var(--radius-half);
        border-top: 0;
        padding-block: 0;
    }

    .item--array h3 {
        position: absolute;
        top: calc(var(--line-height-base) * -.5em);
    }

    .item--array h3 .txt--property {
        background-color: var(--surface-main);
        padding-inline: var(--space-xs);
        margin-inline: calc(var(--space-xs) * -1);
    }

    .item--array h3 + p {
        font-size: var(--font-size-sm);
    }

    .list--array {
        list-style: none;
        padding-inline-start: 0;
        display: flex;
        flex-direction: column;
        row-gap: var(--space-sm);
        max-width: 100%;
    }

    .list--array li {
        position: relative;
    }

    .list--array li::before,
    .list--array li::after {
    content: '';
        position: absolute;
        inset-inline-start: calc(var(--space-sm) * -1);
        inset-block-start: calc(50% - (var(--line-thin) * .5));
        /* top: calc(50% + var(--line-thine) * -.5); */
    }

    .list--array li::before {
        background-color: var(--_item-line-color);
        block-size: var(--line-thin);
        inline-size: var(--space-sm);
    }

    .list--array li::after {
        aspect-ratio: 1;
        background-color: var(--surface-main);
        block-size: .625rem;
        border-radius: var(--radius-circle);
        border: var(--line-thin) solid var(--_item-line-color);
        transform: translateX(calc(-50% - (var(--line-thin) / 2)))  translateY(calc(-50% + (var(--line-thin) / 2)));
    }

    .list--array li:not(:first-child) {
        pointer-events: none;
    }
`;