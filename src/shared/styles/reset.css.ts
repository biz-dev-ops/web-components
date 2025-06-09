import { css } from "lit";

export default css`
    :host {
        color: inherit;
        font-family: var(--font-family-base);
        font-size: inherit;
        display: inline-block;
        line-height: inherit;
        box-sizing: border-box;
        text-align: start;
    }

    :where(*, ::before, ::after) {
        box-sizing: border-box;
    }
`;