import { css } from "lit";

export default css`
    :host {
        display: grid;
        place-content: center;
        overflow: hidden;
    }

    .material-symbols {
        font-family: "Material Symbols Outlined";
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
        font-feature-settings: "liga";
    }
`;
