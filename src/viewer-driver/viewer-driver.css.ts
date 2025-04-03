import { css } from "lit";

export default css`
    :host(:where([data-fullscreen="true"])) {
        background-color: #fff;
        border-radius: 0;
        height: 100%;
        left: 0;
        margin: 0;
        overflow: auto;
        padding: 0;
        position: fixed;
        scroll-behavior: smooth;
        top: 0;
        width: 100%;
        z-index: var(--z-fullscreen);
    }
`;