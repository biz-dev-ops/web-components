import { css } from "lit";

export default css`
    :host {
        all: unset;
        font-family: var(--font-family-base);
        font-size: var(--font-size-base);
        display: inline-block;
        line-height: var(--line-height-base);
        box-sizing: border-box;
        text-align: start;
    }

    :where(*, ::before, ::after) {
        box-sizing: border-box;
    }
`;