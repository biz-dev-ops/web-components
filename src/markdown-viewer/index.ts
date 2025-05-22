import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import resetCss from "../shared/styles/reset.css";
import typographyCss from "../shared/styles/typography.css";

import { FetchError, fetchText } from "../shared/fetch";

import { createMarkdownIt } from "./markdown-it-factory";
import "../shared/alert";

@customElement("markdown-viewer")
export class MarkdownViewer extends LitElement {
  @property({ attribute: "src" })
  src!: string

  @state()
  state!: string | FetchError;

  override render() {
    if (this.state instanceof FetchError) {
      return html`<bdo-alert type="error">${this.state.message}</bdo-alert>`;
    }

    return this.state ? html`${unsafeHTML(this.state)}` : html``;
  }

  override async updated(changedProperties) {
    if (changedProperties.has("src")) {
      try {
        const markdown = await fetchText(this.src);
        const md = createMarkdownIt(this.src);
        this.state = md.render(markdown);
      }
      catch (error: any) {
        this.state = error;
      }
    }
  }

  static override get styles() {
    return [
      resetCss,
      typographyCss,
      css`
        :host {
          display: block;
        }
      `,
    ];
  }
}