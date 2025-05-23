import { css } from "lit";

const styles = css`
  :host {
    --_icon-color: var(--icon-color, var(--text-color-base));
    --icon-justify: center;
    --icon-align: center;

    color: var(--_icon-color);
    display: inline-flex;
    line-height: 1;
    position: relative;
  }

  :host, .icon, .symbol {
    display: inline-flex;
  }

  .material-symbols {
    font-family: "Material Symbols Outlined";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    font-feature-settings: "liga";
  }

  .icon + .icon {
      display: flex;
      justify-content: var(--icon-justify, end);
      align-items: var(--icon-align, end);
  }

  .icon:nth-child(2) {
    inset: 0;
    position: absolute;
  }

  .icon:nth-child(2) .symbol {
    text-shadow:
      -.0625em -.0625em 0 var(--surface-current), .0625em -.0625em 0 var(--surface-current),
      -.0625em  .0625em 0 var(--surface-current), .0625em  .0625em 0 var(--surface-current),
      0  -.0625em 0 var(--surface-current), 0  .0625em 0 var(--surface-current),
      -.0625em  0 0 var(--surface-current), .0625em  0 0 var(--surface-current);

    font-size: .7em;
  }
`;

export default styles;
