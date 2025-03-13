import MarkdownIt, { Options, Renderer, Token } from "markdown-it";

export default function tabsRule(md: MarkdownIt): void {
  let tabIndex = 0;
  let tabPanelIndex = 0;

  md.renderer.rules.bullet_list_open = function (tokens: Token[], idx: number, options: Options, _env: any, self: Renderer): string {
    const token = tokens[idx];

    if (!(token as any).tabs) {
      return self.renderToken(tokens, idx, options);
    }

    tabIndex += 1;
    tabPanelIndex = 0;

    const headers = getHeaders(tokens, idx);

    return `
      <div class="tabs">
        <div role="tablist">
          ${headers.map((header, index) => `
            <button
              role="tab"
              aria-selected="${index === 0 ? "true" : "false"}"
              aria-controls="tabs-${tabIndex}-panel-${index + 1}"
              id="tabs-${tabIndex}-tab-${index + 1}"
              tabindex="${index === 0 ? "0" : "-1"}"
            >${header}</button>
          `).join("")}
        </div>
    `;
  }

  md.renderer.rules.list_item_open = function (tokens: Token[], idx: number, options: Options, _env: any, self: Renderer): string {
    const token = tokens[idx];

    if (!(token as any).tab) {
      return self.renderToken(tokens, idx, options);
    }

    tabPanelIndex += 1;

    return `
      <div
        id="tabs-${tabIndex}-panel-${tabPanelIndex}"
        role="tabpanel"
        tabindex="0"
        aria-labelledby="tabs-${tabIndex}-tab-${tabPanelIndex}"
        ${tabPanelIndex === 1 ? "" : "hidden"}>
    `;
  }

  md.renderer.rules.list_item_close = function (tokens: Token[], idx: number, options: Options, _env: any, self: Renderer): string {
    const token = tokens[idx];

    if (!(token as any).tab) {
      return self.renderToken(tokens, idx, options);
    }

    return `</div>`;
  }

  md.renderer.rules.bullet_list_close = function (tokens: Token[], idx: number, options: Options, _env: any, self: Renderer): string {
    const token = tokens[idx];

    if (!(token as any).tabs) {
      return self.renderToken(tokens, idx, options);
    }

    return `</div>`;
  }
}

function getHeaders(tokens: Token[], idx: number): string[] {
  const headers: string[] = [];
  for (idx; idx < tokens.length; idx++) {
    const token = tokens[idx];

    if (tokens[idx].type === "bullet_list_close") {
      break;
    }

    if (token.type != "list_item_open") {
      continue;
    }

    const inlineToken = getNextInline(tokens, idx);
    const textToken = inlineToken?.children?.find(child => child.type === "text");
    headers.push(textToken?.content || "undefined");
  }
  return headers;
}

function getNextInline(tokens: Token[], idx: number): Token | null {
  for (idx; idx < tokens.length; idx++) {
    const token = tokens[idx];
    if (token.type === "inline") {
      return token;
    }
  }
  return null;
}
