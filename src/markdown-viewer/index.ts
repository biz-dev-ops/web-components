import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import resetCss from "../shared/styles/reset.css";

import { FetchError, fetchText } from "../shared/fetch";

import md from "./markdown-it";

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
      css`
        :host {
          display: block;
        }
      `,
    ];
  }
}