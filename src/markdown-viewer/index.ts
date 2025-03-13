import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { BPMNViewer } from "../bpmn-viewer";

import resetCss from "../shared/styles/reset.css";
import themeCss from "../shared/styles/theme.css";

import { FetchError, fetchText } from "../shared/fetch";

const webcomponents = [
    { extensions: [".bpmn"], componentTag: BPMNViewer.tagName }
]

import MarkdownIt from "markdown-it";
const md = MarkdownIt();

import tabsRuler from "./tabs-ruler";
md.use(tabsRuler, { extensions: webcomponents.flatMap(c => c.extensions) });

import tabsRule from "./tabs-rule";
md.use(tabsRule);

import webComponentLinkRule from "./webcomponent-link-rule";
md.use(webComponentLinkRule, { mappings: webcomponents });

@customElement("markdown-viewer")
export class MarkdownViewer extends LitElement {
    @property({ attribute: "src" })
    src!: string

    @state()
    state!: string | FetchError;

    override render() {
        if (this.state instanceof FetchError) {
            return html`<div class="error">${this.state.message}</div>`;
        }

        return this.state ? html`${unsafeHTML(this.state)}` : html``;
    }

    override async updated(changedProperties) {
        if (changedProperties.has("src")) {
            try {
                const markdown = await fetchText(this.src);

                this.state = await parseMarkdown(markdown)
            }
            catch (error: any) {
                this.state = error;
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

async function parseMarkdown(markdown: string): Promise<string> {
    return md.render(markdown);
};
