import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import resetCss from "../shared/styles/reset.css";
import themeCss from "../shared/styles/theme.css";
import { fetchText } from "../shared/fetch";

import mermaid from "mermaid";

export const tag: string = "mermaid-viewer";

@customElement(tag)
export class MermaidViewer extends LitElement {

    @property({ attribute: "src" })
    src!: string;

    @property({ attribute: "data-mmd" })
    mmd!: string;

    @state()
    state!: string | Error;

    override render() {
        if (this.state instanceof Error) {
            return html`<div class="error">${this.state.message}</div>`;
        }

        return this.state ? html`${unsafeHTML(this.state)}` : html``;
    }

    override async firstUpdated() {
        mermaid.initialize({
            startOnLoad: true,
            theme: "default",
            securityLevel: "loose",
        });
    }

    override async updated(changedProperties) {
        if (changedProperties.has("src")) {
            try {
                this.mmd = await fetchText(this.src);
            }
            catch (error: any) {
                this.state = error;
            }
        }

        if (changedProperties.has("mmd")) {
            this.state = await this._renderDiagram();
        }
    }

    private async _renderDiagram() : Promise<string | Error> {
        try {
            const { svg } = await mermaid.render("mermaid-diagram", this.mmd);
            return svg;
        }
        catch (err) {
           return err as Error;
        }
    }

    static override get styles() {
        return [
            resetCss,
            themeCss,
            css`
                :host {
                    display: block;
                    width: 100%;
                    height: 100%;
                }
                svg {
                    width: 100%;
                    height: 100%;
                }
            `
        ];
    }
}