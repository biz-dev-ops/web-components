import { css } from "lit";

const styles = css`
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

export default styles;
