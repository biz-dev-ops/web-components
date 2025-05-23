import MarkdownIt, { StateCore, Token } from "markdown-it";

export interface tabsRulerPluginOptions {
  listItemIsTabPanel?: (listItem: ListItem) => boolean;
}

export function tabsRulerPlugin(md: MarkdownIt, options?: tabsRulerPluginOptions): void {
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
  findToken(type: string): Token | undefined;
  tokens: Token[];
}

class ListItemImpl implements ListItem {
  tokens: Token[];

  constructor(tokens: Token[]) {
    this.tokens = tokens;
  }

  findToken(type: string): Token | undefined {
    return this._getToken(this.tokens, type);
  }

  private _getToken(tokens: Token[], type: string): Token | undefined {
    const token = tokens.find(token => token.type === type);
    if (token) {
      return token;
    }

    for (const token of tokens) {
      if (token.children) {
        const child = this._getToken(token.children, type);
        if (child) {
          return child;
        }
      }
    }

    return undefined;
  }
}
