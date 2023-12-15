import { TemplateResult, html } from "lit";

export const commandIcon : TemplateResult = html`
    <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="m5 6 2.5 2L5 10M9 10h2" vector-effect="non-scaling-stroke"/>
        <path d="M13.5 3h-11a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5Z" vector-effect="non-scaling-stroke"/>
    </svg>
`;

export default commandIcon;