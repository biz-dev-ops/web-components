import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { marked } from 'marked';
import { BPMNViewer } from '../bpmn-viewer';

const webComponents = [BPMNViewer];

@customElement('markdown-viewer')
export class MarkdownViewer extends LitElement {
  @property({ attribute: "src" })
  src!: string;

  @property()
  html!: string;

  override render() {
    return html`
      <div class="html-content">
        ${this.html ? html`${this.html}` : ''}
      </div>
    `;
  }

  override update(changedProperties: Map<string, unknown>) {
    super.update(changedProperties);
    if (this.src) {
      this.fetchMarkdown(this.src);
    }
  }

  async fetchMarkdown(url: string) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const markdown = await (
            response
              .text()
              .then(resolveComponents)
        );

        this.html = await marked(markdown);
      }
      else {
        throw new Error(response.statusText);
      }
    }
    catch (error) {
      console.error('Error loading markdown file:', error);
      this.html = `<p>Error loading markdown file: ${error}</p>`;
    }
  }

  static override get styles() {
      return [
        css`
          :host {
            display: block;
            font-family: Arial, sans-serif;
          }
          .html-content {
            padding: 16px;
            border: 1px solid #ccc;
            border-radius: 8px;
          }
        `,
      ];
    }
}

function resolveComponents(md: string): string {

  return md.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
    for (const component of webComponents) {
      if (component.canRender(url)) {
        return `<${component.name} src="${url}" name="${text}"></${component.name}>`;
      }
    }
    return match; // Return the original markdown link if no component can render the URL
  });
}
