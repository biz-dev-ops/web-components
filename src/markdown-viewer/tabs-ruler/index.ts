import MarkdownIt, { StateCore, Token } from "markdown-it";
import { Link, LinkImpl } from "../link-transform-ruler";

export interface tabsRulePluginOptions {
  listItemIsTabPanel?: (listItem: ListItem) => boolean;
}

export default function tabsRulePlugin(md: MarkdownIt, options?: tabsRulePluginOptions): void {
  const listItemIsTabPanelDelegate = options?.listItemIsTabPanel || ((_listItem: ListItem) => false);

  md.core.ruler.push("tabs_ruler", (state: StateCore): void => {
    const tokens = state.tokens;
    let inList = false;
    let listItemIsTabPanel = false;

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];

      if (token.type === "bullet_list_open") {
        inList = true;
        listItemIsTabPanel = false;
      }
      else if (token.type === "bullet_list_close") {
        inList = false;
        if (listItemIsTabPanel) {
          (token as any).tabs = true;
          setTabsTokenProperty(i, tokens);
        }
      }
      else if (inList && token.type === "list_item_open") {
        if (!listItemIsTabPanel) {
          const listItemTokens = getListItemTokens(i, tokens);
          const listItem = new ListItemImpl(listItemTokens);
          listItemIsTabPanel = listItemIsTabPanelDelegate(listItem);
        }
      }
    }
  });
}

function getListItemTokens(idx: number, tokens: Token[]): Token[] {
  const listItemTokens: Token[] = [];

  for (let i = idx; i < tokens.length; i++) {
    listItemTokens.push(tokens[i]);

    if (tokens[i].type === "list_item_close") {
      break
    }
  }

  return listItemTokens;
}

function setTabsTokenProperty(i: number, tokens: Token[]) {
  for (let j = i - 1; j >= 0; j--) {
    const token = tokens[j];

    if (token.type === "list_item_open" || token.type === "list_item_close") {
      (token as any).tab = true;
    }

    if (token.type === "bullet_list_open" || token.type === "bullet_list_close") {
      (token as any).tabs = true;
    }

    if (token.type === "bullet_list_open") {
      break;
    }
  }
}


export type ListItem = {
  tokens: Token[];
  getLink(): Link | null;
}

class ListItemImpl implements ListItem {
  tokens: Token[];

  constructor(tokens: Token[]) {
    this.tokens = tokens;
  }

  getLink(): Link | null {
    const tokens = getTokenWithLink(this.tokens);
    let inLink = false;
    const linkTokens: Token[] = [];

    for (const token of tokens) {
      if (token.type === "link_open") {
        inLink = true;
      }

      if (inLink) {
        linkTokens.push(token);
      }

      if (token.type === "link_close") {
        inLink = false;
      }
    }

    if (linkTokens.length === 0) {
      return null;
    }

    return new LinkImpl(linkTokens);

    function getTokenWithLink(tokens: Token[]): Token[] {
      if (tokens.some(token => token.type === "link_open")) {
        return tokens;
      }

      if (tokens.some(token => token.type === "inline" && token.children?.some(t => t.type === "link_open"))) {
        return tokens.find(token => token.type === "inline")?.children!;
      }

      return [];
    }
  }
}
