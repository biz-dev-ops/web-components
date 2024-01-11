import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

@customElement("architecture-icon")
export class ArchitectureIcon extends LitElement {
    @property() 
    icon!: string | undefined;
    
    @property() 
    svgContent!: string | undefined;

    override async connectedCallback() {
        super.connectedCallback();
        this.svgContent = await this.fetchSVGContent();
    }

    async fetchSVGContent() {
        const response = await fetch(`/assets/icons/${this.icon}.svg`);
        return await response.text();
    }

    override render() {
        return html`${unsafeHTML(this.svgContent)}`;
    }

    static override get styles() {
        return [
            css`
                :host {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--color-white);
                }
                svg {
                    width: 100%;
                    height: 100%;
                    color: inherit;
                }
            `,
        ];
    }
}
