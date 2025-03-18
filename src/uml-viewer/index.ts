import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import plantumlEncoder from "plantuml-encoder";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import resetCss from "../shared/styles/reset.css";
import themeCss from "../shared/styles/theme.css";
import { fetchText } from "../shared/fetch";

export const tag = "uml-viewer";

@customElement(tag)
export class UMLViewer extends LitElement {
  @property({ attribute: "src" })
  src!: string;

  @property({ attribute: "data-puml" })
  puml!: string;

  @state()
  private content: string = "";

  @state()
  error: Error | null = null;

  // override async firstUpdated() {
  //   // Initial render
  //   if (this.puml) {
  //     await this._renderDiagram(this.puml);
  //   }
  // }

  override render() {
    if (this.error) {
      return html`<div class="error">${this.error.message}</div>`;
    }
    return html`${unsafeHTML(this.content)}`;
  }

  override async updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has("src")) {
      try {
        const pumlContent = await fetchText(this.src);
        this.puml = pumlContent;
      }
      catch (error: any) {
        this.error = error;
        console.error(`Failed to fetch ${this.src}`, error);
      }
    }

    if (changedProperties.has("puml")) {
      await this._renderDiagram(this.puml);
    }
  }

  private async _renderDiagram(puml: string) {
    if (!puml) {
      return;
    }

    try {
      // Encode the PlantUML content
      const encoded = plantumlEncoder.encode(puml);

      // Use the PlantUML server to render the diagram
      const response = await fetch(`https://www.plantuml.com/plantuml/svg/${encoded}`);

      if (!response.ok) {
        throw new Error(`Failed to render UML diagram: ${response.statusText}`);
      }

      const svgContent = await response.text();
      this.content = svgContent;
      this.error = null;

    }
    catch (err) {
      console.error("Failed to render UML diagram:", err);
      this.error = new Error(err instanceof Error ? err.message : 'Failed to render UML diagram');
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