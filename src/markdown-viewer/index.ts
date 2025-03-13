import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import resetCss from "../shared/styles/reset.css";
import themeCss from "../shared/styles/theme.css";
import { marked } from "marked";
import { FetchError, fetchText } from "../shared/fetch";

@customElement("markdown-viewer")
export class MarkdownViewer extends LitElement {
    @property({ attribute: "src" })
    src!: string

    @state()
    html!: string;

    error!: FetchError;

    override render() {
        return this.html ? html`${unsafeHTML(this.html)}` : html``;
    }

    override async updated(changedProperties) {
        if (changedProperties.has("src")) {
            try {
                const markdown = await fetchText(this.src);
                this.html = await parseMarkdown(markdown)
            }
            catch (error: any) {
                this.error = error;
            }
        }
    }

    static override get styles() {
        return [
            resetCss,
            themeCss,
            css``,
        ];
    }
}

async function parseMarkdown(markdown: string) : Promise<string> {
    return await marked.parse(markdown);
};
