import MarkdownIt, { Token } from "markdown-it";

interface TabsRulerOptions {
  extensions?: string[];
}

export default function tabsRuler(md: MarkdownIt, options?: TabsRulerOptions): void {
  const extensions: string[] = options?.extensions || [];

  md.core.ruler.push("tabs_ruler", (state) => {
    const tokens = state.tokens;
    let inList = false;
    let listContainsMatchingLink = false;

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];

      if (token.type === "bullet_list_open") {
        inList = true;
        listContainsMatchingLink = false;
      }
      else if (token.type === "bullet_list_close") {
        inList = false;
        if (listContainsMatchingLink) {
          (token as any).tabs = true;
          setTabsTokenProperty(i, tokens);
        }
      }
      else if (inList && token.type === "list_item_open") {
        if(!listContainsMatchingLink) {
          listContainsMatchingLink = findLinkWithExtension(i, tokens, extensions);
        }
      }
    }
  });
}

function findLinkWithExtension(i: number, tokens: Token[], extensions: string[]) : boolean {
  for (let j = i + 1; tokens[j] && tokens[j].type !== "list_item_close"; j++) {
    const token = tokens[j];

    const href = removeParametersFrom(getHrefFrom(token));
    if (extensions.some((ext) => href?.endsWith(ext))) {
      return true;
    }
  }

  return false;
}

function getHrefFrom(token: Token) {
  if(token.type === "link_open") {
    return token.attrGet("href");
  }

  if(token.children) {
    return token.children.find((child) => child.type === "link_open")?.attrGet("href");
  }

  return null;
}

function removeParametersFrom(href: string | null | undefined) {
  return href?.split("?")[0].split("#")[0];
}

function setTabsTokenProperty(i: number, tokens: Token[]) {
  for (let j = i - 1; j >= 0; j--) {
    const token = tokens[j];

    if(token.type === "list_item_open" || token.type === "list_item_close") {
      (token as any).tab = true;
    }

    if(token.type === "bullet_list_open" || token.type === "bullet_list_close") {
      (token as any).tabs = true;
    }

    if (token.type === "bullet_list_open") {
      break;
    }
  }
}

