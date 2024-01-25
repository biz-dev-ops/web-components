import { css } from "lit";

export default css`
    :host {
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        font-size: 1em;
        inline-size: 1em;
        aspect-ratio: 1;
    }

    .material-symbols-outlined {
        font-family: "Material Symbols Outlined";
        font-weight: normal;
        font-style: normal;
        font-size: 24px;
        line-height: 1;
        letter-spacing: normal;
        text-transform: none;
        display: inline-block;
        white-space: nowrap;
        word-wrap: normal;
        direction: ltr;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
        font-feature-settings: "liga";
    }

    .bdo-icon__phosphor {
        display: inline-flex;
        display: grid;
        place-content: center;
        font-weight: bold;
        height: 100%;
        width: 100%;
    }
`;
