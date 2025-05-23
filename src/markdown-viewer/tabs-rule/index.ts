import MarkdownIt, { Options, Renderer, Token } from "markdown-it";
import { tabsRulerPlugin, tabsRulerPluginOptions } from "../tabs-ruler";

export function tabsRulePlugin(md: MarkdownIt, options?: tabsRulerPluginOptions): void {
  md.use(tabsRulerPlugin, options);

  let tabIndex = 0;
  let tabPanelIndex = 0;

  md.renderer.rules.bullet_list_open = function (tokens: Token[], idx: number, options: Options, _env: any, self: Renderer): string {
    const token = tokens[idx];

    if (!(token as any).tabs) {
      return self.renderToken(tokens, idx, options);
    }

    tabIndex += 1;
    tabPanelIndex = 0;

    return `<bdo-tabs selectedIndex="0">`;
  }

  md.renderer.rules.list_item_open = function (tokens: Token[], idx: number, options: Options, _env: any, self: Renderer): string {
    const token = tokens[idx];

    if (!(token as any).tab) {
      return self.renderToken(tokens, idx, options);
    }

    tabPanelIndex += 1;

    const title = getNextTitleOrTextContent(tokens, idx) || "undefined";

    return `<bdo-tab title="${title}">`;
  }

  md.renderer.rules.list_item_close = function (tokens: Token[], idx: number, options: Options, _env: any, self: Renderer): string {
    const token = tokens[idx];

    if (!(token as any).tab) {
      return self.renderToken(tokens, idx, options);
    }

    return `</bdo-tab>`;
  }

  md.renderer.rules.bullet_list_close = function (tokens: Token[], idx: number, options: Options, _env: any, self: Renderer): string {
    const token = tokens[idx];

    if (!(token as any).tabs) {
      return self.renderToken(tokens, idx, options);
    }

    return `</bdo-tabs>`;
  }
}

function getNextTitleOrTextContent(tokens: Token[], idx: number): string | null {
  for (idx; idx < tokens.length; idx++) {
    const token = tokens[idx];
    if(token.type === "list_item_close") {
      return null;
    }

    if(token.attrGet("title")) {
      return token.attrGet("title");
    }

    if (token.type === "text") {
      return token.content;
    }

    if(token.children) {
      const title = getNextTitleOrTextContent(token.children, 0);
      if(title) {
        return title;
      }
    }
  }
  return null;
}
