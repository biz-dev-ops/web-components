import { css } from "lit";

export default css`
  :host {
    /* Default theme values */
    --rgb-brand: 0 0 0;
    --rgb-brand-secondary: var(--rgb-brand);
    --rgb-text: 51 51 51;
    --rgb-heading: var(--rgb-brand-secondary);

    --color-brand-base: rgb(var(--rgb-brand));
    --color-brand-pop: rgb(var(--rgb-brand-secondary));

    --text-color-base: rgba(var(--rgb-text) / 90%);
    --text-color-heading: rgb(var(--rgb-heading));

    /* Brand colors */
    --color-brand-a80: color-mix(in srgb, rgb(var(--rgb-brand)) 80%, white);
    --color-brand-a60: color-mix(in srgb, rgb(var(--rgb-brand)) 60%, white);
    --color-brand-a40: color-mix(in srgb, rgb(var(--rgb-brand)) 40%, white);
    --color-brand-a20: color-mix(in srgb, rgb(var(--rgb-brand)) 20%, white);
    --color-brand-a10: color-mix(in srgb, rgb(var(--rgb-brand)) 10%, white);
    --color-brand-a05: color-mix(in srgb, rgb(var(--rgb-brand)) 5%, white);

    /* Colors */
    --color-white-rgb: 255 255 255;
    --color-white: rgb(var(--color-white-rgb));
    --color-white-a10: rgba(var(--color-white-rgb) / 10%);
    --color-white-a20: rgba(var(--color-white-rgb) / 20%);
    --color-white-a50: rgba(var(--color-white-rgb) / 50%);
    --color-white-a90: rgba(var(--color-white-rgb) / 90%);

    --color-black-rgb: 0 0 0;
    --color-black: rgb(var(--color-black-rgb));
    --color-black-a05: rgba(var(--color-black-rgb) / 5%);
    --color-black-a10: rgba(var(--color-black-rgb) / 10%);
    --color-black-a20: rgba(var(--color-black-rgb) / 20%);
    --color-black-a30: rgba(var(--color-black-rgb) / 30%);
    --color-black-a40: rgba(var(--color-black-rgb) / 40%);
    --color-black-a80: rgba(var(--color-black-rgb) / 80%);
    --color-black-a90: rgba(var(--color-black-rgb) / 90%);
    --color-grey-100: rgb(229 229 229);
    --color-grey-900: rgb(39 40 48);

    /* Status colors */
    --color-info: #0043A8;
    --color-info-100: #E5F0FF;
    --color-success: #00A843;
    --color-success-100: #E5FFF0;
    --color-warning: #EA7E31;
    --color-warning-100: #FFF4EB;
    --color-warning-secondary: #CDB015;
    --color-warning-secondary-100: #FDF8DD;
    --color-error: #B12626;
    --color-error-100: #FEEEEF;

    /* Status */
    --status-passed: var(--color-success);
    --status-passed-100: var(--color-success-100);
    --status-failed: var(--color-error);
    --status-failed-100: var(--color-error-100);
    --status-skipped: var(--color-info);
    --status-skipped-100: var(--color-info-100);
    --status-undefined: var(--color-warning);
    --status-undefined-100: var(--color-warning-100);
    --status-pending: var(--color-warning-secondary);
    --status-pending-100: var(--color-warning-secondary-100);

    /* Main */
    --main-surface: var(--color-white);

    /* Typography */
    --font-family-base: -apple-system, 'BlinkMacSystemFont', 'Segoe UI', 'Helvetica', 'Arial', sans-serif;
    --font-family-heading: -apple-system, 'BlinkMacSystemFont', 'Segoe UI', 'Helvetica', 'Arial', sans-serif;
    --line-height-base: 1.5;
    --line-height-heading: 1;
    --type-scale: 1.3;
    --heading-6-size: .6875rem;
    --heading-5-size: calc(var(--heading-6-size) * var(--type-scale));
    --heading-4-size: calc(var(--heading-5-size) * var(--type-scale));
    --heading-3-size: calc(var(--heading-4-size) * var(--type-scale));
    --heading-2-size: calc(var(--heading-3-size) * var(--type-scale));
    --heading-1-size: calc(var(--heading-2-size) * var(--type-scale));

    --font-size-xs: .5rem;
    --font-size-sm: .875rem;
    --font-size-base: 1rem;
    --font-size-md: 1.125rem;

    /* Link */
    --link-text-color: var(--color-brand-base, var(--text-color-base));

    /* Button */
    --button-text-color: var(--text-color-base, var(--color-black));
    --button-text-color-active: var(--button-text-color);
    --button-background-base: var(--color-brand-a20);
    --button-background-active: var(--color-brand-a40);

    /* Shadow */
    --drop-shadow-base: 0 .125rem 1.25rem rgba(0 0 0 / 5%);
    --drop-shadow-level2: 0 .25rem 1rem rgba(0 0 0 / 10%);

    /* Sizing */
    --space-xl: 4.5rem;
    --space-lg: 2.25rem;
    --space-md: 1.5rem;
    --space-sm: 1rem;
    --space-xs: .5rem;
    --space-xxs: .25rem;

    /* Transition */
    --duration-base: 250ms;

    /* Lines */
    --line-base: .0625rem;
    --line-thin: .125rem;
    --line-medium: .1875rem;

    /* Radius */
    --radius-half: .375rem;
    --radius-base: .75rem;
    --radius-pill: 99rem;
    --radius-circle: 50%;
  }
`;