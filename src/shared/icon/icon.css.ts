import { css } from "lit";

const iconCss = css`
    /* Reset */
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
    
    /* Component */
    :host {
        --_icon-color: var(--icon-color, currentcolor);
        --_icon-stroke-width: var(--icon-stroke-width, 1.5);

        display: inline-block
    }
    
    svg {
        color: var(--_icon-color);
        display: block;
        stroke: currentcolor;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: var(--_icon-stroke-width);
    }
`;

export default iconCss;