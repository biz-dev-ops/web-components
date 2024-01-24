import { css } from "lit";

export default css`
    :host {
        padding: var(--space-sm);
        border-radius: var(--radius-base);
        position:relative;
    }

    :host:not(:has(::slotted(*[slot=heading]))) {
        padding: var(--space-sm);
    }

    ::slotted(*[slot=heading]) {
        position: absolute!important;
        top: 0!important;
        left: var(--space-sm)!important;
        margin: 0!important;
        padding: var(--space-xxs) var(--space-sm)!important;
        transform: translateY(-50%);
    }

    .arrow {
        position: absolute;
        width: 2.5rem;
        fill: currentColor;
    }

    .arrow-up {
        top: 0.375rem;
        right: 50%;
        transform: translate(50%, -100%) rotate(180deg);
    }

    .arrow-down {
        bottom: 0.375rem;
        left: 50%;
        transform: translate(-50%, 100%);
    }
`;