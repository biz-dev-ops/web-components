import { TemplateResult, html } from "lit";

export const eventIcon : TemplateResult = html`
    <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 11.5v.5a2 2 0 0 0 4 0v-.5" vector-effect="non-scaling-stroke"/>
        <path d="M3.5 6.5a4.5 4.5 0 0 1 9 0c0 2.239.519 3.537.931 4.25a.498.498 0 0 1-.431.75H3a.5.5 0 0 1-.43-.75c.412-.713.93-2.012.93-4.25Z" vector-effect="non-scaling-stroke"/>
    </svg>
`;

export default eventIcon;

