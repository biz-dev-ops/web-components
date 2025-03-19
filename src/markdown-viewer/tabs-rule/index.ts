import MarkdownIt, { Options, Renderer, StateCore, Token } from "markdown-it";
import { tabsRuler, TabsRulerOptions } from "../tabs-ruler";

export default function tabsRulePlugin(md: MarkdownIt, options?: TabsRulerOptions): void {
  md.core.ruler.push("tabs_ruler", (state: StateCore) => tabsRuler(state, options));

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

    const textToken = getNextTextToken(tokens, idx);
    const title = textToken?.content || "undefined";

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

function getNextTextToken(tokens: Token[], idx: number): Token | null {
  for (idx; idx < tokens.length; idx++) {
    const token = tokens[idx];
    if (token.type === "text") {
      return token;
    }

    if(token.children) {
      const textToken = token.children.find(child => child.type === "text");
      if(textToken) {
        return textToken;
      }
    }
  }
  return null;
}
